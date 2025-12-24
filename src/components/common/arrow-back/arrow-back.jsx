import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { icons } from "../../ui/icons/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ArrowBackContainer = ({ className }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(-1);
  };

  return (
    <div className={className} onClick={handleClick}>
      <FontAwesomeIcon icon={icons.arrowBack} />
    </div>
  );
};

export const ArrowBack = styled(ArrowBackContainer)`
  position: fixed;
  left: 0;
  height: 100%;
  width: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.7s ease;
  z-index: 10;
  cursor: pointer;

  &:hover {
    background-color: var(--color-platinum);
  }

  & > svg {
    color: var(--color-silver);
    font-size: 1.5rem;
    transition: 0.7s ease;
  }

  &:hover svg {
    color: var(--color-black);
  }
`;
