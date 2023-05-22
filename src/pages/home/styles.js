import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  > button {
    grid-area: button;
  }

  #filtro {
    padding: 2rem 2rem;
    display: grid;
    grid-template-areas:
      "select select"
      "select select"
      "button button";
    gap: 0.8rem;
  }
  @media (min-width: 600px) {
    #filtro {
      display: flex;
      justify-content: center;
    }
  }
`;

export const Table = styled.table`
  margin: 0 auto;
`;
