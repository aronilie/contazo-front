import styled from "styled-components";
import styles from "../../styles/styles";

const NavigationStyled = styled.nav`
  min-width: 100%;
  height: 3.7em;
  bottom: 0;
  left: 0;
  right: 0;
  position: fixed;
  background-color: ${styles.colors.grey};

  @media (min-width: 800px) {
    height: 5em;
  }

  .navigation {
    padding: 0;
    margin: 0;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-around;

    &__link {
      text-decoration: none;
      color: ${styles.colors.black};
    }

    &__text {
      font-size: ${styles.fontSizes.smaller};

      @media (min-width: 800px) {
        font-size: ${styles.fontSizes.small};
      }
    }

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
