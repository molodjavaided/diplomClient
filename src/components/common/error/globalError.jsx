import { useSelector } from "react-redux";
import { Error } from "./error";

export const GlobalError = () => {
  const authError = useSelector((state) => state.auth?.error);
  const cartError = useSelector((state) => state.cart?.error);
  const productError = useSelector((state) => state.product?.error);
  const uiError = useSelector((state) => state.ui?.error);

  const error = cartError || productError || uiError;

  return <Error error={error} />;
};
