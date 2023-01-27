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
    super(props);
    //
    this.children.messagesList;
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

  // Массив с сообщениями для последующего наполнения шаблона
  /*  const messagesList = [];
 
 
 // Обработка массива с сообщениями
 messages.forEach((message, index) => {
   const messageTime = message.time;
   const time = checkIfToday(messageTime)
     ? `Сегодня в ${convertTime(messageTime)}`
     : `${convertDay(messageTime)} ${convertTime(messageTime)}`;
 
   // Добавление разделителя сообщений по датам
   if (index === 0) {
     messagesList.push(ChatDivider({ content: 'Начало беседы' }));
   } else {
     const currentMessageDate = convertDay(messageTime);
     const previousMessageDate = convertDay(messages[index - 1].time);
 
     // Если даты отличаются, добавляем разделить
     if (currentMessageDate !== previousMessageDate) {
       messagesList.push(ChatDivider({ content: currentMessageDate }));
     }
   }
 
   messagesList.push(Message({
     owner: message.owner,
     content: message.content,
     time,
   }));
 
 }); */
  render(): DocumentFragment {
    return this.compile(template);
  }
}

export default ChatContent;
