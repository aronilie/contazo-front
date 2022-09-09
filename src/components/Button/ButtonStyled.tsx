import styled from "styled-components";
import styles from "../../styles/styles";

const ButtonStyled = styled.button`
  min-height: 3.25em;
  width: 100%;
  margin: 1em 0;
  border-radius: 0.6em;
  border: none;
  cursor: pointer;
  background-color: ${styles.colors.main};
  color: ${styles.colors.white};
  font-family: "Inter", sans-serif;
  font-size: ${styles.fontSizes.small};
  font-weight: ${styles.fontWeights.semiBold};

  &-button__error--active {
    background-color: ${styles.colors.mainAction};
  }
`;

export default ButtonStyled;
