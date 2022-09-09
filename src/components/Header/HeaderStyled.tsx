import styled from "styled-components";

const HeaderStyled = styled.div`
  .header {
    &__logo {
      max-width: 200px;

      @media (min-width: 800px) {
        max-width: 250px;
      }
    }
  }
`;

export default HeaderStyled;
