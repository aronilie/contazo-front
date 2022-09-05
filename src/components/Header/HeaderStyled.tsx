import styled from "styled-components";

const HeaderStyled = styled.div`
  padding: 3em 3em 0 3em;

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
