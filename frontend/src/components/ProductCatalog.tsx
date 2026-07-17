import { useGetProductsQuery } from "../graphql/queries.generated";
import { useAddToCartMutation } from "../graphql/mutations.generated";
import { ProductCard } from "./ProductCard";
import { useAppDispatch } from "../store/hooks";
import { requestCartRefresh } from "../store/slices/cartRefreshSlice";

export const ProductCatalog = () => {
  const dispatch = useAppDispatch();
  const { data, loading, error } = useGetProductsQuery();
  const [addToCart] = useAddToCartMutation();

  if (loading) return <p className="catalog-status">Загрузка каталога...</p>;
  if (error) return (
    <p className="catalog-status catalog-status-error">
      Ошибка загрузки: {error.message}
    </p>
  );

  const handleAddToCart = async (productId: number) => {
    try {
      await addToCart({ variables: { productId, quantity: 1 } });

      dispatch(requestCartRefresh());
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="product-catalog">
      {data?.products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={handleAddToCart}
        />
      ))}
    </div>
  );
};
