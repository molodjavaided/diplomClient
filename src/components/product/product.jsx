import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useState } from "react";
import { addItemToCartServer } from "../../redux/actions/cart-async";
import { Button } from "../common/button/button";

const ProductContainer = ({ className, product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useSelector((state) => state.auth);

  const handleAddToCart = async () => {
    if (!user) {
      navigate("/login");
      return;
    }
    if (isLoading) {
      return;
    }
    setIsLoading(true);
    try {
      await dispatch(addItemToCartServer(product.id, 1));
      console.log("Товар добавлен в корзину");
    } catch (error) {
      console.error("Ошибка добавления в корзину:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const getTextButton = () => {
    if (!user) return "Авторизуйтесь";
    if (!product.inStock || product.quantity <= 0) return "Нет в наличии";
    return isLoading ? "Транспортировка в корзину" : "Добавить в корзину";
  };

  const isDisabled = () => {
    if (isLoading) return true;
    if (!product.inStock || product.quantity <= 0) return true;
    return false;
  };

  return (
    <article className={className}>
      <Link to={`/product/${product.id}`} className="product-link">
        <div className="product-image">
          {product.imageUrl && product.imageUrl.trim() !== "" ? (
            <img src={product.imageUrl} alt={product.title} loading="lazy" />
          ) : (
            <div>Нет изображения</div>
          )}
        </div>
        <div className="product-info">
          <h3 className="product-title">{product.title}</h3>
          <div className="product-info__wrapper">
            <div className="product-description">{product.description}</div>
            <div className="product-details">
              {product.inStock ? (
                <div className="product-quantity">
                  В наличии {product.quantity} шт
                </div>
              ) : (
                <div className="product-quantity">Нет в наличии</div>
              )}
            </div>
            <div className="product-price">{product.price} ₽</div>
          </div>
        </div>
      </Link>

      <Button
        className="addCardBtn"
        onClick={handleAddToCart}
        disabled={isDisabled()}
      >
        {getTextButton()}
      </Button>
    </article>
  );
};

export const Product = styled(ProductContainer)`
  display: flex;
  flex-direction: column;
  gap: 10px;
  border-radius: 5px;
  padding: 25px;
  width: 800px;
  transition: transform 0.2s;
  height: 300px;
  box-sizing: border-box;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);

  .product-link {
    display: flex;
    gap: 30px;
    text-decoration: none;
    color: var(--color-black);
    align-items: center;
  }

  .product-description {
    width: 100%;
    height: 50px;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .product-info {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 10px;

    &__wrapper {
      display: flex;
      flex-direction: column;
      gap: 30px;
    }
  }

  &hover: {
    background-color: black;
  }

  .product-image {
    flex-shrink: 0;
    width: 120px;
    height: 120px;
    border-radius: 10px;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;
