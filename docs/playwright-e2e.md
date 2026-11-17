# Playwright e2e

```bash
yarn playwright install chromium   # на Linux CI: --with-deps chromium
yarn e2e                          # весь набор, сервер запускается автоматически
yarn e2e login.spec.ts             # один файл
yarn e2e --workers=2               # ограничить параллелизм
yarn e2e:ui                       # интерактивный режим
yarn e2e:report                   # отчёт, скриншоты ошибок и traces
yarn e2e:typecheck
```

Запуск использует Chromium и выделенный HTTP-сервер `dev:e2e` на порту 4173.
Порт должен быть свободен: существующий сервер намеренно не переиспользуется,
чтобы тесты не зависели от чужих env-настроек. API — `/api/v1`; бэкенд не требуется.
Service workers заблокированы. Локально четыре worker-процесса, в CI два; автоматические retries отключены.
Vitest остаётся для unit/component-тестов.

## Моки

Всегда импортировать `test` и `expect` из `./support/fixtures`.
Автоматическая fixture изолирована на каждый тест и устанавливает строгий API router.
Общие ответы оболочки: `GET /profile`, `GET /tenants`, `GET /tenant/current`,
`POST /user_activity/heartbeat`. Остальные запросы задаются в сценарии или
именованном помощнике страницы, например `mockDashboard(api)`.

```ts
import { test, expect, visitAuthorized } from "./support/fixtures";

test("empty circles", async ({ page, api }) => {
  api.mock("GET", "/circles", { body: { data: [] } });
  await visitAuthorized(page, "/circles");
  await expect(page.getByRole("heading", { name: "Team circles" })).toBeVisible();
});
```

`api.mock` принимает точный HTTP-метод и путь без `/api/v1` и query string.
Последняя регистрация имеет приоритет, в том числе над общими ответами.
Для фильтрации и пагинации функция ответа читает `new URL(request.url()).searchParams`.
Для проверки отправленных данных доступны `api.calls(method, path)` и
`request.postDataJSON()`. Для асинхронных запросов использовать `expect.poll`;
если требуется именно завершение ответа — зарегистрировать `waitForResponse` до действия.

Неизвестный запрос к `/api/` на любом origin блокируется, а тест сразу падает:

```text
Unmocked API request: GET http://localhost:4173/api/v1/new_endpoint?tenant=test-tenant
Body: <empty>
Register this endpoint explicitly with api.mock(method, path, response).
```

Ошибка содержит тело запроса, поэтому в тестах допустимы только вымышленные данные.
Запрещены универсальные ответы `{ data: [] }` на все API и пропуск запросов к живому
бэкенду. Статические ресурсы Vite и переводы проходят обычным путём.

## Стабильные сценарии

- `visitAuthorized` задаёт localStorage до загрузки приложения; повторная навигация
  не перезаписывает результат входа или принятия приглашения.
- Общие размеры: desktop 1280×720, mobile 375×812; лента также проверяется на 320 px.
- Для индикаторов загрузки использовать управляемый Promise и отпускать его в `finally`.
- Проверять поведение и доступные роли, использовать `data-testid` для специфичных блоков.
- Проверки геометрии сохраняются там, где именно адаптивность — предмет сценария.

При падении CI сохраняет HTML report, screenshot и trace на 14 дней.
В Trace Viewer видны действия, DOM и сеть; путь к trace указан в выводе теста.
