import styled from "styled-components";
import styles from "../../styles/styles";

const DetailContactStyled = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;

  .container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 3em 0 0 0;
    gap: 1.3em;

    @media (min-width: 800px) {
      width: 900px;
      gap: 3em;
    }

    .header {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 1.7em;

      @media (min-width: 800px) {
        flex-direction: row;
      }

      &__image {
        width: 12em;
        height: 12em;
        object-fit: cover;
        border-radius: 100%;
      }

      &__fullname {
        display: flex;
        gap: 0.6em;

        @media (min-width: 800px) {
          flex-direction: column;
          gap: 1em;
        }

        &-name {
          font-size: ${styles.fontSizes.large};
          font-weight: ${styles.fontWeights.semiBold};

          @media (min-width: 800px) {
            font-size: ${styles.fontSizes.extraLarge};
          }
        }
      }
    }

    .line {
      width: 100%;
      height: 1.95px;
      background-color: ${styles.colors.black};
    }

    .information {
      display: flex;
      flex-direction: column;
      width: 100%;
      gap: 2.5em;

      @media (min-width: 800px) {
        flex-direction: row;
        justify-content: space-between;
        gap: 6em;
      }
    }

    .section {
      display: flex;
      flex-direction: column;
      gap: 1.4em;

      @media (min-width: 800px) {
        width: 100%;
        gap: 2em;
      }

      &__title {
        font-size: ${styles.fontSizes.large};
        font-weight: ${styles.fontWeights.semiBold};
        text-align: left;
      }
    }

    .feature {
      display: flex;
      justify-content: space-between;
      align-items: center;

      &__information {
        display: flex;
        flex-direction: column;
        gap: 0.3em;

        &-main {
          font-size: ${styles.fontSizes.small};
          font-weight: ${styles.fontWeights.semiBold};
        }

        &-text {
          font-size: ${styles.fontSizes.smally};
          font-weight: ${styles.fontWeights.regular};
        }
      }
    }

    .icon {
      &__element {
        object-fit: cover;
        width: 2.7em;
        height: 2.7em;
      }
    }

    .buttons {
      display: flex;
      flex-direction: column;
      width: 100%;

      &__bad {
        background-color: ${styles.colors.red};
      }

      &__container {
        @media (min-width: 800px) {
          display: flex;
          gap: 7em;
        }
      }

      &__default {
        flex: 1;
      }

      &__link {
        flex: 1;
      }
    }
  }
`;

export default DetailContactStyled;
