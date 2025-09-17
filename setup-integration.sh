#!/bin/bash

# 🚀 Скрипт для настройки интеграции фронтенда с PocketBase на Railway

echo "🔗 Настройка интеграции фронтенда с PocketBase на Railway"
echo "=================================================="

# Цвета для вывода
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Функция для вывода цветного текста
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Проверка наличия Railway CLI
if ! command -v npx &> /dev/null; then
    print_error "npx не найден. Установите Node.js и npm."
    exit 1
fi

if ! npx railway --version &> /dev/null; then
    print_error "Railway CLI не найден. Установите: npm install @railway/cli"
    exit 1
fi

print_success "Railway CLI найден"

# Получение информации о проектах
print_status "Получение информации о Railway проектах..."

# Получение URL PocketBase
POCKETBASE_URL=$(npx railway status 2>/dev/null | grep -o 'https://[^[:space:]]*' | head -1)

if [ -z "$POCKETBASE_URL" ]; then
    print_warning "Не удалось автоматически получить URL PocketBase"
    echo "Введите URL вашего PocketBase приложения:"
    read -p "URL: " POCKETBASE_URL
fi

print_success "PocketBase URL: $POCKETBASE_URL"

# Проверка доступности PocketBase
print_status "Проверка доступности PocketBase..."
if curl -s "$POCKETBASE_URL/api/health" > /dev/null; then
    print_success "PocketBase доступен"
else
    print_warning "PocketBase недоступен. Проверьте URL и статус сервиса."
fi

# Получение URL фронтенда
echo ""
echo "Введите URL вашего фронтенда:"
read -p "Frontend URL: " FRONTEND_URL

if [ -z "$FRONTEND_URL" ]; then
    print_error "URL фронтенда не может быть пустым"
    exit 1
fi

print_success "Frontend URL: $FRONTEND_URL"

# Настройка переменных окружения
echo ""
print_status "Настройка переменных окружения..."

# CORS для PocketBase
print_status "Настройка CORS в PocketBase..."
echo "Добавьте в Railway панели PocketBase проекта переменную:"
echo "PB_CORS_ORIGINS=$FRONTEND_URL,https://www.$(echo $FRONTEND_URL | sed 's|https://||')"

# Frontend переменная
echo ""
print_status "Настройка переменной во фронтенде..."
echo "Добавьте в Railway панели Frontend проекта переменную:"
echo "NEXT_PUBLIC_POCKETBASE_URL=$POCKETBASE_URL"

# Создание файла с настройками
cat > integration-config.env << EOF
# Конфигурация интеграции фронтенда с PocketBase
# Скопируйте эти переменные в соответствующие Railway проекты

# PocketBase проект:
PB_CORS_ORIGINS=$FRONTEND_URL,https://www.$(echo $FRONTEND_URL | sed 's|https://||')

# Frontend проект:
NEXT_PUBLIC_POCKETBASE_URL=$POCKETBASE_URL
EOF

print_success "Конфигурация сохранена в integration-config.env"

# Проверка интеграции
echo ""
print_status "Проверка интеграции..."

# Проверка CORS
print_status "Проверка CORS..."
CORS_TEST=$(curl -s -H "Origin: $FRONTEND_URL" -H "Access-Control-Request-Method: GET" -H "Access-Control-Request-Headers: X-Requested-With" -X OPTIONS "$POCKETBASE_URL/api/collections" -w "%{http_code}" -o /dev/null)

if [ "$CORS_TEST" = "200" ] || [ "$CORS_TEST" = "204" ]; then
    print_success "CORS настроен корректно"
else
    print_warning "CORS может быть не настроен. Проверьте PB_CORS_ORIGINS"
fi

# Проверка API
print_status "Проверка API доступности..."
API_TEST=$(curl -s "$POCKETBASE_URL/api/collections" -w "%{http_code}" -o /dev/null)

if [ "$API_TEST" = "200" ]; then
    print_success "API PocketBase доступен"
else
    print_warning "API PocketBase недоступен. Проверьте статус сервиса."
fi

# Итоговые инструкции
echo ""
echo "=================================================="
print_success "Настройка интеграции завершена!"
echo "=================================================="
echo ""
echo "📋 Следующие шаги:"
echo ""
echo "1. Скопируйте переменные из файла integration-config.env"
echo "2. Добавьте их в соответствующие Railway проекты"
echo "3. Пересоберите фронтенд с новыми переменными"
echo "4. Проверьте работу интеграции"
echo ""
echo "🔗 Полезные ссылки:"
echo "- PocketBase Admin: $POCKETBASE_URL/_/"
echo "- Frontend: $FRONTEND_URL"
echo "- API Health: $POCKETBASE_URL/api/health"
echo ""
echo "📖 Подробная документация: FRONTEND_INTEGRATION.md"
echo ""

print_success "Готово! 🚀"
