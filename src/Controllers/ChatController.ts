import Store from '../services/Store/Store';
import ChatApi from '../utils/Api/ChatApi';
import ChatSocket from '../utils/Api/ChatSocket';
import UserApi from '../utils/Api/UserApi';
import {
  AddUserType,
  ChatTokenReponse,
  ChatType,
  MessageType,
  SendMessageType,
  StoreSafeType,
  UserType,
} from '../types/types';
import ErrorMessages from '../utils/errorMessages';

class ChatController {
  private _userId: number;

  private _socket: ChatSocket | null;

  private _messageAmmount: number = 0;

  constructor(userId: number) {
    this._userId = userId;
  }

  // Создание чата с пользователем
  async createChat(userId: number) {
    // Получение информации пользователя
    const user = await UserApi.getUser(userId) as UserType;
    // Создание названия чата в зависимости от полученной информации пользователя
    const chatName = user.display_name
      ? `${user.display_name}`
      : `${user.first_name} ${user.second_name}`;

    try {
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
      console.log('При создании чата произошла ошибка', err);
    }
  }

  // Удаление чата
  async deleteChat() {
    // Получение ID текущего чата из хранилища
    const { chatId } = Store.getState().safe as StoreSafeType;

    try {
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
      console.log('Ошибка при удалении чата', err);
    }
  }

  // Подключение чата
  async openChat(chatId: number) {
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
  }

  // Отправка сообщения
  sendMessage(data: SendMessageType) {
    this._socket!.send({
      content: data.message,
      type: 'message',
    });
  }

  // Загрузка дополнительных сообщений
  async getMoreMessage() {
    this._socket!.send({
      content: `${this._messageAmmount}`,
      type: 'get old',
    });

    // Изменение счётчика загруженных сообщений
    this._messageAmmount += 20;
  }

  // Обработчик новых сообщений
  async _handleSocketMessage(messageData: MessageType | MessageType[]) {
    Store.set('safe.isProcessing', false);
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
    } else if (messageData.type === 'message') {
      const { messages } = Store.getState().safe as StoreSafeType;
      const newMessages = [messageData].concat(messages);
      Store.set('safe.messages', newMessages);
    }
  }

  // Добавление пользователя в чат
  async addGroupUser(data: AddUserType) {
    const { chatId } = Store.getState().safe as StoreSafeType;
    const user = await UserApi.findUser(data.login)
      .then((res) => {
        // Если есть точное совпадение по пользователю
        if (Array.isArray(res) && res.length === 1) {
          // Возврат информации о пользователя
          return res[0];
        }
        return Promise.reject(res);
      })
      .catch((err) => {
        if (err.response) {
          Store.set('safe.formError', ErrorMessages.BAD_RESPONSE);
        } else {
          Store.set('safe.formError', ErrorMessages.ADDUSER_NOTFOUND);
        }
      });

    if (user) {
      const { chatUsers } = Store.getState().safe as StoreSafeType;

      // Добавление пользователя, ранее не состоящего в группе
      const isGroupMember: boolean = chatUsers.some((chatUser) => chatUser.id === user.id);
      if (!isGroupMember) {
        await ChatApi.addUserToChat(user.id, chatId!)
          .then(() => {
            const newChatUsers = [user].concat(chatUsers);
            Store.set('safe.chatUsers', newChatUsers);
          })
          .catch((err) => {
            if (err.response) {
              Store.set('safe.formError', ErrorMessages.ADDUSER_ISCHATMEMBER);
            } else {
              Store.set('safe.formError', ErrorMessages.BAD_RESPONSE);
            }
          });
      }
    }
  }

  // Удаление пользователя из группы
  removeGroupUser(userId: number): void {
    const { chatId } = Store.getState().safe as StoreSafeType;
    ChatApi.removeUserFromChat(userId, chatId!)
      .then(() => {
        const { chatUsers } = Store.getState().safe as StoreSafeType;
        const newChatUsers = chatUsers.filter((user) => user.id !== userId);
        Store.set('safe.chatUsers', newChatUsers);
      })
      .catch((err) => err);
  }

  // Получение токена чата
  async getChatToken(chatId: number): Promise<string> {
    return ChatApi.getChatToken(chatId)
      .then((res) => {
        const response = res as ChatTokenReponse;
        return response.token;
      });
  }

  // Получение списка пользователей чата
  async getChatUsers(chatId: number): Promise<UserType[] | []> {
    try {
      const chatUsers = await ChatApi.getChatUsers(chatId) as UserType[];
      if (chatUsers) {
        this._setChatOwner(chatUsers);
        return chatUsers;
      }
    } catch (err) {
      console.log('При получении списка пользователей произошла ошибка', err);
    }
    return [];
  }

  // Получение списка чатов
  async getChats(): Promise<void> {
    return ChatApi.getChats()
      .then((res) => {
        Store.set('safe.chats', res);
      })
      .catch((err) => console.log('При получении списка чатов произошла ошибка', err));
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
  async _getMessageOwner(data: MessageType[]) {
    const messageOwners: Set<number> = new Set();
    data.forEach((message) => messageOwners.add(message.user_id));
    const foundUsers: UserType[] = await Promise.all(
      Array.from(messageOwners)
        .map((userId) => UserApi.getUser(userId) as Promise<UserType>),
    );
    // Если сообщения отсутствуют,
    // установить список владельцев сообщений из текущих пользователей чата
    if (foundUsers.length > 0) {
      Store.set('safe.messageOwners', foundUsers);
    } else {
      const { chatUsers } = Store.getState().safe as StoreSafeType;
      Store.set('safe.messageOwners', chatUsers);
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
    if (this._socket) {
      this._socket.closeConnection();
      this._socket = null;
      Store.set('safe.chats', []);
    }
  }

  // Закрыть соединение WSS
  closeSocket() {
    if (this._socket) {
      this._socket.closeConnection();
      this.clearMessages();
      this._socket = null;
    }
    this.clearMessages();
  }
}

export default ChatController;
