# Laboratory Networks

Персональная landing page-презентация frontend/full-stack разработчика Arthur Dadalian. Проект сделан как тестовое задание: адаптивный React-интерфейс, Express API, рабочая feedback-форма, отправка писем через Resend, AI Summary Studio и конфигурация для деплоя на Vercel.

## Возможности

- Современная адаптивная landing page с секциями Hero, About, Tech stack, Experience, AI tools, Projects, Contacts и Feedback form.
- Переключатель языка RU/EN в header; по умолчанию открывается русская версия.
- Семантическая HTML-структура, доступные поля формы, состояния loading/success/error.
- Реальная отправка формы на `POST /api/contact`.
- Два email после успешной отправки: владельцу сайта и копия пользователю.
- AI Summary Studio на `POST /api/ai-summary` с OpenAI при наличии ключа и безопасным fallback без ключа.
- Минимальные backend-тесты для API, валидации и email-сервиса.

## Стек

- Frontend: React, TypeScript, Vite, SCSS, Lucide React.
- Backend: Node.js, Express, TypeScript.
- Validation: Zod на backend и клиентская проверка на frontend.
- Email: Resend.
- AI: OpenAI SDK, Responses API, fallback summary.
- Quality: TypeScript, ESLint, Vitest, Supertest, production build.
- Deployment: Vercel, serverless bridge для Express API.

## Структура проекта

```text
project/
  api/
    index.ts
  frontend/
    public/
    src/
      components/
      data/
      hooks/
      services/
      styles/
  backend/
    src/
      config/
      middleware/
      routes/
      services/
      tests/
      utils/
  vercel.json
  README.md
```

## Установка

```bash
npm install
```

## Переменные окружения

Секреты нельзя коммитить. Для локальной разработки можно использовать `.env` в корне или `backend/.env`; для frontend можно создать `frontend/.env`.

Backend:

```env
RESEND_API_KEY=
RESEND_FROM_EMAIL=onboarding@resend.dev
OWNER_EMAIL=arthurdadalian@gmail.com
CLIENT_URL=http://localhost:5173
PORT=5000
OPENAI_API_KEY=
OPENAI_MODEL=gpt-4.1-mini
```

Frontend:

```env
VITE_API_URL=
```

Если `VITE_API_URL` пустой, frontend отправляет запросы на относительные пути `/api/...`. Локально это работает через Vite proxy, на Vercel через serverless route.

## Локальная разработка

Запуск frontend и backend вместе:

```bash
npm run dev
```

Отдельный запуск:

```bash
npm run dev:frontend
npm run dev:backend
```

По умолчанию:

- Frontend: `http://localhost:5173`
- Backend: `http://localhost:5000`
- Health check: `GET http://localhost:5000/api/health`

## Сборка и проверки

```bash
npm run type-check
npm run lint
npm test
npm run build
```

Полная проверка одной командой:

```bash
npm run check
```

## Как работает feedback form

Форма содержит поля `name`, `phone`, `email`, `comment`.

1. Frontend валидирует обязательные поля, формат email, телефон и длину комментария.
2. При отправке показывается loading state и вызывается `POST /api/contact`.
3. Backend повторно валидирует body через Zod.
4. Resend сначала отправляет письмо владельцу сайта на `OWNER_EMAIL`.
5. Затем Resend пробует отправить копию пользователю на email из формы.
6. API возвращает понятный JSON.
7. Frontend показывает success/error state и очищает форму после успешной отправки.

Если email-сервис не настроен, API возвращает `503` с безопасным сообщением без раскрытия секретов.
Если копия пользователю не доставилась, заявка все равно считается отправленной после успешного owner email, чтобы владелец сайта не терял обращения.

## Как работает AI Summary Studio

Frontend-блок отправляет текст профиля и выбранную цель summary в `POST /api/ai-summary`.

Доступные режимы:

- `portfolio`
- `recruiter`
- `project`
- `linkedin`

Если `OPENAI_API_KEY` задан, backend использует официальный OpenAI SDK и модель из `OPENAI_MODEL`. Если ключ отсутствует или провайдер недоступен, endpoint не падает и возвращает fallback summary с `source: "fallback"`.

## AI tools usage

Во время разработки AI использовался для ускорения проектирования структуры frontend/backend, генерации черновиков компонентов, API-сервисов, SCSS-анимаций, README и поиска потенциальных ошибок в form/API flow.

С AI были подготовлены:

- базовая структура монорепозитория;
- React-компоненты landing page;
- Express routes и service layer;
- responsive layout и состояния интерфейса;
- черновик документации.

Вручную проверены и исправлены:

- TypeScript и build ошибки;
- корректность API-путей;
- frontend/backend environment usage;
- обработка ошибок Resend;
- fallback для AI без ключа;
- client/server validation;
- доступность labels, aria-атрибутов и disabled/loading states;
- Vercel deployment setup.

## Деплой на Vercel

Проект подготовлен для Vercel:

- `frontend/dist` используется как output directory;
- `/api/*` переписывается на Express app через `api/index.ts`;
- frontend использует относительные API-пути;
- `vercel.json` находится в корне.

Production env variables в Vercel:

```env
RESEND_API_KEY=
RESEND_FROM_EMAIL=onboarding@resend.dev
OWNER_EMAIL=arthurdadalian@gmail.com
CLIENT_URL=https://your-vercel-domain.vercel.app
OPENAI_API_KEY=
OPENAI_MODEL=gpt-4.1-mini
```

`OPENAI_API_KEY` необязателен. `RESEND_API_KEY`, `RESEND_FROM_EMAIL` и `OWNER_EMAIL` нужны для реальной отправки feedback emails. Для production лучше использовать подтвержденный домен в Resend.

## Ограничения

- Без настроенного Resend feedback API вернет `503`, потому что реальная отправка email невозможна.
- Без валидного OpenAI key AI endpoint работает в fallback-режиме.
- В проекте нет базы данных: заявки отправляются email-ом и не сохраняются.

## Links

- GitHub: https://github.com/witharthur/laboratory_networks
- Vercel: https://laboratorynetworks.vercel.app
