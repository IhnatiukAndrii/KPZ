# Завдання 5: Стратегія (Strategy)

Цей проєкт демонструє використання патерну **Strategy** для побудови та управління HTML-елементами. Реалізовано дерево елементів (Composite), систему подій (Observer) та стратегію завантаження зображень (Strategy).

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

--- Simulating Events ---
Mouse hovered over the list!
List was clicked!
Item "Bread" was clicked!

--- Testing Image Loading Strategy ---
Loading image from network: https://example.com/logo.png
Loading image from file system: /assets/local-image.jpg
<img src="https://example.com/logo.png" />
<img src="/assets/local-image.jpg" />
```
