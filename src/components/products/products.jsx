import styled from "styled-components";
import { useSelector } from "react-redux";
import { Loader } from "../common/loader/loader";
import { Product } from "../product/product";

const ProductsContainer = ({ className, products }) => {
  const { isLoading } = useSelector((state) => state.products);

  if (!products || products.length === 0) {
    return <div>Товары не найдены</div>;
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className={className}>
      {products.map((product) => (
        <Product key={product.id} product={product} />
      ))}
    </div>
  );
};

export const Products = styled(ProductsContainer)`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 30px;
}
`;
