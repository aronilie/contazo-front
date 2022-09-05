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
    gap: 2em;

    &__computer {
      width: 250px;
      padding: 5em 0 0 0;
    }

    &__title {
      text-align: center;
      font-size: ${styles.fontSizes.superLarge};
      font-weight: ${styles.fontWeights.bold};
      color: ${styles.colors.main};
      margin: 0;
    }

    &__subtitle {
      text-align: center;
      margin: 0;
      font-size: ${styles.fontSizes.large};
    }
  }
`;

export default NotFoundPageStyled;
