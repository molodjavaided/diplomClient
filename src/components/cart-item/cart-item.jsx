import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { removeItemFromCartServer } from "../../redux/actions/cart-async";
import { Button } from "../common/button/button";

const CartItemContainer = ({ className, item }) => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.products);

  const handleRemoveItem = async () => {
    try {
      dispatch(removeItemFromCartServer(item.productId));
    } catch (error) {
      console.log("Ошибка удаления из корзины", error.message);
    }
  };

  const handleUpdateQuantity = async (quantity) => {
    if (quantity < 1) {
      await handleRemoveItem();
      return;
    }
    try {
      await dispatch(updateQuantityServer(item.productId, quantity));
    } catch (error) {
      console.log("Ошибка при обновлении кол-ва", error.message);
    }
  };

  const handleMinusItem = () => {
    handleUpdateQuantity(item.quantity - 1);
  };

  const handlePlusItem = () => {
    handleUpdateQuantity(item.quantity + 1);
  };

  return (
    <div className={className}>
      <div className="item-image">
        <img src={item.imageUrl} alt={item.title} />
      </div>

      <div className="item-wrapper">
        <div className="item-info">
          <div className="item-title">{item.title}</div>
          <div className="item-description">{item.description}</div>
          <div className="item-price">Цена: {item.price} ₽</div>
          <div className="item-quantity">{item.quantity} шт</div>
        </div>

        <div className="item-controll">
          <div className="buttons">
            <Button
              onClick={handleMinusItem}
              disabled={item.quantity <= 1 || isLoading}
              className="quantity-btn"
            >
              -
            </Button>
            <Button
              onClick={handlePlusItem}
              disabled={!item.inStock || isLoading}
              className="quantity-btn"
            >
              +
            </Button>
          </div>
          <Button
            className="remove-btn"
            onClick={handleRemoveItem}
            disabled={isLoading}
          >
            Удалить товар из корзины
          </Button>
        </div>
      </div>

      <div className="item-result">{item.totalPrice} ₽</div>
    </div>
  );
};

export const CartItem = styled(CartItemContainer)`
  display: flex;
  gap: 20px;
  justify-content: space-between;

  .item-controll {
    display: flex;
    justify-content: space-around;
    flex-direction: column;
    gap: 20px;
  }

  .buttons {
    display: flex;
    gap: 10px;
  }

  .item-image {
    flex-shrink: 0;
    width: 200px;
    height: 200px;
    border-radius: 10px;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  img {
    height: 100%;
    width: 100%;
    object-fit: contain;
  }

  .item-wrapper {
    width: 100%;
  }

  .item-result {
    display: flex;
    align-items: center;
    min-width: 100px;
  }
`;
