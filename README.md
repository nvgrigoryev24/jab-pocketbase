# JAB PocketBase Backend

**Версия:** 1.0.0  
**Статус:** ✅ Production Ready  
**Технология:** PocketBase (Go-based backend)

Отдельный репозиторий для бэкенда приложения JAB Martial Arts, основанного на PocketBase.

## 📁 Структура репозитория

```
jab-pocketbase/
├── Dockerfile.pocketbase    # Docker образ для PocketBase
├── docker-compose.yml       # Docker Compose конфигурация
├── pocketbase              # PocketBase бинарник
├── pb_data/               # Данные PocketBase (база данных)
├── pb_migrations/         # Миграции базы данных
└── README.md              # Этот файл
```

## 🚀 Быстрый старт

### Development Mode

1. **Запуск PocketBase:**
```bash
./pocketbase serve --http=127.0.0.1:8090
```

2. **Доступ к админке:**
- PocketBase Admin UI: [http://localhost:8090/_/](http://localhost:8090/_/)

### Production Mode (Docker)

1. **Сборка и запуск:**
```bash
docker-compose up --build
```

2. **Только запуск:**
```bash
docker-compose up
```

3. **Фоновый режим:**
```bash
docker-compose up -d
```

## 🌐 API Endpoints

- **API Base URL:** `http://localhost:8090/api/`
- **Admin UI:** `http://localhost:8090/_/`
- **Health Check:** `http://localhost:8090/api/health`

## 📊 Коллекции данных

PocketBase содержит следующие коллекции:

### Основные коллекции
- `coaches` - Тренеры школы
- `locations` - Локации тренировок
- `schedule` - Расписание тренировок
- `training_levels` - Уровни подготовки
- `pricing_plans` - Тарифные планы

### Контентные коллекции
- `hero_content` - Контент главной страницы
- `about_page` - Страница "О школе"
- `about_cards` - Карточки на странице "О школе"
- `news` - Новости школы
- `news_categories` - Категории новостей
- `news_authors` - Авторы новостей
- `news_reactions` - Реакции на новости

### UI коллекции
- `color_theme` - Цветовые схемы
- `header_content` - Контент шапки сайта
- `navigation_links` - Навигационные ссылки
- `social_links` - Социальные сети
- `footer_content` - Контент футера
- `footer_links` - Ссылки в футере
- `footer_contacts` - Контакты в футере

### Дополнительные коллекции
- `faq` - Часто задаваемые вопросы
- `faq_categories` - Категории FAQ
- `cta_banner` - Баннеры призыва к действию
- `promo_section` - Промо секции
- `hall_of_fame` - Зал славы
- `preloader_settings` - Настройки прелоадера

## 🔧 Конфигурация

### Переменные окружения
- `PB_DATA_DIR=/pocketbase/pb_data` - путь к данным PocketBase

### Порты
- **Основной порт:** 8090
- **API:** `http://localhost:8090/api/`
- **Admin:** `http://localhost:8090/_/`

## 📁 Данные

- **База данных:** `pb_data/data.db`
- **Файлы:** `pb_data/storage/`
- **Миграции:** `pb_migrations/`

## 🔒 Безопасность

⚠️ **ВАЖНО**: 
- Не удаляйте файлы из `pb_data/` без резервного копирования
- Регулярно создавайте бэкапы базы данных
- Используйте сильные пароли для админки

## 🔄 Интеграция с фронтендом

Этот PocketBase сервер предназначен для работы с фронтендом JAB Martial Arts:

- **Фронтенд репозиторий:** `jab-martial-arts`
- **API URL:** `http://localhost:8090`
- **Переменная окружения:** `NEXT_PUBLIC_POCKETBASE_URL=http://localhost:8090`

## 📝 Разработка

### Добавление новых коллекций
1. Создайте миграцию в `pb_migrations/`
2. Обновите TypeScript интерфейсы во фронтенде
3. Добавьте функции для работы с данными

### Обновление данных
1. Используйте админку PocketBase: `http://localhost:8090/_/`
2. Или используйте API для программного управления

## 🚀 Развертывание

### Локальная разработка
```bash
./pocketbase serve --http=127.0.0.1:8090
```

### Docker развертывание
```bash
docker-compose up --build -d
```

### Railway развертывание (Production)
1. **Установите Railway CLI:**
   ```bash
   npm install @railway/cli
   ```

2. **Войдите в аккаунт:**
   ```bash
   npx railway login
   ```

3. **Деплой:**
   ```bash
   npx railway up
   ```

4. **Настройте переменные окружения в панели Railway**

> **Примечание:** Railway CLI установлен локально в проект. Подробные инструкции см. в [RAILWAY_SETUP.md](./RAILWAY_SETUP.md)

### Подробное руководство
См. [DEPLOYMENT.md](./DEPLOYMENT.md) для детальных инструкций по развертыванию.

## 📞 Поддержка

При возникновении проблем:
1. Проверьте логи: `docker-compose logs pocketbase`
2. Убедитесь, что порт 8090 свободен
3. Проверьте права доступа к файлам PocketBase
