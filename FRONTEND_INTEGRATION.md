# 🔗 Интеграция фронтенда с PocketBase на Railway

## 📋 Обзор

После деплоя обоих проектов на Railway нужно настроить их взаимодействие:
- **PocketBase Backend:** `https://your-pocketbase-app.railway.app`
- **Frontend:** `https://your-frontend-app.railway.app`

## 🔧 Настройка переменных окружения

### 1. В Railway панели Frontend проекта

Добавьте переменную окружения:

```
NEXT_PUBLIC_POCKETBASE_URL=https://your-pocketbase-app.railway.app
```

**Важно:** Замените `your-pocketbase-app` на реальный URL вашего PocketBase приложения.

### 2. Получение URL PocketBase

```bash
# Получите URL вашего PocketBase приложения
npx railway status

# Или в панели Railway:
# Settings → Domains → Production URL
```

## 🔒 Настройка CORS в PocketBase

### 1. В Railway панели PocketBase проекта

Добавьте переменную окружения:

```
PB_CORS_ORIGINS=https://your-frontend-app.railway.app,https://www.your-frontend-app.railway.app
```

**Важно:** Замените `your-frontend-app` на реальный URL вашего фронтенда.

### 2. Альтернативный способ через PocketBase Admin

1. Откройте админку PocketBase: `https://your-pocketbase-app.railway.app/_/`
2. Перейдите в **Settings** → **API Settings**
3. В поле **CORS Origins** добавьте:
   ```
   https://your-frontend-app.railway.app
   https://www.your-frontend-app.railway.app
   ```

## 🚀 Обновление фронтенда

### 1. Обновите конфигурацию PocketBase

В вашем фронтенде найдите файл с конфигурацией PocketBase (обычно `lib/pocketbase.ts` или `utils/pocketbase.ts`):

```typescript
import PocketBase from 'pocketbase';

const pb = new PocketBase(process.env.NEXT_PUBLIC_POCKETBASE_URL || 'http://localhost:8090');

export default pb;
```

### 2. Обновите переменные окружения

В файле `.env.local` или `.env.production`:

```env
NEXT_PUBLIC_POCKETBASE_URL=https://your-pocketbase-app.railway.app
```

### 3. Пересоберите фронтенд

```bash
# В папке фронтенда
npm run build
git add .
git commit -m "Update PocketBase URL for production"
git push origin main
```

## 🔍 Проверка интеграции

### 1. Проверьте API доступность

```bash
# Health check PocketBase
curl https://your-pocketbase-app.railway.app/api/health

# Проверьте коллекции
curl https://your-pocketbase-app.railway.app/api/collections
```

### 2. Проверьте CORS

Откройте браузер и проверьте в консоли разработчика:

```javascript
// В консоли браузера на фронтенде
fetch('https://your-pocketbase-app.railway.app/api/collections')
  .then(response => response.json())
  .then(data => console.log('PocketBase доступен:', data))
  .catch(error => console.error('Ошибка CORS:', error));
```

### 3. Проверьте аутентификацию

```javascript
// Тест аутентификации
import PocketBase from 'pocketbase';

const pb = new PocketBase('https://your-pocketbase-app.railway.app');

// Проверьте доступность
pb.collections.list().then(collections => {
  console.log('Коллекции доступны:', collections);
});
```

## 🛠️ Настройка доменов (опционально)

### 1. Настройка кастомных доменов

Если у вас есть собственные домены:

**PocketBase:**
```
api.yourdomain.com → https://your-pocketbase-app.railway.app
```

**Frontend:**
```
yourdomain.com → https://your-frontend-app.railway.app
```

### 2. Обновление переменных окружения

После настройки доменов обновите:

**Frontend:**
```
NEXT_PUBLIC_POCKETBASE_URL=https://api.yourdomain.com
```

**PocketBase:**
```
PB_CORS_ORIGINS=https://yourdomain.com,https://www.yourdomain.com
```

## 🔐 Настройка аутентификации

### 1. Создание администратора

1. Откройте админку PocketBase: `https://your-pocketbase-app.railway.app/_/`
2. Создайте администратора
3. Настройте коллекции и правила доступа

### 2. Настройка правил доступа

В PocketBase Admin → Collections → [Collection Name] → Settings:

```javascript
// Пример правила для публичного чтения
@request.auth.id != "" || @request.method = "GET"

// Пример правила для авторизованных пользователей
@request.auth.id != ""
```

## 📊 Мониторинг

### 1. Логи Railway

```bash
# Логи PocketBase
npx railway logs --service pocketbase

# Логи Frontend
npx railway logs --service frontend
```

### 2. Метрики

В панели Railway отслеживайте:
- CPU и Memory usage
- Network traffic
- Response times
- Error rates

## 🚨 Troubleshooting

### Частые проблемы:

1. **CORS ошибки:**
   ```
   Access to fetch at 'https://...' from origin 'https://...' has been blocked by CORS policy
   ```
   **Решение:** Проверьте `PB_CORS_ORIGINS` в PocketBase

2. **404 ошибки:**
   ```
   GET https://your-pocketbase-app.railway.app/api/collections 404
   ```
   **Решение:** Проверьте URL PocketBase

3. **Timeout ошибки:**
   ```
   Request timeout
   ```
   **Решение:** Проверьте Railway статус и логи

### Отладка:

```bash
# Проверьте статус обоих сервисов
npx railway status

# Проверьте переменные окружения
npx railway variables

# Проверьте логи
npx railway logs --tail
```

## 📋 Чек-лист интеграции

- [ ] PocketBase URL получен и проверен
- [ ] Frontend переменная `NEXT_PUBLIC_POCKETBASE_URL` обновлена
- [ ] PocketBase переменная `PB_CORS_ORIGINS` настроена
- [ ] Фронтенд пересобран и задеплоен
- [ ] API доступность проверена
- [ ] CORS настройки проверены
- [ ] Аутентификация работает
- [ ] Домены настроены (если нужно)
- [ ] Мониторинг настроен

## 🔗 Полезные ссылки

- **Railway Documentation:** https://docs.railway.app/
- **PocketBase Documentation:** https://pocketbase.io/docs/
- **Next.js Environment Variables:** https://nextjs.org/docs/basic-features/environment-variables
- **CORS Configuration:** https://pocketbase.io/docs/api-settings/

## 📞 Поддержка

При возникновении проблем:

1. Проверьте логи в Railway
2. Убедитесь в корректности URL
3. Проверьте CORS настройки
4. Обратитесь к документации PocketBase
5. Создайте issue в репозитории

**Интеграция готова!** 🚀
