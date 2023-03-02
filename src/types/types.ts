export type Indexed<T = unknown> = {
  [key in string]: T;
};

export type CompileTemplate = (args?: Record<string, unknown>) => string;

export type CompileProps = Record<string, unknown>;

export type PlainObject<T = any> = {
  [k in string]: T;
};

export type Form = {
  id: string,
  heading?: string,
  link?: {
    url: string
    title: string,
  },
  buttonTitle: string,
};

export type HTMLInputTypeAttribute = 'button' | 'checkbox' | 'color' | 'date' | 'datetime' | 'local' | 'email' | 'file' | 'hidden' | 'image' | 'month' | 'number' | 'password' | 'radio' | 'range' | 'reset' | 'search' | 'submit' | 'tel' | 'text' | 'time' | 'url' | 'week';

export type Inputs = {
  title: string,
  type: HTMLInputTypeAttribute,
  name: string,
  minLength: number,
  maxLength: number,
  required: boolean,
}[];

export type FormType = {
  form: Form,
  inputs: Inputs,
};

export type UserData = {
  first_name: string,
  second_name: string,
  login: string,
  email: string,
  password: string,
  phone: string,
};

export type CallBack = (data?: unknown) => void;

export type FormCallBack = (data: Record<string, FormDataEntryValue>) => void;

export type State = {
  [key: string]: any,
};

export type MessageType = {
  chat_id: number,
  content: string,
  file?: {
    id: number,
    user_id: number,
    path: string,
    fileName: string,
    content_type: string,
    content_size: number,
    upload_date: string,
  },
  id: number,
  is_read: boolean,
  time: string,
  type: string,
  user_id: number,
};

export type ChatType = {
  avatar: string,
  created_by: number,
  id: number,
  last_message: {
    content: string,
    id: number,
    time: string,
    user: {
      avatar: string | null,
      display_name: string | null,
      email: string,
      first_name: string,
      second_name: string,
      login: string,
      phone: string,
    },
  },
  title?: string,
  unread_count?: number,
};

export type EventType = {
  selector: string;
  events: Record<string, (evt: Event) => void>,
};

export type UserType = {
  avatar: string | null,
  display_name: string | null,
  email: string,
  first_name: string,
  second_name: string,
  id: number,
  login: string,
  phone: string,
  role?: string,
};

export type SearchDataType = {
  chat_search: string,
};

export type AddUserType = {
  login: string,
};

export type SendMessageType = {
  message: string,
};

export type UpdateProfileType = {
  first_name: string,
  second_name: string,
  login: string,
  email: string,
  display_name: string,
  phone: string,
};

export type ChangePasswordType = {
  oldPassword: string,
  newPassword: string,
};

export type LoginFormDataType = {
  login: string,
  password: string,
};

export type RegisterFormDataType = {
  first_name: string,
  second_name: string,
  login: string,
  email: string,
  password: string,
  phone: string,
};

export type RegisterResponse = {
  id: number,
};

export type StoreSafeType = {
  chatId?: number,
  chats?: ChatType[],
  chatUsers: ChatType[],
  messages: MessageType[],
};

export type ChatTokenReponse = {
  token: string,
};

export type ErrorType = {
  response?: {
    reason: string,
  }
};
