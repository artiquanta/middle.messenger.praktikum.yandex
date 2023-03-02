import './ChatContent.css';
import template from './ChatContent.hbs';
import Block from '../../../../services/Block';
import connect from '../../../../services/Store/connect';
import Message from './Message/Message';
import ChatDivider from './ChatDivider/ChatDivider';
import { checkIfToday, convertDay, convertTime } from '../../../../utils/convertTime';
import isEqual from '../../../../utils/isEqual';
import { MessageType, State, UserType } from '../../../../types/types';

type Props = {
  messages: MessageType[],
  user: UserType,
  chatUsers: UserType[],
  events?: {
    selector: string;
    events: Record<string, (evt: Event) => void>,
  }[],
};

class ChatContent extends Block {
  constructor(props: Props) {
    super(props);

    // Дочерний компонент с массивом сообщений
    this.children.messagesList = this._renderMessages(
      this.props.user,
      this.props.messageOwners,
      this.props.messages,
    );
  }

  componentDidUpdate(oldProps: Props, newProps: Props) {
    if (isEqual(oldProps, newProps)) {
      return false;
    }

    if (newProps.messages && newProps.messages !== oldProps.messages) {
      this.children.messagesList = this._renderMessages(
        this.props.user,
        this.props.messageOwners,
        newProps.messages,
      );
      return true;
    }

    return true;
  }

  // Генерация сообщений в зависимости от их типа, добавление разделителя
  private _renderMessages(user: UserType, messageOwners: UserType[], messages: MessageType[] = []) {
    // Массив с сообщениями для последующего наполнения шаблона
    const messagesList: Block[] = [];

    // Обработка массива с сообщениями
    messages.forEach((message, index): void => {
      const messageTime: string = message.time;
      const time: string = checkIfToday(messageTime)
        ? `Сегодня в ${convertTime(messageTime)}`
        : `${convertDay(messageTime)} ${convertTime(messageTime)}`;

      // Добавление разделителя сообщений по датам
      if (index !== 0) {
        const currentMessageDate = convertDay(messageTime);
        const previousMessageDate = convertDay(messages[index - 1].time);

        // Если даты отличаются, добавляем разделить
        if (currentMessageDate !== previousMessageDate) {
          if (checkIfToday(messages[index - 1].time)) {
            messagesList.push(new ChatDivider({ content: 'Сегодня' }));
          } else {
            messagesList.push(new ChatDivider({ content: previousMessageDate }));
          }
        }
      }

      const messageOwner = messageOwners.find((chatUser) => chatUser.id === message.user_id)!;

      // Добавляем компонент сообщения в массив сообщений
      messagesList.push(new Message({
        content: message.content,
        file: message.file,
        type: message.type,
        owner: messageOwner,
        time,
        user,
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

      if (index === messages.length - 1) {
        messagesList.push(new ChatDivider({ content: 'Начало беседы' }));
      }
    });

    // Возвращаем массив с сообщениями и разделителями
    return messagesList;
  }

  render(): DocumentFragment {
    return this.compile(template);
  }
}

function mapStateToProps(state: State) {
  return {
    messages: state.safe?.messages,
    user: state.user,
    chatUsers: state.safe?.chatUsers,
    messageOwners: state.safe?.messageOwners,
  };
}

export default connect(ChatContent, mapStateToProps);
