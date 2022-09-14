import styled from "styled-components";
import styles from "../../styles/styles";

const HeaderStyled = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  .header {
    &__logo {
      max-width: 170px;

      @media (min-width: 800px) {
        max-width: 300px;
        padding: 0 0 0 5em;
      }
    }
  }

  .link {
    @media (min-width: 800px) {
      padding: 0 5em 0 0;
    }

    &__text {
      color: ${styles.colors.black};
      font-size: ${styles.fontSizes.medium};
      font-weight: ${styles.fontWeights.semiBold};
    }
  }
`;

export default HeaderStyled;
