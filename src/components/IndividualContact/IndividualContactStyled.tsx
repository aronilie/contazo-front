import styled from "styled-components";
import styles from "../../styles/styles";

const IndividualContactStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.9em 0;
  border-bottom: 3px solid ${styles.colors.grey};

  @media (min-width: 800px) {
    border-bottom: none;
    padding: 0;
  }

  .contact {
    &__text {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    &__image {
      width: 50px;
      height: 50px;
      object-fit: cover;
      border-radius: 100%;
      margin: 0 1.7em 0 0;
    }

    &__fullname {
      flex: 2;
    }

    &__name {
      color: ${styles.colors.black};
      font-weight: ${styles.fontWeights.semiBold};
      font-size: ${styles.fontSizes.small};
      padding: 0 0.5em 0 0;

      @media (min-width: 800px) {
        font-weight: ${styles.fontWeights.regular};
      }
    }

    &__surname {
      color: ${styles.colors.black};
      font-weight: ${styles.fontWeights.semiBold};
      font-size: ${styles.fontSizes.small};

      @media (min-width: 800px) {
        font-weight: ${styles.fontWeights.regular};
      }
    }

    &__email {
      display: none;
      flex: 2;
      @media (min-width: 800px) {
        display: block;
        color: ${styles.colors.black};
        font-weight: ${styles.fontWeights.regular};
        font-size: ${styles.fontSizes.small};
        padding: 1.5em 2em;
      }
    }

    &__phoneNumber {
      display: none;
      flex: 1.16;
      text-align: left;
      @media (min-width: 800px) {
        display: block;
        color: ${styles.colors.black};
        font-weight: ${styles.fontWeights.regular};
        font-size: ${styles.fontSizes.small};
      }
    }

    &__icon {
      font-size: ${styles.fontSizes.large};
      padding: 0 1em;
    }
  }
`;

export default IndividualContactStyled;
