# Laboratory Networks

Персональная landing page-презентация frontend/full-stack разработчика Arthur Dadalian. Проект сделан как тестовое задание: адаптивный React-интерфейс, Express API, рабочая feedback-форма через mailto email draft, AI Summary Studio и конфигурация для деплоя на Vercel.

## Возможности

- Современная адаптивная landing page с секциями Hero, About, Tech stack, Experience, AI tools, Projects, Contacts и Feedback form.
- Переключатель языка RU/EN в header; по умолчанию открывается русская версия.
- Семантическая HTML-структура, доступные поля формы, состояния loading/success/error.
- Feedback form открывает готовое письмо на `arthurdadalian@gmail.com` с копией на email отправителя.
- AI Summary Studio на `POST /api/ai-summary` с OpenAI при наличии ключа и безопасным fallback без ключа.
- Минимальные backend-тесты для API и валидации.

## Стек

- Frontend: React, TypeScript, Vite, SCSS, Lucide React.
- Backend: Node.js, Express, TypeScript.
- Validation: Zod на backend и клиентская проверка на frontend.
- Email: browser `mailto:` draft, без SMTP-секретов.
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
2. При отправке frontend собирает `mailto:` ссылку на `arthurdadalian@gmail.com`.
3. Email отправителя добавляется в `cc`, чтобы пользователь получил копию письма после отправки.
4. В почтовом приложении открывается готовый draft с именем, телефоном, email и комментарием.
5. Пользователь проверяет текст и нажимает Send в своем почтовом приложении.

SMTP, Gmail App Password, Resend и другие email-сервисы больше не нужны для feedback form.

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
- Express routes и frontend contact flow;
- responsive layout и состояния интерфейса;
- черновик документации.

Вручную проверены и исправлены:

- TypeScript и build ошибки;
- корректность API-путей;
- frontend/backend environment usage;
- обработка ошибок contact form;
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
CLIENT_URL=https://your-vercel-domain.vercel.app
OPENAI_API_KEY=
OPENAI_MODEL=gpt-4.1-mini
```

`OPENAI_API_KEY` необязателен. Для feedback form больше не нужны email-секреты в Vercel, потому что форма открывает `mailto:` draft в почтовом приложении пользователя.

## Ограничения

- Без валидного OpenAI key AI endpoint работает в fallback-режиме.
- В проекте нет базы данных: заявки открываются как email draft и не сохраняются.

## Links

- GitHub: https://github.com/witharthur/laboratory_networks
- Vercel: https://laboratorynetworks.vercel.app
