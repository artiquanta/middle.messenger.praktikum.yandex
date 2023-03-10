[![Sprint-4](https://github.com/artiquanta/middle.messenger.praktikum.yandex/actions/workflows/tests.yml/badge.svg?branch=sprint_4)](https://github.com/artiquanta/middle.messenger.praktikum.yandex/actions/workflows/tests.yml)

# Проектная работа. Мессенджер.

## Описание проекта

Первая проектная работа в рамках курса от **Яндекс.Практикум**.

В ходе четвёртого спринта написаны unit-тесты для HTTPTransport, Router, Block и других вспомогательных функций с использованием Mocha и Chai. Дополнительно был настроен Docker-контейнер для раздачи статики, настроен precommit, проведён аудит текущих зависимостей. Подключён Webpack.

**Дальнейшие планы по проекту:**
1. Оптимизировать обновление компонентов за счёт мемоизации
2. Доработать список чатов в меню навигации:
  2.1 Добавить интервал на проверку обновлений
  2.2 Изменять информацию о текущем чата по отправке или получении сообщения пользователя
3. Добавить модальное окно вывода сообщения об ошибке
4. Добавить модальное окно загрузки файлов в чат
5. Добавить возможность изменения аватара чата и его названия
6. Добавить переодичные запросы к серверу для проверки жизненого статуса чата и нахождения в нём пользователя
7. Улучшить лоадер и добавить дополнительные визуальные эффекты
8. Адаптировать макет под мобильные устройства
9. Добавить дополнительную отзывчивость элементам взаимодействия (формы, кнопки, ссыкли)
10. Доработать тесты

**Для запуска проекта используйте следующие команды:**
1. Сборка проекта - npm run build
2. Запуск проекта - npm start
3. Запуск Dev-сервера с hot reload - npm run dev
4. Сборка и запуск Docker - npm run docker
5. Запуск unit-тестов - npm run mocha
6. Запуск eslint - npm run lint
7. Запуск stylelint - npm run stylelint


## Ссылка на проектную работу

Ссылка на макет: [Figma](https://www.figma.com/file/NxHVGyrtVacAGaBIGCJM5D/Messsenger.-Sprint-1?t=0uRgnrCWzty5sfx1-1)

Проектная работа доступна на странице: [https://hilarious-capybara-51e99e.netlify.app](https://hilarious-capybara-51e99e.netlify.app)

Render: [https://messenger-eg6t.onrender.com/](https://messenger-eg6t.onrender.com/)
