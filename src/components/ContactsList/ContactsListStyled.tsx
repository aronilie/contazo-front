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

  .header {
    display: flex;
    justify-content: space-between;
  }

  .button-create {
    min-width: 150px;
    min-height: 2.5em;

    @media (min-width: 800px) {
      min-height: 2.8em;
      min-width: 200px;
    }
  }

  .link-create {
    @media (min-width: 800px) {
      padding: 0 24px 0 0;
    }
  }
`;

export const ListContainerStyled = styled.div`
  @media (min-width: 800px) {
    margin: 0 1em;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
  }

  .list {
    @media (min-width: 800px) {
      width: 800px;
    }
  }

  .text-container {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .main-text {
    margin: 5em 0 0 0;
  }
`;
