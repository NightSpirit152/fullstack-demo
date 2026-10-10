# Каталог аптеки — Fullstack Demo
[en English](README.md) | 🇷🇺 Русский

Демонстрационный проект, показывающий связку **React + TypeScript + Apollo Client** (фронтенд) и **C#/.NET + HotChocolate GraphQL** (бэкенд) на примере каталога товаров аптеки и корзины покупок.

Стек намеренно повторяет технологии, использованные в реальном коммерческом проекте [yavapteke.ru](https://yavapteke.ru).

## Функциональность

- Просмотр каталога товаров (GraphQL Query)
- Добавление товара в корзину (GraphQL Mutation)
- Изменение количества / удаление товара из корзины
- Автоматический пересчёт итоговой суммы
- Обработка ошибок (например, товар отсутствует на складе)

## Стек

**Backend:** ASP.NET Core 8, HotChocolate GraphQL, Entity Framework Core
**Frontend:** React 18, TypeScript, Apollo Client, Vite
**Тесты:** xUnit (backend), Jest + React Testing Library (frontend)

## Структура проекта

```
graphql-fullstack-demo/
├── backend/
│   ├── GraphqlDemo.Api/       # GraphQL API
│   │   ├── Models/            # Product, CartItem
│   │   ├── Data/              # DbContext, seed-данные
│   │   ├── GraphQL/           # Query, Mutation
│   │   └── Program.cs
│   └── GraphqlDemo.Tests/     # xUnit тесты мутаций
└── frontend/
    └── src/
        ├── apollo/            # Apollo Client
        ├── graphql/           # queries.ts, mutations.ts
        ├── components/        # ProductCatalog, ProductCard, Cart
        └── types/
```

## Запуск

### Backend

```bash
cd backend/GraphqlDemo.Api
dotnet restore
dotnet run
```

GraphQL-сервер поднимется на `http://localhost:5000/graphql`. Там же доступен Nitro — встроенный GraphQL IDE для ручного тестирования запросов.

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Приложение откроется на `http://localhost:5173`.

### Тесты

```bash
# Backend
cd backend/GraphqlDemo.Tests && dotnet test

# Frontend
cd frontend && npm test
```

## Пример запроса

```graphql
query {
  products {
    id
    name
    price
  }
}
```

```graphql
mutation {
  addToCart(productId: 1, quantity: 2) {
    id
    quantity
  }
}
```
