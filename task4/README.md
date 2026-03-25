# Завдання 4: Проксі (Proxy)

Цей проєкт демонструє використання патерну **Proxy** для керування доступом до читача текстових файлів (`SmartTextReader`).
Створені два проксі:
- `SmartTextChecker`: Здійснює логування процесу читання та рахує метрики (кількість рядків, символів).
- `SmartTextReaderLocker`: Забороняє доступ до файлів, імена яких співпадають з певним регулярним виразом.

## Як запустити
Для запуску скрипта перейдіть у каталог завдання та виконайте:
```bash
cd task4
npm start
```

## Приклад виконання
```text
> task4@1.0.0 start
> tsc && node dist/index.js

--- SmartTextReader ---
Read 2 lines

--- SmartTextChecker ---
Opening file: test.txt
Successfully read file: test.txt
Total lines: 2
Total characters: 32
Closing file: test.txt

--- SmartTextReaderLocker ---
Trying test.txt:
Read 2 lines

Trying secret_test.txt:
Access denied!
```
