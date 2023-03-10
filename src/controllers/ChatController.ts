import Store from '../services/Store/Store';
import ChatApi from '../utils/Api/ChatApi';
import ChatSocket from '../utils/Api/ChatSocket';
import UserApi from '../utils/Api/UserApi';
import ErrorMessages from '../utils/errorMessages';
import errorHandler from '../utils/helpers/errorHandler';
import ApiError from '../utils/ApiError/ApiError';
import {
  AddUserType,
  ChatType,
  MessageType,
  SendMessageType,
  StoreSafeType,
  UserType,
} from '../types/types';

type ChatTokenReponse = {
  token: string,
};

class ChatController {
  private _userId: number;

  private _socket: ChatSocket | null;

  private _messageAmmount: number = 0;

  constructor(userId: number) {
    this._userId = userId;
  }

  // Создание чата с пользователем
  async createChat(userId: number) {
    try {
      // Получение информации пользователя
      const user = await UserApi.getUser(userId) as UserType;
      // Создание названия чата в зависимости от полученной информации пользователя
      const chatName = user.display_name
        ? `${user.display_name}`
        : `${user.first_name} ${user.second_name}`;

      // Если создание чата прошло успешно, добавить новый чат в хранилище
      const { id } = await ChatApi.createChat(chatName) as ChatType;
      const newChats = await ChatApi.getChats();
      Store.set('safe.chats', newChats);
      if (id) {
        // Добавление пользователя в чат
        await ChatApi.addUserToChat(userId, id);
        Store.set('safe.searchResults', false);
        // Открытие чата после его создания
        this.openChat(id);
      }
    } catch (err) {
      if (err instanceof Error) {
        console.error(errorHandler(err, ErrorMessages.CREATE_CHAT));
      }
    }
  }

  // Удаление чата
  async deleteChat() {
    try {
      // Получение ID текущего чата из хранилища
      const { chatId } = Store.getState().safe as StoreSafeType;

      // Отправка запроса на удаление чата
      await ChatApi.deleteChat(chatId!);
      // Удаление чата из списка чатов в хранилище
      const { chats } = Store.getState().safe as StoreSafeType;
      const updatedChats = chats!.filter((chat) => chat.id !== chatId);
      // Если имеются действующие чаты, подключение к первому из списка
      if (updatedChats.length > 0) {
        const newChatId = updatedChats[0].id;
        Store.set('safe.chats', updatedChats);
        this.openChat(newChatId);
      } else {
        Store.clearSafeState();
        this.closeSocket();
      }
    } catch (err) {
      if (err instanceof Error) {
        console.error(errorHandler(err, ErrorMessages.DELETE_CHAT));
      }
    }
  }

  // Подключение чата
  async openChat(chatId: number) {
    try {
      // Сброс счётчика загруженных сообщений
      this._messageAmmount = 0;

      // Получение информации о текущем чате
      const currentChat = this.getCurrentChat(chatId);

      // Закрытие текущего WSS
      this.closeSocket();

      // Получение списка пользователей чата и токена чата
      const [chatUsers, chatToken] = await Promise.all([
        this.getChatUsers(chatId),
        this.getChatToken(chatId),
      ]);

      // Обновление хранилища
      Store.set('safe.chatUsers', chatUsers);
      Store.set('safe.currentChat', currentChat);
      Store.set('safe.messageOwners', chatUsers);
      Store.set('safe.chatId', chatId);

      if (chatToken) {
        // Создание соединения WSS
        this._socket = new ChatSocket(
          this._userId,
          chatId,
          chatToken,
          this._handleSocketMessage.bind(this),
        );

        // Получение первых 20 новых сообщений
        this._socket.send({
          content: '0',
          type: 'get old',
        });
      } else {
        throw new Error('ChatToken отсутствует');
      }
    } catch (err) {
      if (err instanceof Error) {
        console.error(errorHandler(err, ErrorMessages.OPEN_CHAT));
      }
    }
  }

  // Отправка сообщения
  sendMessage(data: SendMessageType) {
    try {
      this._socket!.send({
        content: data.message,
        type: 'message',
      });
    } catch (err) {
      if (err instanceof Error) {
        console.error(errorHandler(err, ErrorMessages.SEND_MESSAGE));
      }
    }
  }

  // Загрузка дополнительных сообщений
  async getMoreMessage() {
    try {
      this._socket!.send({
        content: `${this._messageAmmount}`,
        type: 'get old',
      });

      // Изменение счётчика загруженных сообщений
      this._messageAmmount += 20;
    } catch (err) {
      if (err instanceof Error) {
        console.error(errorHandler(err, ErrorMessages.GET_MESSAGES));
      }
    }
  }

  // Обработчик новых сообщений
  async _handleSocketMessage(messageData: MessageType | MessageType[]) {
    try {
      // Если массив сообщений
      if (Array.isArray(messageData)) {
        let newMessages;
        const { messages } = Store.getState().safe as StoreSafeType;
        if (messages && messages.length > 0) {
          newMessages = messages.concat(messageData);
          await this._getMessageOwner(newMessages);
        } else {
          await this._getMessageOwner(messageData);
          newMessages = messageData;
        }
        Store.set('safe.messages', newMessages);
        // Иначе, если одно сообщение, добавляем его в начало массива с сообщениями
      } else if (messageData.type === 'message') {
        const { messages } = Store.getState().safe as StoreSafeType;
        if (messages) {
          Store.set('safe.messages', [...[messageData], ...messages]);
        } else {
          Store.set('safe.messages', [messageData]);
        }
      }
    } catch (err) {
      if (err instanceof Error) {
        console.error(errorHandler(err, ErrorMessages.MESSAGE_HANDLE));
      }
    } finally {
      Store.set('safe.isProcessing', false);
    }
  }

  // Поиск пользователя
  private async _findUser(login: string): Promise<UserType | null> {
    try {
      const user = await UserApi.findUser(login) as UserType[];

      // Если есть точное совпадение по пользователю
      if (Array.isArray(user) && user.length === 1) {
        // Возврат информации о пользователе
        return user[0];
      }

      // Возвращаем null, если нет точного совпадения по пользователю
      return null;
    } catch (err) {
      // Если ошибка API
      if (err instanceof ApiError) {
        console.error(errorHandler(err));
      }

      return null;
    }
  }

  // Добавление пользователя в чат
  async addGroupUser(data: AddUserType) {
    try {
      const { chatId } = Store.getState().safe as StoreSafeType;
      // Поиск пользователя
      const user = await this._findUser(data.login);

      // Если найдено точное совпадение
      if (user) {
        const { chatUsers } = Store.getState().safe as StoreSafeType;

        // Добавление пользователя, ранее не состоящего в группе
        const isGroupMember: boolean = chatUsers.some((chatUser) => chatUser.id === user.id);
        if (!isGroupMember) {
          try {
            await ChatApi.addUserToChat(user.id, chatId!);
            const newChatUsers = [user].concat(chatUsers);
            Store.set('safe.chatUsers', newChatUsers);
          } catch (err) {
            if (err instanceof ApiError) {
              console.error(errorHandler(err));
            }

            throw err;
          }
          // Ошибка, если пользователь уже состоит в чате
        } else {
          Store.set('safe.formError', ErrorMessages.ADDUSER_ISCHATMEMBER);
        }
        // Ошибка, если не найдено точное совпадение по пользователю
      } else {
        Store.set('safe.formError', ErrorMessages.ADDUSER_NOTFOUND);
      }
      // Отображение общей ошибки
    } catch (err) {
      if (err instanceof Error) {
        Store.set('safe.formError', errorHandler(err));
      }
    }
  }

  // Удаление пользователя из группы
  async removeGroupUser(userId: number): Promise<void> {
    try {
      const { chatId } = Store.getState().safe as StoreSafeType;
      await ChatApi.removeUserFromChat(userId, chatId!);
      const { chatUsers } = Store.getState().safe as StoreSafeType;
      const newChatUsers = chatUsers.filter((user) => user.id !== userId);
      Store.set('safe.chatUsers', newChatUsers);
    } catch (err) {
      if (err instanceof Error) {
        console.error(errorHandler(err, ErrorMessages.USER_REMOVE));
      }
    }
  }

  // Получение токена чата
  async getChatToken(chatId: number): Promise<string | null> {
    try {
      const response = await ChatApi.getChatToken(chatId) as ChatTokenReponse | null;
      if (response) {
        return response.token;
      }

      return null;
    } catch (err) {
      if (err instanceof Error) {
        console.error(errorHandler(err, ErrorMessages.NO_TOKEN));
      }

      return null;
    }
  }

  // Получение списка пользователей чата
  async getChatUsers(chatId: number): Promise<UserType[] | []> {
    try {
      const chatUsers = await ChatApi.getChatUsers(chatId) as UserType[] | null;
      if (chatUsers) {
        this._setChatOwner(chatUsers);
        return chatUsers;
      }

      return [];
    } catch (err) {
      if (err instanceof Error) {
        console.error(errorHandler(err, ErrorMessages.CHAT_USERS));
      }
      return [];
    }
  }

  // Получение списка чатов
  async getChats(): Promise<void> {
    try {
      const chats = await ChatApi.getChats() as ChatType[] | null;
      if (chats) {
        Store.set('safe.chats', chats);
      }
    } catch (err) {
      if (err instanceof Error) {
        console.error(errorHandler(err, ErrorMessages.BAD_CHAT_REQUEST));
      }
    }
  }

  // Получение первого чата из списка доступных чатов
  getFirstChat(): ChatType {
    const [firstChat] = (Store.getState().safe as StoreSafeType).chats as ChatType[];
    return firstChat;
  }

  // Получение информации о текущем чате
  getCurrentChat(chatId: number): ChatType {
    const { chats } = Store.getState().safe as StoreSafeType;
    const chatsToSort: ChatType[] = JSON.parse(JSON.stringify(chats));
    return chatsToSort.find((chat) => chat.id === chatId)!;
  }

  // Получение списка пользователей - владельцев сообщений
  // (в том числе пользователей, удалённных из чата)
  async _getMessageOwner(data: MessageType[]): Promise<void> {
    try {
      const messageOwners: Set<number> = new Set();
      // Добавление ID текущего пользователя
      const { id } = Store.getState().user as UserType;
      messageOwners.add(id);
      // Добавление id уникальных пользователей в коллекцию
      data.forEach((message) => messageOwners.add(message.user_id));
      // Запрос информации о каждом пользователе из коллекции
      const foundUsers: UserType[] = await Promise.all(
        Array.from(messageOwners)
          .map((userId) => UserApi.getUser(userId) as Promise<UserType>),
      );
      // Если список пользователей пустой,
      // установить список владельцев сообщений из текущих пользователей чата
      if (foundUsers.length > 0) {
        Store.set('safe.messageOwners', foundUsers);
      } else {
        const { chatUsers } = Store.getState().safe as StoreSafeType;
        Store.set('safe.messageOwners', chatUsers);
      }
    } catch (err) {
      if (err instanceof Error) {
        console.error(errorHandler(err, ErrorMessages.BAD_CHAT_REQUEST));
      }
    }
  }

  // Удаление сообщений чата из хранилища
  clearMessages() {
    Store.set('safe.messages', []);
  }

  // Определить владельца чата
  private _setChatOwner(chatUsers: UserType[]) {
    const { id } = chatUsers.find((user) => user.role === 'admin')!;
    Store.set('safe.chatOwnerId', id);
  }

  // Закрыть соединение WSS без очистки сообщений
  closeSocketSoft() {
    try {
      if (this._socket) {
        this._socket.closeConnection();
        this._socket = null;
        Store.set('safe.chats', []);
      }
    } catch (err) {
      if (err instanceof Error) {
        console.error(errorHandler(err, ErrorMessages.CLOSE_SOCKET));
      }
    }
  }

  // Закрыть соединение WSS
  closeSocket() {
    try {
      if (this._socket) {
        this._socket.closeConnection();
        this.clearMessages();
        this._socket = null;
      }
      this.clearMessages();
    } catch (err) {
      if (err instanceof Error) {
        console.error(errorHandler(err, ErrorMessages.CLOSE_SOCKET));
      }
    }
  }
}

export default ChatController;
