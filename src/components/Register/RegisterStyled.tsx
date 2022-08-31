import styled from "styled-components";
import styles from "../../styles/styles";

const RegisterStyled = styled.div`
  min-width: 100vw;
  min-height: 100%;
  padding: 3em;

  .form {
    margin: 0 auto;

    &__group {
      padding: 0 0 2em 0;
    }

    &__heading-container {
      padding: 2em 0;
    }

    &__heading {
      font-weight: ${styles.fontWeights.semiBold};
      font-size: ${styles.fontSizes.medium};
    }

    &__label-container {
      padding: 1em 0;
    }

    &__label {
      font-weight: ${styles.fontWeights.semiBold};
      font-size: ${styles.fontSizes.small};
    }

    &__input {
      background-color: ${styles.colors.grey};
      padding: 1em 0.5em;
      width: 100%;
      border-radius: 0.4em;
      border: none;
      font-size: ${styles.fontSizes.small};
    }

    &__input--wrong {
      border: ${styles.colors.red} solid 0.15em;
    }

    &-check {
      display: none;
      padding: 0 0 2.5em 0;

      &__error--active {
        color: ${styles.colors.red};
        display: block;
      }

      &__success--active {
        color: ${styles.colors.green};
        display: block;
      }
    }

    &__button {
      min-height: 3.25em;
      min-width: 100%;
      margin: 1em 0;
      border-radius: 0.4em;
      border: none;
      cursor: pointer;
      background-color: ${styles.colors.main};
      color: ${styles.colors.white};
      font-family: "Inter", sans-serif;
      font-size: ${styles.fontSizes.small};
      font-weight: ${styles.fontWeights.semiBold};
    }
  }
`;

export default RegisterStyled;
