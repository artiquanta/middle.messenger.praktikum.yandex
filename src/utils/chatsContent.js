import { avatarLink } from "./constants";

export const chats = [
  {
    owner: true,
    link: avatarLink,
    name: 'Человек Человеков',
    lastMessage: {
      content: 'Привет!',
      user: 123,
    },
    time: '18:35',
    unreadCount: 0,
  },
  {
    owner: false,
    link: avatarLink,
    name: 'NickName',
    lastMessage: {
      content: 'Привет! Как дела?',
      user: 133,
    },
    time: '11:05',
    unreadCount: 3,
  },
  {
    owner: false,
    link: avatarLink,
    name: 'Другое имя',
    lastMessage: {
      content: 'Файл',
      user: 123,
    },
    time: '12:15',
    unreadCount: 0,
  },
  {
    owner: true,
    link: avatarLink,
    name: 'Группа "Интересы"',
    lastMessage: {
      content: 'Доброе утро!',
      user: 123,
    },
    time: '13:15',
    unreadCount: 0,
  },
  {
    owner: false,
    link: avatarLink,
    name: 'NickName Точно',
    lastMessage: {
      content: 'Локация',
      user: 124,
    },
    time: '14:55',
    unreadCount: 5,
  },
  {
    owner: false,
    link: avatarLink,
    name: 'Человек 1',
    lastMessage: {
      content: 'Видео',
      user: 113,
    },
    time: '13:12',
    unreadCount: 11,
  },
  {
    owner: false,
    link: avatarLink,
    name: 'Человек 2',
    lastMessage: {
      content: 'Смотри, что нашёл!',
      user: 115,
    },
    time: '11:05',
    unreadCount: 120,
  },
  {
    owner: true,
    link: avatarLink,
    name: 'Человек 3',
    lastMessage: {
      content: 'Привет!',
      user: 120,
    },
    time: '19:15',
    unreadCount: 1,
  },
  {
    owner: false,
    link: avatarLink,
    name: 'NickName',
    lastMessage: {
      content: 'Видео',
      user: 116,
    },
    time: '11:05',
    unreadCount: 12,
  },
  {
    owner: true,
    link: avatarLink,
    name: 'Человек Человеков',
    lastMessage: {
      content: 'Привет! :)',
      user: 123,
    },
    time: '18:35',
    unreadCount: 0,
  },
  {
    owner: true,
    link: avatarLink,
    name: 'Человек Человеков',
    lastMessage: {
      content: 'Привет! Как дела?',
      user: 123,
    },
    time: '18:35',
    unreadCount: 0,
  },
  {
    owner: true,
    link: avatarLink,
    name: 'Человек Человеков',
    lastMessage: {
      content: 'Привет! Как погода?',
      user: 120,
    },
    time: '18:35',
    unreadCount: 1,
  },
  {
    owner: true,
    link: avatarLink,
    name: 'Человек Человеков',
    lastMessage: {
      content: 'Привет!',
      user: 154,
    },
    time: '18:35',
    unreadCount: 0,
  },
  {
    owner: true,
    link: avatarLink,
    name: 'Человек Человеков',
    lastMessage: {
      content: 'Привет!',
      user: 175,
    },
    time: '18:35',
    unreadCount: 0,
  },
  {
    owner: true,
    link: avatarLink,
    name: 'Человек Человеков',
    lastMessage: {
      content: 'Привет!',
      user: 198,
    },
    time: '18:35',
    unreadCount: 1,
  },
  {
    owner: false,
    link: avatarLink,
    name: 'NickName',
    lastMessage: {
      content: 'Привет!',
      user: 145,
    },
    time: '11:05',
    unreadCount: 12,
  },
  {
    owner: false,
    link: avatarLink,
    name: 'NickName',
    lastMessage: {
      content: 'Привет!',
      user: 123,
    },
    time: '11:05',
    unreadCount: 0,
  },
  {
    owner: false,
    link: avatarLink,
    name: 'NickName',
    lastMessage: {
      content: 'Привет!',
      user: 123,
    },
    time: '11:05',
    unreadCount: 0,
  },
  {
    owner: false,
    link: avatarLink,
    name: 'NickName',
    lastMessage: {
      content: 'Привет!',
      user: 123,
    },
    time: '11:05',
    unreadCount: 0,
  },
  {
    owner: false,
    link: avatarLink,
    name: 'NickName',
    lastMessage: {
      content: 'Привет!',
      user: 121,
    },
    time: '11:05',
    unreadCount: 120,
  },
];

export const chatData = {
  group: true,
  groupOwner: 123,
  groupUsers: [
    {
      name: 'Человек 1',
      avatar: avatarLink,
      id: 123,
    },
    {
      name: 'Человек 2',
      avatar: avatarLink,
      id: 15,
    },
    {
      name: 'Человек 2',
      avatar: avatarLink,
      id: 15,
    },
    {
      name: 'Человек 2',
      avatar: avatarLink,
      id: 15,
    },
    {
      name: 'Человек 2',
      avatar: avatarLink,
      id: 15,
    },
    {
      name: 'Человек 2',
      avatar: avatarLink,
      id: 15,
    },
    {
      name: 'Человек 2',
      avatar: avatarLink,
      id: 15,
    },
    {
      name: 'Человек 2',
      avatar: avatarLink,
      id: 15,
    },
    {
      name: 'Человек 2',
      avatar: avatarLink,
      id: 15,
    },
  ],
  name: 'Группа "Человеков"',
  messages: [
    {
      owner: {
        id: 123,
        avatar: avatarLink,
        username: 'Человек Человеков',
      },
      content: {
        type: 'text',
        value: 'Привет! Как дела?',
      },
      time: 1672902091,
    },
    {
      owner: {
        id: 121,
        avatar: avatarLink,
        username: 'Человек',
      },
      content: {
        type: 'file',
        value: 'http://localhost:1234/file.txt',
        fileName: 'file.txt',
      },
      time: 1672902091,
    },
    {
      owner: {
        id: 121,
        avatar: avatarLink,
        username: 'Человек',
      },
      content: {
        type: 'text',
        value: 'Вот ссылочка: http://localhost:1234/file.txt',
      },
      time: 1672902090,
    },
    {
      owner: {
        id: 121,
        avatar: avatarLink,
        username: 'Человек',
      },
      content: {
        type: 'location',
        value: '82.949146,55.011570',
      },
      time: 1662902191,
    },
    {
      owner: {
        id: 121,
        avatar: avatarLink,
        username: 'Человек',
      },
      content: {
        type: 'video',
        value: 'https://pictures.s3.yandex.net/iframes_topic/3.mp4',
      },
      time: 1664902191,
    },
    {
      owner: {
        id: 121,
        avatar: avatarLink,
        username: 'Человек',
      },
      content: {
        type: 'image',
        value: avatarLink,
      },
      time: 1664902191,
    },
    {
      owner: {
        id: 123,
        avatar: avatarLink,
        username: 'Человек',
      },
      content: {
        type: 'file',
        value: 'http://localhost:1234/file.txt',
        fileName: 'file.txt',
      },
      time: 1662902091,
    },
  ],
};