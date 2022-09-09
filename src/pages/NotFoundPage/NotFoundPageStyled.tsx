import styled from "styled-components";
import styles from "../../styles/styles";

const NotFoundPageStyled = styled.div`
  min-width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;

  .container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 2em;

    &__computer {
      width: 150px;
      padding: 2.5em 0 0 0;
    }

    &__title {
      text-align: center;
      font-size: ${styles.fontSizes.megaLarge};
      font-weight: ${styles.fontWeights.bold};
      color: ${styles.colors.main};
      margin: 0;
    }

    &__subtitle {
      text-align: center;
      margin: 0;
      font-size: ${styles.fontSizes.large};
    }

    &__link {
      padding: 2em 0 0 0;
      display: flex;
      justify-content: center;
    }
  }
`;

export default NotFoundPageStyled;
