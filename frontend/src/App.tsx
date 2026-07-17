import { ProductCatalog } from "./components/ProductCatalog";
import { Cart } from "./components/Cart";
import "./App.css";
import { useState } from "react";

function App() {
  return (
    <div className="app">
      <header className="site-header">
        <span className="eyebrow">GraphQL Fullstack · Demo</span>
        <h1>Аптечный каталог</h1>
        <p className="stack-line">
          React · TypeScript · Apollo Client
          <span className="stack-divider" aria-hidden="true">
            ⇄
          </span>
          C#/.NET · HotChocolate GraphQL
        </p>
      </header>
      <main className="app-layout">
        <ProductCatalog />
        <Cart />
      </main>
    </div>
  );
}

export default App;
