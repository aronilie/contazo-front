import styled from "styled-components";
import styles from "../../styles/styles";

const IndividualContactStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.6em 0;
  border-bottom: 2px solid ${styles.colors.grey};
  transition: transform 0.3s;

  :hover {
    transform: scale(1.01);
    background-color: ${styles.colors.grey};
  }

  @media (min-width: 800px) {
    border-bottom: none;
    padding: 0;
    height: 75px;
  }

  .contact {
    &__text {
      width: 100%;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: space-between;

      @media (min-width: 800px) {
        height: 100%;
      }
    }
    &__image {
      width: 40px;
      height: 40px;
      object-fit: cover;
      border-radius: 100%;
      margin: 0 1.7em 0 0;
    }

    &__fullname {
      flex: 2;
    }

    &__name {
      color: ${styles.colors.black};
      font-weight: ${styles.fontWeights.regular};
      font-size: ${styles.fontSizes.smally};
      padding: 0 0.5em 0 0;

      @media (min-width: 800px) {
        font-weight: ${styles.fontWeights.regular};
        font-size: ${styles.fontSizes.small};
      }
    }

    &__surname {
      color: ${styles.colors.black};
      font-weight: ${styles.fontWeights.regular};
      font-size: ${styles.fontSizes.smally};

      @media (min-width: 800px) {
        font-weight: ${styles.fontWeights.regular};
        font-size: ${styles.fontSizes.small};
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
        padding: 1.5em 0;
      }
    }

    &__phoneNumber {
      display: none;
      flex: 1.12;
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

  .icon {
    cursor: pointer;
  }
`;

export default IndividualContactStyled;
