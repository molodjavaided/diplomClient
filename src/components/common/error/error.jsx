import styled from "styled-components";
const ErrorContainer = ({ className, error }) => {
  if (!error) {
    return null;
  }

  return (
    <div className={className}>
      <h2>Ошибка</h2>
      <div>{error}</div>
    </div>
  );
};

export const Error = styled(ErrorContainer)`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 20px;
`;
