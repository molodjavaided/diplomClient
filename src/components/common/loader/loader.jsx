import styled from "styled-components";

const LoaderContainer = ({ className }) => {
  return (
    <div className={className}>
      <div className="circle1"></div>
      <div className="circle2"></div>
    </div>
  );
};

export const Loader = styled(LoaderContainer)`
  position: relative;

  .circle1,
  .circle2 {
    border: 4px solid #3498db;
    border-bottom-color: transparent;
    border-radius: 50%;
    position: absolute;
    width: 40px;
    height: 40px;
    animation: circle-spin 1s infinite;
  }

  .circle2 {
    border-top-color: transparent;
    border-bottom-color: #3498db;
    animation-duration: 2s;
  }

  @keyframes circle-spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
