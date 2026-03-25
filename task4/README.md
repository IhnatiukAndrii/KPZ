# Завдання 4: Прототип (Prototype)

Цей проєкт демонструє використання патерну **Prototype** для глибокого клонування (deep copy) об'єктів складної ієрархії на прикладі родини вірусів (`Virus`), які містять масив дітей.

## Як запустити
Для запуску скрипта (із кореня проєкту) виконайте команду:
```bash
npx tsx task4/index.ts
```

## Приклад виконання
```text
true
true
true
V3.1
Virus {
  weight: 5,
  age: 10,
  name: 'V1',
  species: 'Covid',
  children: [
    Virus {
      weight: 1.5,
      age: 5,
      name: 'V2.1',
      species: 'Covid',
      children: [
        Virus { weight: 0.1, age: 1, name: 'V3.1', species: 'Covid', children: [] },
        Virus { weight: 0.2, age: 1, name: 'V3.2', species: 'Covid', children: [] }
      ]
    },
    Virus {
      weight: 1.2,
      age: 4,
      name: 'V2.2',
      species: 'Covid',
      children: [
        Virus { weight: 0.15, age: 2, name: 'V3.3', species: 'Covid', children: [] }
      ]
    }
  ]
}
```
*(Багаторазове отримання `true` у порівняннях через `!==` показує, що всі вкладені об'єкти були повністю і правильно зклоновані як окремі нові екземпляри).*
