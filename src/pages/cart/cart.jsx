import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { useCart } from "../../hooks/useCart";
import { CartItem } from "../../components/cart-item/cart-item";

const CartPageContainer = ({ className }) => {
  const dispatch = useDispatch();
  const { items, totalPrice, totalQuantity } = useSelector(
    (state) => state.cart
  );
  const { isLoading } = useSelector((state) => state.products);

  const { clearCart, makingOrder } = useCart();

  const handleClearCart = async () => {
    await clearCart();
  };

  const handleMakeOrder = async () => {
    try {
      if (!items || items.length === 0) {
        alert("Ваша корзина пуста");
        return;
      }

      const notInStock = items.filter((item) => item === !item.inStock);

      if (notInStock.length > 0) {
        const nameItem = notInStock.map((item) => item.title).join(", ");
        alert(`Данных товаров: ${nameItem} нет в наличии`);
        return;
      }

      const result = await makingOrder(items);
      if (result.success) {
        alert(result.message);
      } else {
        alert(`Ошибка: ${result.error}`);
      }
    } catch (error) {
      console.log("Ошибка оформления заказа", error.message);
    }
  };

  if (isLoading) {
    return (
      <div className={className}>
        <Loader />
      </div>
    );
  }

  if (!items || items.length === 0) {
    return (
      <div className={className}>
        <h2>Ваша корзина пуста</h2>
      </div>
    );
  }

  return (
    <div className={className}>
      <h2>Ваши товары</h2>

      <div className="cart-items">
        {items.map((item) => (
          <CartItem key={item.productId} item={item} />
        ))}
      </div>

      <div className="cart-result">
        <div className="cart-total-quantity">Товар {totalQuantity} шт</div>
        <div className="cart-total-price">К оплате {totalPrice} ₽</div>
      </div>

      <div className="cart-actions">
        <Button className="cart-order__btn" onClick={handleMakeOrder}>
          Оформить заказ
        </Button>
        <Button className="cart-clear__btn" onClick={handleClearCart}>
          Очистить корзину
        </Button>
      </div>
    </div>
  );
};

export const CartPage = styled(CartPageContainer)`
  display: flex;
  flex-direction: column;
  gap: 50px;
  margin: 50px;

  h2 {
    text-align: center;
  }

  .cart-items {
    display: flex;
    flex-direction: column;
    gap: 30px;
    width: 100%;
  }
`;
