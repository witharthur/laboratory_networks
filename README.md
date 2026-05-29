# Laboratory Networks

Персональная landing page-презентация frontend/full-stack разработчика Arthur Dadalian. Проект подготовлен как тестовое задание: есть адаптивный React-интерфейс, Express API, рабочий feedback flow, отправка писем через Resend, AI helper и конфигурация для деплоя на Vercel.

## Стек

- Frontend: React, TypeScript, Vite, SCSS, Lucide React
- Backend: Node.js, Express, TypeScript
- API: `POST /api/contact`, `POST /api/ai-summary`, `GET /api/health`
- Валидация: Zod на backend и клиентская проверка на frontend
- Email: Resend
- AI: OpenAI SDK при наличии `OPENAI_API_KEY`, безопасный fallback без ключа
- Проверки: TypeScript, ESLint, Vitest, Supertest, production build

## Структура проекта

```text
project/
  api/
    index.ts              # Vercel serverless bridge to Express app
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

## Запуск локально

Одновременно frontend и backend:

```bash
npm run dev
```

Отдельно:

```bash
npm run dev:frontend
npm run dev:backend
```

По умолчанию:

- Frontend: `http://localhost:5173`
- Backend: `http://localhost:5000`

Vite проксирует `/api` на backend, поэтому frontend может работать с относительными API-путями.

## Переменные окружения

Backend: скопируйте `backend/.env.example` в `backend/.env` или используйте `.env` в корне.

```env
RESEND_API_KEY=
RESEND_FROM_EMAIL=onboarding@resend.dev
OWNER_EMAIL=darb4293@gmail.com
CLIENT_URL=http://localhost:5173
PORT=5000
OPENAI_API_KEY=
OPENAI_MODEL=gpt-5.4-mini
```

Frontend: скопируйте `frontend/.env.example` в `frontend/.env`.

```env
VITE_API_URL=
```

Если `VITE_API_URL` пустой, frontend отправляет запросы на тот же домен (`/api/...`). Для локального запуска это работает через Vite proxy, для Vercel - через serverless API.

Реальные `.env` файлы и секреты не должны попадать в git.

## Как работает feedback form

Форма содержит поля `name`, `phone`, `email`, `comment`.

Поток:

1. Frontend проверяет обязательные поля, формат email, телефон и длину комментария.
2. При отправке показывает loading state и вызывает `POST /api/contact`.
3. Backend повторно валидирует body через Zod.
4. Resend отправляет письмо владельцу сайта на `OWNER_EMAIL`.
5. Resend отправляет copy email пользователю на email, который он указал в форме.
6. API возвращает понятный JSON.
7. Frontend показывает success или user-friendly error и очищает форму после успеха.

Если `RESEND_API_KEY` не настроен, API возвращает `503` с безопасным сообщением и не раскрывает секреты.

## Как работает AI helper

Блок AI Summary Helper отправляет текст в `POST /api/ai-summary`.

Если `OPENAI_API_KEY` задан:

- backend использует официальный OpenAI SDK;
- вызывается Responses API;
- модель берется из `OPENAI_MODEL` или `gpt-5.4-mini`.

Если ключа нет:

- endpoint не падает;
- возвращается fallback summary;
- frontend показывает нормальный success flow.

## AI tools usage

Во время разработки AI использовался для:

- ускорения проектирования структуры frontend/backend;
- генерации черновиков компонентов и API-сервисов;
- подготовки hero-изображения для первого экрана;
- улучшения README и deployment notes;
- поиска потенциальных ошибок в form/API flow.

Что было сгенерировано с AI:

- базовая структура монорепозитория;
- React-компоненты landing page;
- Express route/service слой;
- SCSS-анимации и responsive layout;
- hero asset `frontend/public/hero-workspace.png`;
- черновик документации.

Что проверено и исправлено вручную:

- TypeScript ошибки;
- build ошибки;
- корректность API путей;
- frontend/backend env usage;
- обработка Resend ошибок;
- fallback для AI без ключа;
- client и server validation;
- доступность labels, aria-атрибутов и disabled/loading states;
- Vercel deployment strategy.

## Проверки качества

```bash
npm run type-check
npm run lint
npm test
npm run build
```

Или все вместе:

```bash
npm run check
```

## Деплой на Vercel

Проект подготовлен для Vercel:

- `frontend/dist` используется как output directory;
- `/api/*` переписывается на Express app через `api/index.ts`;
- frontend использует относительные API-пути;
- `vercel.json` находится в корне.

Для production нужно добавить env variables в Vercel:

```env
RESEND_API_KEY=
RESEND_FROM_EMAIL=onboarding@resend.dev
OWNER_EMAIL=darb4293@gmail.com
CLIENT_URL=https://your-vercel-domain.vercel.app
OPENAI_API_KEY=
OPENAI_MODEL=gpt-5.4-mini
```

`OPENAI_API_KEY` необязателен. `RESEND_API_KEY` нужен для реальной отправки feedback emails. Для production лучше заменить `RESEND_FROM_EMAIL` на адрес подтвержденного домена в Resend.

## Links

- GitHub: https://github.com/witharthur/laboratory_networks
- Vercel: https://laboratorynetworks.vercel.app
