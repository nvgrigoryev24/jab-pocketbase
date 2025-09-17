# 🔐 Восстановление пароля Superuser PocketBase

## 📋 Способы восстановления пароля

### 1. 🔍 Проверка существующих администраторов

```bash
# Запустите PocketBase локально
./pocketbase serve --http=127.0.0.1:8090

# Откройте админку в браузере
# http://localhost:8090/_/
```

Если вы помните email, но не помните пароль, попробуйте стандартные пароли:
- `admin123`
- `password`
- `123456`
- `admin`

### 2. 🆕 Создание нового администратора

Если у вас есть доступ к серверу, создайте нового администратора:

```bash
# Остановите PocketBase
# Ctrl+C

# Создайте нового администратора
./pocketbase admin create admin@example.com your-new-password

# Запустите снова
./pocketbase serve --http=127.0.0.1:8090
```

### 3. 🔄 Сброс базы данных (ОСТОРОЖНО!)

⚠️ **ВНИМАНИЕ:** Это удалит ВСЕ данные!

```bash
# Создайте бэкап (если нужно)
cp -r pb_data pb_data_backup

# Удалите базу данных
rm pb_data/data.db pb_data/auxiliary.db

# Запустите PocketBase - он создаст новую базу
./pocketbase serve --http=127.0.0.1:8090

# Откройте http://localhost:8090/_/
# Создайте нового администратора
```

### 4. 🌐 Восстановление на Railway

#### Вариант A: Через Railway CLI

```bash
# Получите доступ к контейнеру Railway
npx railway shell

# В контейнере создайте нового администратора
./pocketbase admin create admin@example.com your-new-password

# Или сбросьте базу (ОСТОРОЖНО!)
rm pb_data/data.db pb_data/auxiliary.db
```

#### Вариант B: Через Railway панель

1. Откройте Railway панель
2. Перейдите в ваш PocketBase проект
3. Нажмите **"Deploy"** → **"Redeploy"**
4. Добавьте переменную окружения:
   ```
   PB_RESET_DB=true
   ```
5. После деплоя удалите эту переменную

### 5. 🔧 Прямое редактирование базы данных

Если у вас есть SQLite клиент:

```bash
# Установите sqlite3
sudo apt install sqlite3

# Откройте базу данных
sqlite3 pb_data/data.db

# Посмотрите таблицу администраторов
.tables
SELECT * FROM _admins;

# Обновите пароль (хеш)
UPDATE _admins SET password = 'new_password_hash' WHERE email = 'your-email@example.com';
```

## 🚀 Рекомендуемый подход

### Для локальной разработки:

1. **Попробуйте стандартные пароли** на `http://localhost:8090/_/`
2. **Если не помогло**, создайте нового администратора:
   ```bash
   ./pocketbase admin create admin@jab-martial-arts.com jab-admin-2024
   ```

### Для Railway (Production):

1. **Попробуйте войти** в админку Railway приложения
2. **Если не получается**, создайте нового администратора через Railway CLI:
   ```bash
   npx railway shell
   ./pocketbase admin create admin@jab-martial-arts.com jab-admin-2024
   ```

## 🔒 Безопасность

### После восстановления доступа:

1. **Смените пароль** на сильный
2. **Создайте резервную копию** базы данных
3. **Настройте двухфакторную аутентификацию** (если доступно)
4. **Регулярно создавайте бэкапы**

### Создание бэкапа:

```bash
# Создайте бэкап базы данных
cp pb_data/data.db pb_data_backup_$(date +%Y%m%d_%H%M%S).db

# Создайте бэкап всех данных
tar -czf pocketbase_backup_$(date +%Y%m%d_%H%M%S).tar.gz pb_data/
```

## 📋 Чек-лист восстановления

- [ ] Попробованы стандартные пароли
- [ ] Проверен доступ к локальному PocketBase
- [ ] Создан новый администратор (если нужно)
- [ ] Проверен доступ к Railway админке
- [ ] Создан бэкап базы данных
- [ ] Настроена безопасность

## 🆘 Если ничего не помогает

1. **Обратитесь к документации PocketBase:**
   - https://pocketbase.io/docs/admin-panel/
   - https://pocketbase.io/docs/cli/

2. **Создайте issue в репозитории:**
   - https://github.com/nvgrigoryev24/jab-pocketbase/issues

3. **Обратитесь к сообществу:**
   - PocketBase Discord
   - GitHub Discussions

## 🔗 Полезные команды

```bash
# Проверка версии PocketBase
./pocketbase version

# Список всех команд
./pocketbase --help

# Создание администратора
./pocketbase admin create email@example.com password

# Список администраторов
./pocketbase admin list

# Удаление администратора
./pocketbase admin delete email@example.com
```

**Удачи в восстановлении доступа!** 🔐
