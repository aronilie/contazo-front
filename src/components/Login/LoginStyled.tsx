import styled from "styled-components";
import styles from "../../styles/styles";

const RegisterStyled = styled.div`
  max-width: 100%;
  min-height: 100%;
  padding: 3em;

  @media (min-width: 800px) {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .form {
    margin: 0 auto;
    max-width: 80vw;

    @media (min-width: 800px) {
      max-width: 100%;
    }

    &__groups {
      @media (min-width: 800px) {
        display: flex;

        flex-flow: row wrap;
        justify-content: center;
        gap: 0 100px;
        align-items: center;
        width: 700px;
      }
    }

    &__group {
      padding: 0 0 2em 0;
    }

    &__heading-container {
      padding: 0 0 2em 0;
      @media (min-width: 800px) {
        padding: 2em 0;
      }
    }

    &__heading {
      font-weight: ${styles.fontWeights.semiBold};
      font-size: ${styles.fontSizes.large};
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

      @media (min-width: 800px) {
        width: 300px;
        background-color: ${styles.colors.white};
        border: ${styles.colors.black} solid 0.05em;
      }
    }

    &-check {
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
      width: 100%;
      margin: 1em 0;
      border-radius: 0.4em;
      border: none;
      cursor: pointer;
      background-color: ${styles.colors.main};
      color: ${styles.colors.white};
      font-family: "Inter", sans-serif;
      font-size: ${styles.fontSizes.small};
      font-weight: ${styles.fontWeights.semiBold};

      @media (min-width: 800px) {
        max-width: 700px;
      }
    }

    &-button__error--active {
      background-color: ${styles.colors.mainAction};
    }
  }
`;

export default RegisterStyled;
