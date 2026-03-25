# Завдання 6: Легковаговик (Flyweight)

Цей проєкт демонструє використання патерну **Flyweight** на прикладі системи розмітки `LightHTML` з попереднього завдання.
Мета: значно скоротити обсяг використаної пам'яті під час генерації великого обсягу об'єктів (книги на 500 000 рядків).
Фабрика `LightElementNodeFactory` кешує та повертає загальний контекст HTML елементів (`tagName`, `displayType`, `closingType`, `cssClasses`), залишаючи індивідуальними лише дочірні елементи.

## Як запустити
Для запуску скрипта (з увімкненим збирачем сміття) перейдіть у каталог завдання та виконайте:
```bash
cd task6
npm start
```

## Приклад виконання
```text
> task6@1.0.0 start
> tsc && node --expose-gc dist/index.js

Generating book with 500,000 lines...
Loaded 500001 lines. Starting markup generation.

Memory used by tree BEFORE Flyweight: 161.37 MB
Memory used by tree AFTER Flyweight: 135.88 MB

Memory successfully reduced thanks to the Flyweight pattern!
```
