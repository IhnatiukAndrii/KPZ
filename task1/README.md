# Завдання 1: Ланцюжок відповідальностей (Chain of Responsibility)

Цей проєкт демонструє використання патерну **Chain of Responsibility** для створення системи підтримки користувачів (меню оператора).
Запит передається по ланцюжку обробників, поки один із них не зможе його вирішити. Якщо жоден не вирішує — меню пропонує вибір знову.

## Як запустити
Для запуску скрипта та інтерактивного меню виконайте команду:
```bash
cd task1
npm start
```

## Приклад виконання
```text
> task1@1.0.0 start
> ts-node src/index.ts

--- Support Menu ---
1: General Information
2: Billing & Payments
3: Technical Support
4: Speak to an Operator

Please enter your choice (1-4):
```
*(очікування на ввід)*
