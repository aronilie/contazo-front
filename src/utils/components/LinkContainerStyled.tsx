import styled from "styled-components";
import styles from "../../styles/styles";

const LinkContainerStyled = styled.div`
  .link {
    &__sign {
      padding: 0 0 0 0.5em;
      color: ${styles.colors.main};
      text-decoration: underline;
      text-decoration-color: ${styles.colors.main};
    }
  }
`;

export default LinkContainerStyled;
