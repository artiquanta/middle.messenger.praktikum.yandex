import Store from '../services/Store/Store';
import UserApi from '../utils/Api/UserApi';
import errorHandler from '../utils/helpers/errorHandler';
import { SearchDataType, StoreSafeType } from '../types/types';

class SearchController {
  async search(data: SearchDataType) {
    const searchRequest = data.chat_search.toLowerCase();

    // Если запрос пустой - очищаем результаты поиска и вовзращаем предыдущее состояние
    if (searchRequest === '') {
      Store.set('safe.searchResults', false);
      return;
    }
    try {
      const foundUsers = await UserApi.findUser(searchRequest);
      if (foundUsers) {
        Store.set('safe.foundUsers', foundUsers);
        Store.set('safe.searchResults', true);
        this._filterChat(searchRequest);
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error(errorHandler(err), 'Ошибка при выполнении поиска');
      }
    }
  }

  private _filterChat(searchRequest: string) {
    const { chats } = Store.getState().safe as StoreSafeType;
    if (chats) {
      const filteredChat = chats.filter(
        (chat) => chat.title!.toLowerCase().includes(searchRequest),
      );
      Store.set('safe.foundChats', filteredChat);
    }
  }
}

export default SearchController;
