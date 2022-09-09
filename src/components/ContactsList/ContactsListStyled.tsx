import styled from "styled-components";
import styles from "../../styles/styles";

export const ContactsListStyled = styled.ul`
  margin: 0 auto;
  padding: 0;
  list-style: none;

  .title {
    font-size: ${styles.fontSizes.large};
    font-weight: ${styles.fontWeights.bold};

    @media (min-width: 800px) {
      font-size: ${styles.fontSizes.extraLarge};
    }
  }

  .index {
    display: none;

    @media (min-width: 800px) {
      display: block;
      width: 800px;
      padding: 20px 90px 15px 77px;
      display: flex;
      font-size: ${styles.fontSizes.small};
      font-weight: ${styles.fontWeights.semiBold};

      &__name {
        flex: 2;
      }

      &__email {
        flex: 2;
      }

      &__phoneNumber {
        flex: 1;
      }
    }
  }
`;

export const ListContainerStyled = styled.div`
  @media (min-width: 800px) {
    margin: 0 1em;
    display: flex;
    justify-content: center;
    width: 100%;
  }

  .list {
    @media (min-width: 800px) {
      width: 800px;
    }
  }
`;