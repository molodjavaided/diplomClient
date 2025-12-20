import styled from "styled-components";
import { useDispatch } from "react-redux";

const MainContainer = ({ className }) => {
  const dispatch = useDispatch();

  return (
    <div className={className}>
      {/* поиск */}
      {/* категории */}

      {/* товары */}
    </div>
  );
};

export const Main = styled(MainContainer)``;
