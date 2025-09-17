# 🚀 Настройка Railway для JAB PocketBase

## 📋 Анализ ошибки

В логе видна ошибка `EACCES: permission denied` при попытке установить Railway CLI глобально. Это стандартная проблема с правами доступа в Linux.

## ✅ Решение

Railway CLI успешно установлен локально в проект и работает через `npx railway`.

## 🔧 Следующие шаги для настройки Railway

### 1. Вход в Railway

Поскольку мы не можем войти в Railway в неинтерактивном режиме, выполните следующие команды вручную:

```bash
# Войдите в Railway (откроется браузер для авторизации)
npx railway login

# Проверьте статус авторизации
npx railway whoami
```

### 2. Создание проекта

```bash
# Создайте новый проект Railway
npx railway init

# Выберите опции:
# - Project name: jab-pocketbase
# - Environment: Production
# - Region: выбирайте ближайший к вашим пользователям
```

### 3. Подключение GitHub репозитория

В панели Railway:

1. Перейдите в ваш проект `jab-pocketbase`
2. Нажмите **"Settings"** → **"Source"**
3. Выберите **"Connect GitHub Repository"**
4. Выберите репозиторий: `nvgrigoryev24/jab-pocketbase`
5. Выберите ветку: `main`

### 4. Настройка переменных окружения

В панели Railway перейдите в **"Variables"** и добавьте:

```
PORT=8090
PB_DATA_DIR=/pocketbase/pb_data
PB_LOG_LEVEL=info
PB_ENCRYPTION_KEY=your-secure-encryption-key-here
PB_ADMIN_EMAIL=admin@jab-martial-arts.com
PB_ADMIN_PASSWORD=your-secure-password-here
```

### 5. Настройка домена (опционально)

1. В панели Railway перейдите в **"Settings"** → **"Domains"**
2. Добавьте кастомный домен (например: `api.jab-martial-arts.com`)
3. Настройте DNS записи согласно инструкциям Railway

### 6. Настройка GitHub Secrets

Для автоматического деплоя через GitHub Actions:

1. Перейдите в GitHub репозиторий: https://github.com/nvgrigoryev24/jab-pocketbase
2. Нажмите **"Settings"** → **"Secrets and variables"** → **"Actions"**
3. Добавьте секреты:
   - `RAILWAY_TOKEN` - токен из Railway (Settings → Tokens)
   - `RAILWAY_URL` - URL вашего Railway приложения

## 🚀 Деплой

### Автоматический деплой

После настройки GitHub Actions, деплой будет происходить автоматически при каждом push в main ветку.

### Ручной деплой

```bash
# Деплой текущего кода
npx railway up

# Проверка статуса
npx railway status

# Просмотр логов
npx railway logs
```

## 🔍 Проверка работоспособности

После деплоя проверьте:

```bash
# Health check
curl https://your-app.railway.app/api/health

# Доступ к админке
open https://your-app.railway.app/_/
```

## 📊 Мониторинг

В панели Railway вы можете:

- Просматривать логи в реальном времени
- Мониторить использование ресурсов
- Настраивать алерты
- Управлять переменными окружения

## 🔒 Безопасность

### Рекомендации:

1. **Используйте сильные пароли** для админки PocketBase
2. **Настройте CORS** правильно для вашего фронтенда
3. **Регулярно создавайте бэкапы** базы данных
4. **Мониторьте логи** на предмет подозрительной активности

### Настройка CORS:

Добавьте в переменные окружения Railway:

```
PB_CORS_ORIGINS=https://your-frontend-domain.com,https://www.your-frontend-domain.com
```

## 🆘 Troubleshooting

### Частые проблемы:

1. **Ошибка деплоя:**
   - Проверьте логи в Railway
   - Убедитесь в корректности Dockerfile
   - Проверьте переменные окружения

2. **Проблемы с базой данных:**
   - Убедитесь, что `PB_DATA_DIR` настроен правильно
   - Проверьте права доступа к файлам

3. **Проблемы с портами:**
   - Railway автоматически назначает порт через переменную `PORT`
   - Убедитесь, что PocketBase слушает на `0.0.0.0:$PORT`

## 📞 Поддержка

- **Railway Documentation:** https://docs.railway.app/
- **PocketBase Documentation:** https://pocketbase.io/docs/
- **GitHub Issues:** https://github.com/nvgrigoryev24/jab-pocketbase/issues

## 🎯 Следующие шаги

1. Выполните вход в Railway: `npx railway login`
2. Создайте проект: `npx railway init`
3. Подключите GitHub репозиторий в панели Railway
4. Настройте переменные окружения
5. Протестируйте деплой

**Проект готов к деплою на Railway!** 🚀
