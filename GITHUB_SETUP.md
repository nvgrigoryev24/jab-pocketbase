# 📋 Инструкции по переносу проекта на GitHub

## 🎯 Готовность проекта к деплою

### ✅ Что готово

1. **Docker конфигурация:**
   - `Dockerfile.pocketbase` - оптимизирован для Railway
   - `docker-compose.yml` - для локальной разработки
   - Поддержка переменной `PORT` для Railway

2. **Railway конфигурация:**
   - `railway.json` - настройки для автоматического деплоя
   - Health checks настроены
   - Restart policy настроен

3. **Переменные окружения:**
   - `.env.example` - шаблон переменных
   - Все необходимые настройки документированы

4. **CI/CD:**
   - GitHub Actions workflows
   - Автоматический деплой на Railway
   - Docker build и тестирование

5. **Документация:**
   - `README.md` - обновлен с инструкциями по деплою
   - `DEPLOYMENT.md` - подробное руководство
   - `GITHUB_SETUP.md` - этот файл

## 🚀 Шаги для переноса на GitHub

### 1. Создание репозитория на GitHub

```bash
# Войдите в GitHub и создайте новый репозиторий:
# Название: jab-pocketbase
# Описание: PocketBase backend for JAB Martial Arts
# Приватный/Публичный: по вашему выбору
# НЕ добавляйте README, .gitignore, лицензию (они уже есть)
```

### 2. Инициализация Git (если еще не сделано)

```bash
cd /home/fomakiniaev/projects/jab-pocketbase

# Проверьте статус Git
git status

# Если репозиторий не инициализирован:
git init
git add .
git commit -m "Initial commit: PocketBase backend ready for deployment"
```

### 3. Подключение к GitHub

```bash
# Добавьте remote origin (замените YOUR_USERNAME на ваш GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/jab-pocketbase.git

# Проверьте подключение
git remote -v

# Отправьте код на GitHub
git branch -M main
git push -u origin main
```

### 4. Настройка Railway

1. **Установите Railway CLI:**
   ```bash
   npm install -g @railway/cli
   ```

2. **Войдите в Railway:**
   ```bash
   railway login
   ```

3. **Создайте проект:**
   ```bash
   railway init
   ```

4. **Подключите GitHub репозиторий:**
   - В панели Railway выберите "Deploy from GitHub repo"
   - Выберите ваш репозиторий `jab-pocketbase`
   - Railway автоматически настроит деплой

### 5. Настройка переменных окружения в Railway

В панели Railway перейдите в Settings → Variables и добавьте:

```
PORT=8090
PB_DATA_DIR=/pocketbase/pb_data
PB_LOG_LEVEL=info
```

### 6. Настройка GitHub Secrets (для CI/CD)

В настройках GitHub репозитория добавьте секреты:

1. Перейдите в Settings → Secrets and variables → Actions
2. Добавьте:
   - `RAILWAY_TOKEN` - токен из Railway
   - `RAILWAY_URL` - URL вашего Railway приложения

## 🔧 Дополнительные настройки

### Настройка домена (опционально)

1. В Railway добавьте кастомный домен
2. Обновите CORS настройки в PocketBase
3. Обновите переменную `PB_CORS_ORIGINS`

### Мониторинг

1. Настройте алерты в Railway
2. Добавьте мониторинг логов
3. Настройте бэкапы базы данных

## 📊 Структура файлов для GitHub

```
jab-pocketbase/
├── .github/
│   └── workflows/
│       ├── deploy.yml          # Деплой на Railway
│       └── docker-build.yml    # Сборка Docker образа
├── .env.example                # Шаблон переменных
├── .gitignore                  # Исключения для Git
├── DEPLOYMENT.md              # Руководство по деплою
├── Dockerfile.pocketbase      # Docker образ
├── GITHUB_SETUP.md           # Этот файл
├── README.md                 # Основная документация
├── docker-compose.yml        # Docker Compose
├── railway.json             # Конфигурация Railway
├── pocketbase              # PocketBase бинарник
├── pb_data/               # Данные (НЕ коммитится)
└── pb_migrations/         # Миграции БД
```

## ⚠️ Важные замечания

1. **Данные НЕ коммитятся:**
   - Папка `pb_data/` исключена из Git
   - Данные будут созданы при первом запуске

2. **Безопасность:**
   - Не коммитьте реальные пароли
   - Используйте переменные окружения
   - Настройте сильные пароли для production

3. **Бэкапы:**
   - Регулярно создавайте бэкапы базы данных
   - Храните бэкапы в безопасном месте

## 🚀 После деплоя

1. **Проверьте работоспособность:**
   ```bash
   curl https://your-app.railway.app/api/health
   ```

2. **Настройте админку:**
   - Перейдите на `https://your-app.railway.app/_/`
   - Создайте администратора
   - Настройте коллекции

3. **Обновите фронтенд:**
   - Измените `NEXT_PUBLIC_POCKETBASE_URL` на ваш Railway URL
   - Протестируйте интеграцию

## 📞 Поддержка

При возникновении проблем:

1. Проверьте логи в Railway
2. Убедитесь в корректности переменных окружения
3. Проверьте GitHub Actions логи
4. Обратитесь к документации Railway и PocketBase

## 🔗 Полезные ссылки

- [Railway Documentation](https://docs.railway.app/)
- [PocketBase Documentation](https://pocketbase.io/docs/)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Docker Documentation](https://docs.docker.com/)
