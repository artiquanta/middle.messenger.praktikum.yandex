import { MessageType } from '../../types/types';

type CallBack = (data: MessageType | MessageType[]) => void;

class ChatSocket {
  _socket: WebSocket;

  _callBack: CallBack;

  _ping: ReturnType<typeof setInterval>;

  constructor(userId: number, chatId: number, token: string, callBack: CallBack) {
    const webSocketUrl = `wss://ya-praktikum.tech/ws/chats/${userId}/${chatId}/${token}`;
    this._socket = new WebSocket(webSocketUrl);
    this.addEvents();

    this._callBack = callBack;
  }

  _open() {
    this._ping = setInterval(() => {
      this._socket.send(JSON.stringify({
        type: 'ping',
      }));
    }, 15000);
  }

  _close() {
    clearInterval(this._ping);
    this.removeEvents();
  }

  _error(evt: Event) {
    console.error('Произошла ошибка', evt);
  }

  message(evt: MessageEvent) {
    this._callBack(JSON.parse(evt.data));
  }

  send(data: any) {
    if (this._socket.readyState === 0) {
      setTimeout(() => this.send(data), 300);
    } else {
      this._socket.send(JSON.stringify(data));
    }
  }

  closeConnection() {
    this._socket.close(1000);
  }

  addEvents(): void {
    this._socket.addEventListener('open', this._open.bind(this));
    this._socket.addEventListener('close', this._close.bind(this));
    this._socket.addEventListener('error', this._error.bind(this));
    this._socket.addEventListener('message', this.message.bind(this));
  }

  removeEvents() {
    this._socket.removeEventListener('open', this._open.bind(this));
    this._socket.removeEventListener('close', this._close.bind(this));
    this._socket.removeEventListener('error', this._error.bind(this));
    this._socket.removeEventListener('message', this.message);
  }
}

export default ChatSocket;
