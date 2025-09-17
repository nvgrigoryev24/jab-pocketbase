# 🚀 Руководство по развертыванию JAB PocketBase

## 📋 Обзор

Этот документ содержит инструкции по развертыванию PocketBase бэкенда для проекта JAB Martial Arts на различных платформах.

## 🏗️ Структура проекта

```
jab-pocketbase/
├── Dockerfile.pocketbase    # Docker образ для PocketBase
├── docker-compose.yml       # Docker Compose конфигурация
├── railway.json            # Конфигурация для Railway
├── .env.example            # Пример переменных окружения
├── pocketbase              # PocketBase бинарник (Linux x86_64)
├── pb_data/               # Данные PocketBase (НЕ коммитится)
├── pb_migrations/         # Миграции базы данных
└── README.md              # Основная документация
```

## 🚀 Развертывание на Railway

### Подготовка

1. **Создайте аккаунт на Railway:**
   - Перейдите на [railway.app](https://railway.app)
   - Зарегистрируйтесь через GitHub

2. **Подготовьте репозиторий:**
   - Убедитесь, что все файлы закоммичены
   - Проверьте, что `pb_data/` исключен из git (через .gitignore)

### Деплой на Railway

1. **Создайте новый проект:**
   ```bash
   # Установите Railway CLI
   npm install -g @railway/cli
   
   # Войдите в аккаунт
   railway login
   
   # Создайте проект
   railway init
   ```

2. **Настройте переменные окружения:**
   - В панели Railway перейдите в Settings → Variables
   - Добавьте необходимые переменные из `.env.example`

3. **Деплой:**
   ```bash
   railway up
   ```

### Конфигурация Railway

Файл `railway.json` содержит:
- **Builder:** Dockerfile
- **Health Check:** `/api/health`
- **Restart Policy:** ON_FAILURE с максимум 10 попыток

## 🐳 Локальное развертывание (Docker)

### Development Mode

```bash
# Запуск с данными из локальной папки
docker-compose up --build

# Фоновый режим
docker-compose up -d

# Просмотр логов
docker-compose logs -f pocketbase
```

### Production Mode

```bash
# Сборка образа
docker build -f Dockerfile.pocketbase -t jab-pocketbase .

# Запуск контейнера
docker run -d \
  --name jab-pocketbase \
  -p 8090:8090 \
  -v pocketbase_data:/pocketbase/pb_data \
  -e PB_DATA_DIR=/pocketbase/pb_data \
  jab-pocketbase
```

## 🔧 Переменные окружения

### Обязательные переменные

- `PORT` - Порт для PocketBase (Railway автоматически устанавливает)
- `PB_DATA_DIR` - Путь к данным PocketBase

### Опциональные переменные

- `PB_ENCRYPTION_KEY` - Ключ шифрования
- `PB_ADMIN_EMAIL` - Email администратора
- `PB_ADMIN_PASSWORD` - Пароль администратора
- `PB_JWT_SECRET` - JWT секрет
- `PB_TOKEN_SECRET` - Токен секрет
- `PB_CORS_ORIGINS` - CORS origins
- `PB_LOG_LEVEL` - Уровень логирования

## 📊 Мониторинг и логи

### Railway

- Логи доступны в панели Railway
- Метрики в разделе Metrics
- Health checks автоматические

### Docker

```bash
# Просмотр логов
docker logs jab-pocketbase

# Мониторинг ресурсов
docker stats jab-pocketbase

# Проверка здоровья
curl http://localhost:8090/api/health
```

## 🔒 Безопасность

### Production рекомендации

1. **Используйте сильные пароли:**
   - Минимум 12 символов
   - Смесь букв, цифр и символов

2. **Настройте CORS:**
   - Укажите только необходимые домены
   - Не используйте `*` в production

3. **Регулярные бэкапы:**
   - Настройте автоматические бэкапы базы данных
   - Храните бэкапы в безопасном месте

4. **Мониторинг:**
   - Настройте алерты на критические ошибки
   - Отслеживайте использование ресурсов

## 🚨 Troubleshooting

### Частые проблемы

1. **Порт занят:**
   ```bash
   # Проверьте занятые порты
   lsof -i :8090
   
   # Остановите процесс
   kill -9 <PID>
   ```

2. **Проблемы с правами доступа:**
   ```bash
   # Исправьте права на файлы
   chmod +x pocketbase
   chown -R pocketbase:pocketbase pb_data/
   ```

3. **Ошибки базы данных:**
   ```bash
   # Проверьте целостность БД
   ./pocketbase migrate
   
   # Восстановите из бэкапа
   cp backup.db pb_data/data.db
   ```

### Логи ошибок

```bash
# Docker логи
docker-compose logs pocketbase

# Railway логи
railway logs

# Локальные логи
./pocketbase serve --http=127.0.0.1:8090
```

## 📈 Масштабирование

### Railway

- Автоматическое масштабирование
- Настройка в панели Railway
- Мониторинг использования ресурсов

### Docker

```bash
# Горизонтальное масштабирование
docker-compose up --scale pocketbase=3

# Load balancer (nginx)
# Настройте nginx для балансировки нагрузки
```

## 🔄 CI/CD

### GitHub Actions

Создайте `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Railway

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm install -g @railway/cli
      - run: railway up
        env:
          RAILWAY_TOKEN: ${{ secrets.RAILWAY_TOKEN }}
```

## 📞 Поддержка

При возникновении проблем:

1. Проверьте логи приложения
2. Убедитесь в корректности переменных окружения
3. Проверьте доступность портов
4. Обратитесь к документации PocketBase
5. Создайте issue в репозитории

## 🔗 Полезные ссылки

- [PocketBase Documentation](https://pocketbase.io/docs/)
- [Railway Documentation](https://docs.railway.app/)
- [Docker Documentation](https://docs.docker.com/)
- [JAB Martial Arts Frontend](https://github.com/your-username/jab-martial-arts)
