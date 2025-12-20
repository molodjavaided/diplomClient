import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  fetchCategories,
  fetchProducts,
} from "../../redux/actions/products-async";
import { Loader } from "../../components/common/loader/loader";
import { Products } from "../../components/products/products";

const MainContainer = ({ className }) => {
  const dispatch = useDispatch();
  const {
    isLoading,
    error,
    filteredItems: products,
  } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchCategories());
  }, [dispatch]);

  if (isLoading) {
    return (
      <div className={className}>
        <Loader />
      </div>
    );
  }

  return (
    <div className={className}>
      <Products products={products} />
    </div>
  );
};

export const Main = styled(MainContainer)`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 40px;
  margin: 40px auto;
`;
