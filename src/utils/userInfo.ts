import { avatarLink } from './constants';

export type UserInfo = {
  user: {
    id: number,
    first_name: string,
    second_name: string,
    display_name: string,
    login: string,
    email: string,
    phone: string,
    avatar: string,
  },
};

export const userId: number = 123;

export const userInfo: UserInfo = {
  user: {
    id: 123,
    first_name: 'Человек',
    second_name: 'Человеков',
    display_name: 'Человек',
    login: 'chelovek',
    email: 'chelovek@test.test',
    phone: '+79010000001',
    avatar: avatarLink,
  },
};
