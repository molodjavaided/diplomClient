import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  fetchCategories,
  fetchProducts,
} from "../../redux/actions/products-async";
import { Loader } from "../../components/common/loader/loader";
import { Products } from "../../components/products/products";
import { Button } from "../../components/common/button/button";
import { CategoryFilter } from "../../components/category-filter/category-filter";
import { SortProducts } from "../../components/sort-products/sort-products";

const MainContainer = ({ className }) => {
  const dispatch = useDispatch();
  const {
    isLoading,
    error,
    filteredItems: products,
    sortBy,
    selectedCategory,
  } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleResetFilters = () => {
    dispatch(productsActions.resetFilters());
  };

  const hasActiveFilters = selectedCategory || sortBy !== "default";

  if (isLoading) {
    return (
      <div className={className}>
        <Loader />
      </div>
    );
  }

  return (
    <div className={className}>
      <div className="wrapper">
        <div className="filters-container">
          <CategoryFilter />
          <SortProducts />
          {hasActiveFilters && (
            <Button className="reset-filters" onClick={handleResetFilters}>
              Сбросить фильтр
            </Button>
          )}
        </div>

        <Products products={products} />
      </div>
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

  .wrapper {
    display: flex;
    width: 100%;
    gap: 40px;
  }

  .filters-container {
    display: flex;
    flex-direction: column;
    gap: 30px;
    width: 280px;
    flex-shrink: 0;
  }
`;
