# Pharmacy Catalog — Fullstack Demo
en English | [🇷🇺 Русский](README.ru.md)

A demo project showcasing a **React + TypeScript + Apollo Client** frontend and a **C#/.NET + HotChocolate GraphQL** backend using a pharmacy product catalog and shopping cart example.

The stack intentionally mirrors technologies used in a real commercial project: [yavapteke.ru](https://yavapteke.ru).

## Features

- Browse the product catalog (GraphQL Query)
- Add products to the cart (GraphQL Mutation)
- Update quantity / remove items from the cart
- Automatic total price recalculation
- Error handling (for example, when a product is out of stock)

## Tech Stack

**Backend:** ASP.NET Core 8, HotChocolate GraphQL, Entity Framework Core
**Frontend:** React 18, TypeScript, Apollo Client, Vite
**Tests:** xUnit (backend), Jest + React Testing Library (frontend)

## Project Structure

```text
graphql-fullstack-demo/
├── backend/
│   ├── GraphqlDemo.Api/       # GraphQL API
│   │   ├── Models/            # Product, CartItem
│   │   ├── Data/              # DbContext, seed data
│   │   ├── GraphQL/           # Query, Mutation
│   │   └── Program.cs
│   └── GraphqlDemo.Tests/     # xUnit tests for mutations
└── frontend/
    └── src/
        ├── apollo/            # Apollo Client
        ├── graphql/           # queries.ts, mutations.ts
        ├── components/        # ProductCatalog, ProductCard, Cart
        └── types/
```

## Run

### Backend

```bash
cd backend/GraphqlDemo.Api
dotnet restore
dotnet run
```

The GraphQL server will start at `http://localhost:5000/graphql`. Nitro, the built-in GraphQL IDE for manual query testing, is available there as well.

### Frontend

```bash
cd frontend
npm install
npm run dev
```

The app will open at `http://localhost:5173`.

### Tests

```bash
# Backend
cd backend/GraphqlDemo.Tests && dotnet test

# Frontend
cd frontend && npm test
```

## Example Queries

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
