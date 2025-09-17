# ⚡ Быстрая настройка интеграции фронтенда с PocketBase

## 🎯 Краткое руководство

После деплоя обоих проектов на Railway выполните следующие шаги:

### 1. Получите URL ваших приложений

```bash
# В папке PocketBase проекта
npx railway status

# В папке Frontend проекта  
npx railway status
```

### 2. Настройте переменные окружения

#### В Railway панели PocketBase проекта:
```
PB_CORS_ORIGINS=https://your-frontend-app.railway.app,https://www.your-frontend-app.railway.app
```

#### В Railway панели Frontend проекта:
```
NEXT_PUBLIC_POCKETBASE_URL=https://your-pocketbase-app.railway.app
```

### 3. Пересоберите фронтенд

```bash
# В папке фронтенда
git add .
git commit -m "Update PocketBase URL for production"
git push origin main
```

### 4. Проверьте интеграцию

```bash
# Health check
curl https://your-pocketbase-app.railway.app/api/health

# Проверьте в браузере консоль фронтенда
```

## 🚀 Автоматическая настройка

Запустите скрипт для автоматической настройки:

```bash
./setup-integration.sh
```

## 📋 Чек-лист

- [ ] URL PocketBase получен
- [ ] URL Frontend получен  
- [ ] PB_CORS_ORIGINS настроен в PocketBase
- [ ] NEXT_PUBLIC_POCKETBASE_URL настроен во фронтенде
- [ ] Фронтенд пересобран
- [ ] Интеграция протестирована

## 🔗 Ссылки

- **Подробное руководство:** [FRONTEND_INTEGRATION.md](./FRONTEND_INTEGRATION.md)
- **Автоматический скрипт:** `./setup-integration.sh`
- **PocketBase Admin:** `https://your-pocketbase-app.railway.app/_/`

**Готово!** 🎉
