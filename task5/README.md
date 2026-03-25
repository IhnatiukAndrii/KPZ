# Завдання 5: Знімок (Memento)

Цей проєкт демонструє використання патерну **Memento** для збереження стану текстового документа (`TextDocument`) в об'єкт знімка (`DocumentMemento`). Редактор (`TextEditor`), виступаючи в ролі опікуна (Caretaker), може зберігати ці стани в історію та за потреби скасовувати останні введені зміни, відновлюючи документ до попереднього стану без порушення інкапсуляції.

## Як запустити
Для запуску скрипта перейдіть у каталог завдання та виконайте:
```bash
cd task5
npm start
```

## Приклад виконання
```text
> task5@1.0.0 start
> ts-node src/index.ts

[Document Content]: Hello World!
This is the Memento pattern.

--- Undo ---
[Document Content]: Hello World!

--- Undo ---
[Document Content]: Hello
```
