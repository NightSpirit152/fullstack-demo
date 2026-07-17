import { useGetCartItemsLazyQuery } from "../graphql/queries.generated";
import {
  useRemoveFromCartMutation,
  useUpdateCartItemQuantityMutation,
} from "../graphql/mutations.generated";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { useEffect } from "react";
import { requestCartRefresh } from "../store/slices/cartRefreshSlice";

export const Cart = () => {
  const dispatch = useAppDispatch();
  const cartRefreshVersion = useAppSelector(
    (state) => state.cartRefresh.version,
  );

  const [loadCartItems, { data, loading, error }] = useGetCartItemsLazyQuery({
    fetchPolicy: "cache-and-network",
  });
  const [removeFromCart] = useRemoveFromCartMutation();
  const [updateQuantity] = useUpdateCartItemQuantityMutation();

  useEffect(() => {
    void loadCartItems();
  }, [loadCartItems, cartRefreshVersion]);

  const items = data?.cartItems ?? [];
  const total = items.reduce(
    (sum, item) => sum + item.product?.price * item.quantity,
    0,
  );

  const handleRemoveItem = async (cartItemId: number) => {
    try {
      await removeFromCart({ variables: { cartItemId } });

      dispatch(requestCartRefresh());
    } catch (e) {
      console.error(e);
    }
  };

  const handleUpdateItemQuantity = async (
    cartItemId: number,
    quantity: number,
  ) => {
    try {
      await updateQuantity({ variables: { cartItemId, quantity } });

      dispatch(requestCartRefresh());
    } catch (e) {
      console.error(e);
    }
  };

  const ShowLoading = <p className="cart-status">Загрузка корзины...</p>;
  const ShowEmpty = <p className="cart-empty">Корзина пуста</p>;
  const ShowError = (
    <p className="cart-status cart-status-error">
      Ошибка загрузки: {error?.message}
    </p>
  );

  return (
    <div className="cart">
      <div className="cart-header">
        <span className="eyebrow">Чек</span>
        <h2>Корзина</h2>
      </div>

      {loading && ShowLoading}
      {error && ShowError}

      {!loading && !error && items.length === 0 && ShowEmpty}
      {!loading && items?.length > 0 && !error && (
        <>
          <ul>
            {items.map((item) => (
              <li key={item.id} className="cart-line">
                <div className="cart-line-info">
                  <span className="cart-line-name">{item.product.name}</span>
                  <button
                    className="cart-line-remove"
                    onClick={() => handleRemoveItem(item?.id)}
                  >
                    Удалить
                  </button>
                </div>
                <div className="cart-line-controls">
                  <input
                    className="cart-line-qty"
                    type="number"
                    min={0}
                    value={item.quantity}
                    onChange={(e) =>
                      handleUpdateItemQuantity(item?.id, Number(e.target.value))
                    }
                  />
                  <span className="cart-line-total">
                    {(item.product.price * item.quantity).toFixed(2)} ₽
                  </span>
                </div>
              </li>
            ))}
          </ul>
          <div className="cart-divider" aria-hidden="true" />
          <div className="cart-total-row">
            <span>Итого</span>
            <span className="cart-total-amount">{total.toFixed(2)} ₽</span>
          </div>
        </>
      )}
    </div>
  );
};
