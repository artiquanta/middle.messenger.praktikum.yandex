import './ChatContent.css';
import template from './ChatContent.hbs';
import Block from '../../../../services/Block';
import Message from './Message/Message';
import ChatDivider from './ChatDivider/ChatDivider';

type MessageTypes = 'text' | 'file' | 'location' | 'photo' | 'video';

type Messages = {
  owner: {
    id: number,
    avatar: string,
    username: string,
  },
  content: {
    type: keyof MessageTypes,
    fileName?: string,
    value: string,
  },
  time: EpochTimeStamp,
}[];

type Props = {
  messages: Messages,
  userId: number,
  events?: {
    selector: string;
    events: Record<string, (evt: Event) => void>,
  }[],
};

class ChatContent extends Block {
  constructor(props: Props) {
    const { messages, userId } = props;
    super();
    const chatContentBody: Record<string, Block | Block[]> = {};

    // Дочерний компонент с массивом сообщений
    chatContentBody.messages = this._renderMessages(messages, userId);

    // Добавление дочерних компонентов
    this.children.messages = chatContentBody;
  }

  // Конвертация времени
  _convertTime(time: EpochTimeStamp): string {
    return new Date(time * 1000).toLocaleTimeString('ru-RU', { timeStyle: 'short' });
  }

  // Конвертация даты
  _convertDay(time: EpochTimeStamp): string {
    return new Date(time * 1000).toLocaleDateString('ru-RU', { day: '2-digit', month: 'long', year: 'numeric' });
  }

  // Проверка, если день в сообщении сегодняшний
  _checkIfToday(time: EpochTimeStamp): boolean {
    const today = new Date().toLocaleDateString('ru-RU', { day: '2-digit', month: 'long', year: 'numeric' });
    if (this._convertDay(time) === today) {
      return true;
    }
    return false;
  }

  // Генерация сообщений в зависимости от их типа, добавление разделителя
  _renderMessages(messages: Messages, userId: number) {
    // Массив с сообщениями для последующего наполнения шаблона
    const messagesList: Block[] = [];

    // Обработка массива с сообщениями
    messages.forEach((message, index): void => {
      const messageTime: EpochTimeStamp = message.time;
      const time: string = this._checkIfToday(messageTime)
        ? `Сегодня в ${this._convertTime(messageTime)}`
        : `${this._convertDay(messageTime)} ${this._convertTime(messageTime)}`;

      // Добавление разделителя сообщений по датам
      if (index === 0) {
        messagesList.push(new ChatDivider({ content: 'Начало беседы' }));
      } else {
        const currentMessageDate = this._convertDay(messageTime);
        const previousMessageDate = this._convertDay(messages[index - 1].time);

        // Если даты отличаются, добавляем разделить
        if (currentMessageDate !== previousMessageDate) {
          messagesList.push(new ChatDivider({ content: currentMessageDate }));
        }
      }

      messagesList.push(new Message({
        owner: message.owner,
        content: message.content,
        time,
        userId,
        events: [
          {
            selector: 'message_type_user',
            events: {
              click: (evt: Event) => {
                evt.preventDefault();
                const target = evt.target as HTMLDivElement;
                target.closest('.message__container')!.classList.toggle('message__container_selected');
              },
            },
          },
        ],
      }));
    });

    // Возвращаем массив с сообщениями и разделителями
    return messagesList;
  }

  render(): DocumentFragment {
    return this.compile(template);
  }
}

export default ChatContent;
