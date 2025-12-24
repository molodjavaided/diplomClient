import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { request } from "../../utils/request";
import { addItemToCartServer } from "../../redux/actions/cart-async";
import { Button } from "../../components/common/button/button";
import { Loader } from "../../components/common/loader/loader";

const ProductPageContainer = ({ className }) => {
  const { user } = useSelector((state) => state.auth);
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const getProduct = async () => {
      try {
        setIsLoading(true);
        const response = await request(`/product/${productId}`);

        setProduct(response.product);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    if (productId) {
      getProduct();
    }
  }, [productId]);

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
    if (!product?.inStock || product?.quantity <= 0) return "Нет в наличии";
    return isLoading ? "Транспортировка в корзину" : "Добавить в корзину";
  };

  const isDisabled = () => {
    if (isLoading) return true;
    if (!product?.inStock || product?.quantity <= 0) return true;
    return false;
  };

  if (isLoading) {
    return (
      <div className={className}>
        <Loader />
      </div>
    );
  }

  return (
    <div className={className}>
      <div className="product">
        <div className="product-image">
          <img src={product?.imageUrl} alt={product?.title} />
        </div>

        <div className="product-info">
          <h3 className="product-title">{product?.title}</h3>
          <div className="product-description">{product?.description}</div>

          <div className="product-quantity">{product?.quantity} шт</div>
        </div>
      </div>

      <div className="product-info__price">
        <div className="product-price">{product?.price} ₽</div>
        <Button
          className="add-product-to-cart"
          onClick={handleAddToCart}
          disabled={isDisabled()}
        >
          {getTextButton()}
        </Button>
      </div>
    </div>
  );
};

export const ProductPage = styled(ProductPageContainer)`
  display: flex;
  flex-direction: column;
  gap: 50px;
  align-items: flex-end;
  margin: 50px;

  .product {
    display: flex;
    gap: 30px;
  }

  .product-image {
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

  .product-info {
    display: flex;
    flex-direction: column;
    gap: 30px;
    align-items: center;
  }

  .product-info__price {
    display: flex;
    gap: 30px;
    flex-direction: column;
    align-items: flex-end;
  }
`;
