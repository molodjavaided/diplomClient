import { Route, Routes } from "react-router-dom";
import styled from "styled-components";

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
  return (
    <AppColumn>
      <Content>
        <Routes>
          <Route path="/" element={<div>Главная</div>} />
          <Route path="/login" element={<div>Вход</div>} />
          <Route path="/register" element={<div>Регистрация</div>} />
          <Route path="/cart" element={<div>Корзина</div>} />
          <Route path="/product/:productId" element={<div>Товар</div>} />
          <Route path="/admin" element={<div>Админ панель</div>} />
          <Route path="*" element={<div>Ошибка</div>} />
        </Routes>
      </Content>
    </AppColumn>
  );
}

export default App;
