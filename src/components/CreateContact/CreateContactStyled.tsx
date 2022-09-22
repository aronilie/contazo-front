import styled from "styled-components";
import styles from "../../styles/styles";

const CreateContactStyled = styled.div`
  width: 100%;
  height: 100%;
  padding: 1em;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (min-width: 800px) {
    padding: 3em;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-content: center;
  }

  .container {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;

    @media (min-width: 800px) {
      max-width: 900px;
    }
  }

  .title {
    width: 100%;
  }

  .form {
    margin: 0;
    max-width: 100%;
    width: 100%;

    @media (min-width: 800px) {
      max-width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    &-half {
      @media (min-width: 800px) {
        width: 100%;
        display: flex;
        justify-content: space-between;
        gap: 2em;
      }
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

      @media (min-width: 800px) {
        width: 350px;
        padding: 0 0 4em 0;
      }
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
        background-color: ${styles.colors.white};
        border: ${styles.colors.black} solid 0.05em;
      }

      &:focus {
        outline: ${styles.colors.black} solid 2px;

        @media (min-width: 800px) {
          outline: ${styles.colors.black} solid 1.9px;
        }
      }
    }

    &__input--wrong {
      border: ${styles.colors.red} solid 0.15em;
    }

    &-phone {
      display: none;
      padding: 0 0 2.5em 0;

      &__error--active {
        color: ${styles.colors.red};
        display: block;
      }
    }

    &-email {
      display: none;
      padding: 0 0 2.5em 0;

      &__error--active {
        color: ${styles.colors.red};
        display: block;
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
      background-color: ${styles.colors.mainAction};
      cursor: default;

      @media (min-width: 800px) {
        max-width: 400px;
      }
    }
  }

  .form-button--active {
    background-color: ${styles.colors.main};
    cursor: pointer;
  }

  .form-third {
    display: flex;
    flex-direction: column;
    margin: 0 0 1em 0;

    @media (min-width: 800px) {
      width: 100%;
    }
  }

  .file {
    &-upload {
      display: none;
    }

    &-text {
      color: ${styles.colors.black};
      font-size: ${styles.fontSizes.small};
      font-weight: ${styles.fontWeights.semiBold};
      padding: 1em 0;
    }

    &-container {
      display: flex;
      align-items: center;
      gap: 1em;
    }

    &-content {
      width: 12em;
      height: 3em;
      background-color: ${styles.colors.main};
      border-radius: 0.5em;
    }

    &-image {
      font-size: ${styles.fontSizes.medium};
      color: ${styles.colors.white};
      font-weight: ${styles.fontWeights.semiBold};
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
    }
  }

  .header {
    display: flex;
    gap: 2em;
    justify-content: center;
    align-items: center;

    &__icon {
      cursor: pointer;
    }
  }
`;

export default CreateContactStyled;
