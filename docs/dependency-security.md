# Обновление зависимостей безопасности

Дата проверки: 2026-11-17. Источник результата — `yarn audit --json` для текущего
`yarn.lock`; числа ниже считают находки по цепочкам зависимостей, а не уникальные CVE.

| Уровень | До обновления | После обновления |
| --- | ---: | ---: |
| Critical | 1 | 0 |
| High | 93 | 0 |
| Moderate | 49 | 2 |
| Low | 13 | 0 |
| Всего | 156 | 2 |

## Выполнено

- `form-data` через `jsdom`: 4.0.0 → 4.0.6. Закрывает предсказуемый multipart boundary
  (CVE-2025-7783) и дополнительное исправление из GHSA-hmw2-7cc7-3qxx.
- `lodash`: 4.17.23 → 4.18.1.
- Штатным `yarn upgrade <parent>@<existing-range>` обновлены затронутые деревья
  зависимостей, в том числе PostCSS, Rollup, Babel, ws, YAML, fast-uri, fflate,
  minimatch, brace-expansion и browserslist. Lockfile сформирован Yarn.
- Для закреплённых или ещё не обновлённых родительских зависимостей добавлены
  адресные `resolutions`; предупреждения audit не подавляются.

## Зачем нужны resolutions

| Правило | Причина и граница |
| --- | --- |
| `form-data: ^4.0.6` | Совместимо с `jsdom` → `form-data@^4.0.0`; не требует смены jsdom. |
| `@babel/runtime: ^7.29.14` | Обновляет старые копии в разрешённой ветке Babel 7. |
| `**/lint-staged/micromatch: ^4.0.8` | lint-staged 13 фиксирует старый patch 4.0.5; сохраняем major 4. |
| `**/lint-staged/yaml: ^2.8.3` | lint-staged 13 фиксирует 2.3.1; сохраняем major 2. |
| `**/workbox-build/glob: ^14.0.6` | Для glob 9–13 нет исправления отмены обхода; исправление — 14.0.2+. |
| `**/@joshwooding/vite-plugin-react-docgen-typescript/glob: ^14.0.6` | Та же причина; ограничено генератором Storybook. |

Переопределения glob не затрагивают старый callback API glob 7 в `gh-pages`.
Сборщики используют публичные glob/globSync API; совместимость проверяется сборками
приложения/PWA и Storybook. Не следует заменять эти правила на глобальное
`glob: 14` или глобальное `minimatch: 11`.

Когда родительские пакеты перейдут на исправленные версии сами, соответствующие
resolutions можно удалить и повторить audit и проверки.

## Осталось: React Router

Установлен `react-router-dom@6.30.6` → `react-router@6.30.6`.
Остаются две moderate-находки:

- [CVE-2026-53669 / GHSA-wrjc-x8rr-h8h6](https://github.com/advisories/GHSA-wrjc-x8rr-h8h6):
  open redirect в Link/useNavigate; исправлено в 7.18.0.
- [CVE-2026-53666 / GHSA-337j-9hxr-rhxg](https://github.com/advisories/GHSA-337j-9hxr-rhxg):
  constructor injection при SSR hydration; исправлено в 7.18.0. Приложение использует
  клиентский Router, но уязвимая версия пакета остаётся в дереве.

Переход на `react-router-dom@7.18.5` дважды отклонён автоматической проверкой
разрешений: смена major затрагивает приложение с `redux-first-history/rr6`, поэтому
нужны явное согласование и проверка совместимости. Обход запрета не выполнялся.

### План отдельной миграции

1. Обновить только `react-router-dom` до 7.18.5, без принудительной подмены вложенного
   `react-router` через resolutions.
2. Проверить совместимость текущего HistoryRouter с публичным Router API v7,
   useNavigate, location state, относительными ссылками и фоновыми маршрутами диалогов.
   Если понадобятся адаптации, ограничить их слоем маршрутизации.
3. Сохранить существующие правила auth, tenant, ролей и plugin flags.
4. Прогнать lint/typecheck, unit-тесты (включая dialog reload/history), все e2e и обе
   сборки. В `e2e/route-access.spec.ts` заранее добавлены проверки auth, ролей и tenant
   на desktop/mobile; существующие сценарии проверяют вход, VK callback, приглашения,
   профиль и историю операций.
5. Повторить audit: ожидаемый результат — ноль находок. При регрессиях не завершать
   миграцию до их устранения.

Основа плана — [официальное руководство v6 → v7](https://reactrouter.com/7.9.6/upgrading/v6).
Миграция роутера пока не выполнена.

## Команды проверки

```bash
yarn install --frozen-lockfile
yarn audit --json
yarn lint
yarn test:withoutWatch --maxWorkers=2
yarn e2e
yarn build
yarn build-storybook
```

Audit на текущем этапе ожидаемо завершается с ненулевым кодом из-за двух указанных
находок. Это не нулевой audit и не исключение этих CVE из проверки.

## Результат проверок текущего обновления

- `yarn install --frozen-lockfile`: успешно, без изменения lockfile.
- `yarn lint`: успешно, 18 существующих предупреждений.
- Unit: 33 файла, 113 тестов — успешно.
- E2E: 68 тестов — успешно (включая 6 новых проверок доступа на desktop/mobile).
- Сборки приложения/PWA и Storybook — успешно. В сборке остаются предупреждения
  Sass о старых `@import` и предупреждения о размере chunks.
- Проверка `engines.node` установленных пакетов: несовместимых с Node 22.17.1 нет.
- Финальный audit: 0 critical, 0 high, 2 moderate (только React Router), 0 low.
