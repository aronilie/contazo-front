import styled from "styled-components";
import styles from "../../styles/styles";

const NavigationStyled = styled.nav`
  min-width: 100%;
  height: 10vh;
  bottom: 0;
  left: 0;
  right: 0;
  position: fixed;
  background-color: ${styles.colors.grey};

  .navigation {
    padding: 0;
    margin: 0;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-around;

    &__telephone {
      display: flex;
      flex-direction: column;
      gap: 0.3em;
    }

    &__contacts {
      display: flex;
      flex-direction: column;
      gap: 0.3em;
    }

    &__favourites {
      display: flex;
      flex-direction: column;
      gap: 0.3em;
    }
  }
`;

export default NavigationStyled;
