# Завдання 3: Міст (Bridge)

Цей проєкт демонструє використання патерну **Bridge** для розділення абстракції геометричних фігур (`Circle`, `Square`, `Triangle`) та їх реалізації / механізму відмальовування (`VectorRenderer`, `RasterRenderer`). Це дозволяє комбінувати фігури з будь-яким типом візуалізації.

## Як запустити
Для запуску скрипта перейдіть у каталог завдання та виконайте:
```bash
cd task3
npm start
```

## Приклад виконання
```text
> task3@1.0.0 start
> tsc && node dist/index.js

--- Vector Renderings ---
Drawing Circle as lines
Drawing Square as lines
Drawing Triangle as lines

--- Raster Renderings ---
Drawing Circle as pixels
Drawing Square as pixels
Drawing Triangle as pixels
```
