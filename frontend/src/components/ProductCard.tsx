import { Product } from "../graphql/types";

type TProductCardProps = {
  product: Product;
  onAddToCart: (productId: number) => void;
};

export const ProductCard = ({ product, onAddToCart }: TProductCardProps) => {
  const isOutOfStock = product.stockQuantity === 0;
  const isLowStock = !isOutOfStock && product.stockQuantity <= 10;

  return (
    <div className="product-card">
      <div className="product-card-top">
        <span className="product-category">{product.category}</span>
        {isLowStock && (
          <span className="stock-badge">Осталось {product.stockQuantity}</span>
        )}
        {isOutOfStock && (
          <span className="stock-badge stock-badge-out">Нет в наличии</span>
        )}
      </div>
      <h3 className="product-name">{product.name}</h3>
      <p className="product-description">{product.description}</p>
      <div className="product-footer">
        <span className="product-price">{product.price.toFixed(2)} ₽</span>
        <button
          className="add-button"
          onClick={() => onAddToCart(product.id)}
          disabled={isOutOfStock}
        >
          {isOutOfStock ? "Недоступно" : "В корзину"}
        </button>
      </div>
    </div>
  );
};
