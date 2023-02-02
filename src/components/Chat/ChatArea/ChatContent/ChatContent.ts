import './ChatContent.css';
import template from './ChatContent.hbs';
import Message from './Message/Message';
import ChatDivider from './ChatDivider/ChatDivider';
import Block from '../../../../services/Block';

type Props = {
  [key: string]: unknown
};

//function ChatContent(messages) {
class ChatContent extends Block {
  constructor(props: Props) {
    const { messages, userId } = props;
    super();
    const body = {};
    //
    body.messages = this._renderMessages(messages, userId);
    //console.log(this._renderMessages(messages));
    this.children.messages = body;
  }

  // Конвертация времени
  convertTime(time: number): string {
    return new Date(time * 1000).toLocaleTimeString('ru-RU', { timeStyle: 'short' });
  }

  // Конвертация даты
  convertDay(time: number): string {
    return new Date(time * 1000).toLocaleDateString('ru-RU', { day: '2-digit', month: 'long', year: 'numeric' });
  }

  // Проверка, если день в сообщении сегодняшний
  checkIfToday(time: number): boolean {
    const today = new Date().toLocaleDateString('ru-RU', { day: '2-digit', month: 'long', year: 'numeric' });
    if (this.convertDay(time) === today) {
      return true;
    } else {
      return false;
    }
  }

  _renderMessages(messages, userId) {


    // Массив с сообщениями для последующего наполнения шаблона
    const messagesList = [];


    // Обработка массива с сообщениями
    messages.forEach((message, index) => {
      const messageTime = message.time;
      const time = this.checkIfToday(messageTime)
        ? `Сегодня в ${this.convertTime(messageTime)}`
        : `${this.convertDay(messageTime)} ${this.convertTime(messageTime)}`;

      // Добавление разделителя сообщений по датам
      if (index === 0) {
        messagesList.push(new ChatDivider({ content: 'Начало беседы' }));
      } else {
        const currentMessageDate = this.convertDay(messageTime);
        const previousMessageDate = this.convertDay(messages[index - 1].time);

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
      }));
    });
    return messagesList;
  }

  render(): DocumentFragment {
    return this.compile(template);
  }
}

export default ChatContent;
