import styled from "styled-components";
import styles from "../../styles/styles";

const IndividualContactStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1em 0;

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

    &__name {
      color: ${styles.colors.black};
      font-weight: ${styles.fontWeights.semiBold};
      font-size: ${styles.fontSizes.small};
      padding: 0 0.5em 0 0;
    }

    &__surname {
      color: ${styles.colors.black};
      font-weight: ${styles.fontWeights.semiBold};
      font-size: ${styles.fontSizes.small};
    }

    &__email {
      color: ${styles.colors.black};
      font-weight: ${styles.fontWeights.regular};
      font-size: ${styles.fontSizes.small};
      padding: 2em;
    }

    &__phoneNumber {
      color: ${styles.colors.black};
      font-weight: ${styles.fontWeights.regular};
      font-size: ${styles.fontSizes.small};
    }

    &__icon {
      font-size: ${styles.fontSizes.extraLarge};
      padding: 0 1em;
    }
  }
`;

export default IndividualContactStyled;
