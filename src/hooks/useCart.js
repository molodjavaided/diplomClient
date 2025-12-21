import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { cartActions, fetchProducts } from "../store/actions";
import { addItemToCartServer, clearServerCart } from "../store/actions/cart-async";

export const useCart = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { user } = useSelector((state) => state.auth);
    const { items: products } = useSelector((state) => state.products)

    const addToCart = async (product, quantity = 1) => {
        if (!user) {
            navigate('/login')
            return
        }

        const selectedProduct = products.find(item => item.id === product.id)

        if (!selectedProduct || selectedProduct.quantity < quantity) {
            alert(`${product.title} недостаточно на складе, доступно ${selectedProduct.quantity || 0} шт`)
            return false
        }

        try {
            dispatch(cartActions.addToCart(product, quantity))

            await dispatch(addItemToCartServer(product.id, quantity))

            await dispatch(fetchProducts())

            return true
        } catch (error) {
            console.error("Ошибка добавления в корзину:", error.message);
            return false;
        }
    }

    const makingOrder = async () => {
        if (!user) {
            navigate('/login')
            return
        }

        const notInStock = items.filter(item => !item.inStock);
        if (notInStock.length > 0) {
            return {
                success: false,
                error: "Некоторые товары отсутствуют в наличии"
            };
        }

        try {
      const result = await dispatch(makeOrder());
      return {
        success: true,
        data: result,
        message: "Заказ успешно оформлен"
      };
    } catch (error) {
      return {
        success: false,
        error: error.message || "Ошибка оформления заказа"
      };
    }
  };

//   const checkInStock = (items) => {
//     const items.filter(item => !item.inStock)
//   }



    const clearCart = async () => {

        try {
            await dispatch(clearServerCart())
            dispatch(cartActions.clearCart())

            return true;
        } catch (error) {
            console.error("Ошибка очистки корзины:", error.message);
        }
    }
    return { addToCart, clearCart, makingOrder }
}
