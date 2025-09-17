# 🔧 Исправление ошибки "unknown port"

## ❌ Проблема

Ошибка `Error: listen tcp: lookup tcp/$PORT: unknown port` возникает когда:

1. Переменная `$PORT` не установлена или пустая
2. Docker не может правильно обработать переменную `$PORT` в команде CMD
3. Railway не передает переменную PORT корректно

## ✅ Решение

### 1. Обновлен Dockerfile

Создан скрипт запуска `start.sh` который:
- Устанавливает значение по умолчанию для PORT (8090)
- Выводит информацию о порте для отладки
- Запускает PocketBase с правильным портом

```dockerfile
# Создаем скрипт запуска для правильной обработки PORT
RUN echo '#!/bin/sh' > /pocketbase/start.sh && \
    echo 'PORT=${PORT:-8090}' >> /pocketbase/start.sh && \
    echo 'echo "Starting PocketBase on port $PORT"' >> /pocketbase/start.sh && \
    echo './pocketbase serve --http=0.0.0.0:$PORT' >> /pocketbase/start.sh && \
    chmod +x /pocketbase/start.sh

# Запускаем PocketBase через скрипт
CMD ["/pocketbase/start.sh"]
```

### 2. Обновлен railway.json

Убран `startCommand` из railway.json, так как команда запуска теперь определяется в Dockerfile.

### 3. Переменные окружения

Убедитесь, что в Railway установлена переменная:
```
PORT=8090
```

## 🚀 Тестирование

### Локальное тестирование

```bash
# Тест с переменной PORT
PORT=8090 docker run -p 8090:8090 jab-pocketbase

# Тест без переменной PORT (должен использовать 8090)
docker run -p 8090:8090 jab-pocketbase
```

### Railway тестирование

1. **Пересоберите образ:**
   ```bash
   npx railway up --detach
   ```

2. **Проверьте логи:**
   ```bash
   npx railway logs
   ```

3. **Проверьте health check:**
   ```bash
   curl https://your-app.railway.app/api/health
   ```

## 🔍 Отладка

### Проверка переменных окружения

В Railway панели убедитесь, что установлены:
```
PORT=8090
PB_DATA_DIR=/pocketbase/pb_data
```

### Логи для отладки

Скрипт `start.sh` выводит:
```
Starting PocketBase on port 8090
```

Это поможет понять, какой порт используется.

### Альтернативные решения

Если проблема persists, попробуйте:

1. **Явно указать порт в Railway:**
   ```
   PORT=8090
   ```

2. **Использовать фиксированный порт:**
   ```dockerfile
   CMD ["./pocketbase", "serve", "--http=0.0.0.0:8090"]
   ```

3. **Проверить Railway документацию:**
   - https://docs.railway.app/deploy/dockerfiles
   - https://docs.railway.app/reference/environment-variables

## 📋 Чек-лист

- [ ] Dockerfile обновлен с скриптом start.sh
- [ ] railway.json обновлен (убран startCommand)
- [ ] Переменная PORT установлена в Railway
- [ ] Образ пересобран и задеплоен
- [ ] Логи проверены на наличие "Starting PocketBase on port"
- [ ] Health check работает

## 🆘 Если проблема остается

1. **Проверьте Railway логи:**
   ```bash
   npx railway logs --tail
   ```

2. **Проверьте переменные окружения:**
   ```bash
   npx railway variables
   ```

3. **Попробуйте фиксированный порт:**
   Измените CMD в Dockerfile на:
   ```dockerfile
   CMD ["./pocketbase", "serve", "--http=0.0.0.0:8090"]
   ```

4. **Обратитесь к Railway поддержке:**
   - https://railway.app/discord
   - https://docs.railway.app/support
