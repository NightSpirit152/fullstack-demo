import { render, screen } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import { Cart } from "./Cart";
import { GetCartItemsDocument } from "../graphql/queries.generated";

describe("Cart", () => {
  it("показывает сообщение о пустой корзине", async () => {
    const mocks = [
      {
        request: { query: GetCartItemsDocument },
        result: { data: { cartItems: [] } },
      },
    ];

    render(
      <MockedProvider mocks={mocks}>
        <Cart />
      </MockedProvider>,
    );

    expect(await screen.findByText("Корзина пуста")).toBeInTheDocument();
  });

  it("считает итоговую сумму корзины", async () => {
    const mocks = [
      {
        request: { query: GetCartItemsDocument },
        result: {
          data: {
            cartItems: [
              {
                id: 1,
                quantity: 2,
                product: { id: 1, name: "Парацетамол", price: 45.5 },
              },
            ],
          },
        },
      },
    ];

    render(
      <MockedProvider mocks={mocks}>
        <Cart />
      </MockedProvider>,
    );

    expect(await screen.findByText("91.00 ₽")).toBeInTheDocument();
  });
});
