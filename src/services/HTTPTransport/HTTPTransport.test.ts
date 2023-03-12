import { expect } from 'chai';
import HTTPTransport from './HTTPTransport';
import { BASE_API_URL, HEADERS } from '../../utils/constants';

describe('Services/HTTPTransport. Проверка отправки запросов', () => {
  it('GET успешно отправлен', async () => {
    await new HTTPTransport().get(BASE_API_URL, {
      headers: HEADERS,
    })
      .then((res) => {
        expect(res.status).to.be.an('number');
      });
  });

  it('POST успешно отправлен', async () => {
    await new HTTPTransport().post(`${BASE_API_URL}/chats`, {
      headers: HEADERS,
      data: JSON.stringify({
        title: 'art',
      }),
    })
      .then((res) => {
        expect(res.status).to.be.an('number').that.equal(401);
      });
  });

  it('PUT успешно отправлен', async () => {
    await new HTTPTransport().put(`${BASE_API_URL}/chats/users`, {
      headers: HEADERS,
      data: JSON.stringify({
        users: [15],
        chatId: 17,
      }),
    })
      .then((res) => {
        expect(res.status).to.be.an('number').that.equal(401);
      });
  });

  it('PATCH успешно отправлен', async () => {
    await new HTTPTransport().patch(BASE_API_URL, {
      headers: HEADERS,
      data: JSON.stringify({
        name: 'art',
      }),
    })
      .then((res) => {
        expect(res.status).to.be.an('number').that.equal(404);
      });
  });

  it('DELETE успешно отправлен', async () => {
    await new HTTPTransport().delete(`${BASE_API_URL}/chats`, {
      headers: HEADERS,
      data: JSON.stringify({
        chatId: 5,
      }),
    })
      .then((res) => {
        expect(res.status).to.be.an('number').that.equal(401);
      });
  });

  describe('Проверка прикрепления Cookies', () => {
    it('Cookies успешно прикрепляются', async () => {
      const request = await new HTTPTransport().get(`${BASE_API_URL}/chats`, {
        headers: HEADERS,
        credentials: true,
      });
      expect(request.withCredentials).to.be.an('boolean').that.equal(true);
    });
  });
});
