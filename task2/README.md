# Завдання 2: Посередник (Mediator)

Цей проєкт демонструє рефакторинг C# коду патерну **Mediator** на TypeScript.
Літаки (`Aircraft`) та злітні смуги (`Runway`) більше нічого не знають один про одного — їхній код повністю відв'язаний і вони не імпортують один одного. Уся взаємодія (запит на посадку, зліт, пошук вільної смуги) проходить виключно через центральну точку — посередника `CommandCentre`.

## Як запустити
Для запуску скрипта (з папки завдання) виконайте:
```bash
cd task2
npm start
```
*(Або у корні проєкту: `npx ts-node task2/src/index.ts`)*

## Приклад виконання
```text
> task2@1.0.0 start
> tsc && node dist/index.js

--- Initial Landings ---
Aircraft Boeing-737 is requesting landing.
Command Centre: Checking runways for landing request by Boeing-737.
Command Centre: Aircraft Boeing-737 has been cleared to land on runway RWY-1.
Runway RWY-1 is busy!

Aircraft Airbus-A320 is requesting landing.
Command Centre: Checking runways for landing request by Airbus-A320.
Command Centre: Aircraft Airbus-A320 has been cleared to land on runway RWY-2.
Runway RWY-2 is busy!

Aircraft Cessna-172 is requesting landing.
Command Centre: Checking runways for landing request by Cessna-172.
Command Centre: Could not land Cessna-172, all runways are busy.

--- Takeoff and Freeing Runway ---
Aircraft Boeing-737 is requesting take off.
Command Centre: Processing take off request by Boeing-737.
Runway RWY-1 is free!
Command Centre: Aircraft Boeing-737 has taken off from runway RWY-1.

--- Final Landing ---
Aircraft Cessna-172 is requesting landing.
Command Centre: Checking runways for landing request by Cessna-172.
Command Centre: Aircraft Cessna-172 has been cleared to land on runway RWY-1.
Runway RWY-1 is busy!
```
