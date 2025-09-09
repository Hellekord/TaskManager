# Task Manager

Тестове завдання - менеджер завдань з Web API та React frontend.

## 📋 Функционал

- ✅ Додавання, редагування та видалення завдань
- ✅ Позначення завдань як виконаних
- ✅ Фільтрація (Усі / Активні / Завершені)
- ✅ Валідація форм
- ✅ Swagger документація для API
- ✅ Сучасний UI з Material Design

## 🛠 Технології

### Backend
- .NET 8.0
- ASP.NET Core Web API
- Entity Framework Core 8.0
- SQLite Database
- Swagger/OpenAPI

### Frontend
- React 18
- Material-UI (MUI)
- Axios для HTTP запросов
- Vite для сборки
- JavaScript ES6+

## 📁 Структура проекту

```
TaskManager/
├── TaskManagerAPI/          # Backend (.NET 8)
│   ├── Controllers/         # API контролери
│   ├── Data/               # DbContext
│   ├── DTOs/               # Data Transfer Objects
│   ├── Models/             # Моделі даних
│   ├── Program.cs          # Точка входу API
│   └── appsettings.json    # Конфігурація
│
├── TaskManagerClient/       # Frontend (React)
│   ├── src/
│   │   ├── components/     # React компоненти
│   │   ├── services/       # API сервіси
│   │   └── App.jsx         # Головний компонент
│   ├── package.json        # Залежності npm
│   └── vite.config.js      # Конфігурація Vite
│
├── .gitignore              # Ігноровані файли
├── README.md               # Документація
```

## 🚀 Запуск проекту

### Попередні вимоги

- [.NET 8 SDK](https://dotnet.microsoft.com/download/dotnet/8.0)
- [Node.js 18+](https://nodejs.org/)
- [Git](https://git-scm.com/)

### Ручний запуск

#### 1. Backend (API)

Відкрийте перший термінал і виконайте:

```bash
# Перейдіть до папки backend
cd TaskManagerAPI

# Відновіть залежності
dotnet restore

# Запустіть API
dotnet run
```

API буде доступний за адресами:
- Swagger UI: https://localhost:7228/swagger або http://localhost:5172/swagger
- API Base URL: https://localhost:7228/api або http://localhost:5172/api

#### 2. Frontend (React)

Відкрийте другий термінал і виконайте:

```bash
# Перейдіть до папки frontend
cd TaskManagerClient

# Встановіть залежності (тільки при першому запуску)
npm install

# Запустіть додаток
npm run dev
```

Додаток буде доступний за адресою: http://localhost:5173

### Альтернативний запуск через Visual Studio

1. Відкрийте `TaskManagerAPI.sln` у Visual Studio
2. Натисніть F5 для запуску API
3. В окремому терміналі запустіть frontend командами вище

## 📝 API Endpoints

| Метод | Endpoint | Опис     |
|-------|----------|----------|
| GET | /api/tasks | Отримати всі завдання (з фільтрацією) |
| GET | /api/tasks/{id} | Отримати завдання за ID |
| POST | /api/tasks | Створити нове завдання |
| PUT | /api/tasks/{id} | Оновити завдання |
| DELETE | /api/tasks/{id} | Видалити завдання |

### Параметри фільтрації

- `?status=all` - всі завдання (за замовчуванням)
- `?status=active` - тільки активні
- `?status=completed` - тільки виконані

### Приклад запиту

```json
POST /api/tasks
{
  «title»: «Назва завдання»,
  «description»: «Опис завдання»
}
```

## 🗄 База даних

Проект використовує SQLite. База даних (`TaskManager.db`) створюється автоматично при першому запуску в папці `TaskManagerAPI`.

Для перегляду даних можна використовувати:
- [DB Browser for SQLite](https://sqlitebrowser.org/)
- Розширення SQLite Viewer у VS Code

## 🧪 Тестування

1. Запустіть обидві програми
2. Відкрийте http://localhost:5173 для UI
3. Або використовуйте Swagger UI для тестування API: https://localhost:7228/swagger

## ⚙️ Конфігурація

### Зміна портів API

У файлі `TaskManagerAPI/Properties/launchSettings.json` можна змінити порти.

### Налаштування CORS

CORS налаштований у `Program.cs` для дозволу запитів з будь-яких джерел (для розробки).

### Підключення Frontend до API

Якщо API запущений на іншому порту, змініть URL у файлі `TaskManagerClient/src/services/api.js`:

```javascript
const API_URL = “http://localhost:5172/api”; // Змініть порт за необхідності
```

## 📦 Збірка для продакшену

### Backend
```bash
cd TaskManagerAPI
dotnet publish -c Release -o ./publish
```

### Frontend
```bash
cd TaskManagerClient
npm run build
```

Зібрані файли будуть у папці `dist/`.

## 🐛 Можливі проблеми

### Помилка CORS
Переконайтеся, що в `Program.cs` налаштовано CORS і API запущено.

### Помилка підключення до API
Перевірте, що:
1. API запущено і доступно
2. Порт в `api.js` відповідає порту API
3. Немає блокування firewall

### Помилка сертифіката HTTPS
При першому запуску прийміть самопідписаний сертифікат або використовуйте HTTP.

## 👨‍💻 Автор

[Свергун Марк Миколайович]

## 📄 Ліцензія

Тестове завдання