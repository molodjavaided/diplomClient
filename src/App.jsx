import { Route, Routes } from "react-router-dom";
import styled from "styled-components";
import { GlobalError } from "./components/common/error/globalError";
import { Header } from "./components/layout/header/Header";
import { Main } from "./pages/main/main";
import { ProductPage } from "./pages/product/product-page";
import { CartPage } from "./pages/cart/cart";
import { Register } from "./pages/register/register";
import { Authorization } from "./pages/authorization/authorization";
import { useDispatch } from "react-redux";
import { checkAuth } from "./redux/actions/auth-async";
import { useEffect } from "react";
import { ArrowBack } from "./components/common/arrow-back/arrow-back";

const AppColumn = styled.div`
  display: flex;
  flex-direction: column;
  max-width: var(--width-desktop);
  min-height: 100vh;
  margin: 0 auto;
  padding-top: 150px;
`;

const Content = styled.div`
  display: flex;
  justify-content: center;
  margin: 0 auto;
  width: min(100%, var(--width-desktop));
  padding: 0 clamp(var(--spacing-xs), 3vw, var(--spacing-lg));
  box-sizing: border-box;
`;

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  return (
    <AppColumn>
      <Header />
      <ArrowBack />
      <Content>
        <GlobalError />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Authorization />} />
          <Route path="/register" element={<Register />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/product/:productId" element={<ProductPage />} />
          <Route path="/admin" element={<div>Админ панель</div>} />
        </Routes>
      </Content>
    </AppColumn>
  );
}

export default App;
