#!/bin/bash

# 🔐 Скрипт для восстановления пароля Superuser PocketBase

echo "🔐 Восстановление пароля Superuser PocketBase"
echo "============================================="

# Цвета для вывода
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

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

# Проверка наличия PocketBase
if [ ! -f "./pocketbase" ]; then
    print_error "PocketBase бинарник не найден в текущей директории"
    exit 1
fi

print_success "PocketBase найден"

# Меню выбора действия
echo ""
echo "Выберите действие:"
echo "1) Создать нового superuser"
echo "2) Изменить пароль существующего superuser"
echo "3) Создать OTP для входа"
echo "4) Показать существующих superuser"
echo "5) Сбросить базу данных (ОСТОРОЖНО!)"
echo ""

read -p "Введите номер (1-5): " choice

case $choice in
    1)
        echo ""
        print_status "Создание нового superuser"
        read -p "Введите email: " email
        read -s -p "Введите пароль: " password
        echo ""
        
        if [ -z "$email" ] || [ -z "$password" ]; then
            print_error "Email и пароль не могут быть пустыми"
            exit 1
        fi
        
        print_status "Создание superuser..."
        ./pocketbase superuser create "$email" "$password"
        
        if [ $? -eq 0 ]; then
            print_success "Superuser создан успешно!"
            echo "Email: $email"
            echo "Пароль: [скрыт]"
        else
            print_error "Ошибка при создании superuser"
        fi
        ;;
        
    2)
        echo ""
        print_status "Изменение пароля superuser"
        read -p "Введите email: " email
        read -s -p "Введите новый пароль: " password
        echo ""
        
        if [ -z "$email" ] || [ -z "$password" ]; then
            print_error "Email и пароль не могут быть пустыми"
            exit 1
        fi
        
        print_status "Изменение пароля..."
        ./pocketbase superuser update "$email" "$password"
        
        if [ $? -eq 0 ]; then
            print_success "Пароль изменен успешно!"
        else
            print_error "Ошибка при изменении пароля"
        fi
        ;;
        
    3)
        echo ""
        print_status "Создание OTP для входа"
        read -p "Введите email: " email
        
        if [ -z "$email" ]; then
            print_error "Email не может быть пустым"
            exit 1
        fi
        
        print_status "Создание OTP..."
        ./pocketbase superuser otp "$email"
        
        if [ $? -eq 0 ]; then
            print_success "OTP создан успешно!"
            print_warning "Проверьте email для получения кода"
        else
            print_error "Ошибка при создании OTP"
        fi
        ;;
        
    4)
        echo ""
        print_status "Показ существующих superuser"
        ./pocketbase superuser list
        ;;
        
    5)
        echo ""
        print_warning "⚠️  ВНИМАНИЕ: Это удалит ВСЕ данные!"
        read -p "Вы уверены? (yes/no): " confirm
        
        if [ "$confirm" = "yes" ]; then
            print_status "Создание бэкапа..."
            cp -r pb_data pb_data_backup_$(date +%Y%m%d_%H%M%S)
            
            print_status "Удаление базы данных..."
            rm -f pb_data/data.db pb_data/auxiliary.db
            
            print_success "База данных сброшена!"
            print_warning "Запустите PocketBase и создайте нового администратора"
        else
            print_status "Операция отменена"
        fi
        ;;
        
    *)
        print_error "Неверный выбор"
        exit 1
        ;;
esac

echo ""
echo "============================================="
print_success "Операция завершена!"
echo ""
echo "📋 Следующие шаги:"
echo "1. Запустите PocketBase: ./pocketbase serve"
echo "2. Откройте админку: http://localhost:8090/_/"
echo "3. Войдите с новыми данными"
echo ""
echo "📖 Подробная документация: PASSWORD_RECOVERY.md"
echo ""
