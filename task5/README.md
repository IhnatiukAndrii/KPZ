# Завдання 5: Компонувальник (Composite)

Цей проєкт демонструє використання патерну **Composite** для створення деревовидної структури власної мови розмітки (`LightHTML`).
Абстрактний клас `LightNode` об'єднує компоненти двох типів:
- `LightTextNode` (листок, що містить лише текст).
- `LightElementNode` (композит, що містить інші вузли, теги та стилі).

## Як запустити
Для запуску скрипта перейдіть у каталог завдання та виконайте:
```bash
cd task5
npm start
```

## Приклад виконання
```text
> task5@1.0.0 start
> tsc && node dist/index.js

--- Outer HTML ---
<ul class="product-list mt-4"><li class="product-item">Bread</li><li class="product-item">Milk</li><li class="product-item">Eggs</li><li class="product-item">Cheese</li></ul>

--- Inner HTML ---
<li class="product-item">Bread</li><li class="product-item">Milk</li><li class="product-item">Eggs</li><li class="product-item">Cheese</li>

--- Child node count (root ul) ---
4
```
