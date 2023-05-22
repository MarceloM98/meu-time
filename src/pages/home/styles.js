import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  > button {
    grid-area: button;
  }

  #filtro {
    padding: 2rem 2rem;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-areas:
      "select select"
      "select select";
    gap: 0.8rem;
    border-bottom-width: 0.1rem;
    border-bottom-style: solid;
    border-bottom-color: ${({ theme }) => theme.COLORS.BACKGROUND_700};
  }

  main {
    flex-grow: 1;
    margin-top: 2rem;
    h1 {
      text-align: center;
      text-decoration-line: underline;
      font-size: 3rem;
      color: ${({ theme }) => theme.COLORS.ORANGE};
    }
  }
  .team-card-wrapper {
    margin-top: 1rem;
    display: flex;
    padding: 2rem;
    flex-wrap: wrap;
    justify-content: space-around;
    gap: 1rem;

    > div {
      width: 45%;
    }
  }

  .team-wrapper {
    margin-bottom: 0.1rem solid ${({ theme }) => theme.COLORS.BACKGROUND_700};
  }

  #sub-title-default {
    margin-top: 1rem;
    text-align: center;
    color: ${({ theme }) => theme.COLORS.WHITE};
  }

  #layout-default {
    display: flex;
    height: 100%;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  #info-card {
    margin: 1rem auto;
    width: 90%;
    border-radius: 2rem;
    padding: 2rem;
    background-color: ${({ theme }) => theme.COLORS.BACKGROUND};
    h2 {
      text-align: center;
      font-size: 2rem;
      color: ${({ theme }) => theme.COLORS.ORANGE};
    }
    h3 {
      text-align: center;
      margin: 1rem 0;
      font-size: 2rem;
    }
    p {
      text-align: center;
      font-size: 1.5rem;
    }
  }
  #title-Estatisticas {
    padding: 3rem;
    text-align: center;
    margin-top: 0.1rem solid ${({ theme }) => theme.COLORS.GRAY_100};
    margin-bottom: 0.1rem solid ${({ theme }) => theme.COLORS.GRAY_100};
  }

  .table-wrapper {
    margin: 1.5rem;
  }

  #canvas-div {
    display: flex;
    width: 80%;
    min-height: 30rem;
    margin: 0 auto;
    justify-content: center;
  }
  #acquisitions {
    border: 1px solid black;
  }

  @media (min-width: 600px) {
    #filtro {
      display: flex;
      justify-content: center;
    }
    .team-card-wrapper {
      > div {
        width: 23%;
      }
    }
    #canvas-div {
      min-height: 35rem;
    }
  }
  @media (min-width: 1024px) {
    .team-card-wrapper {
      > div {
        width: 15%;
      }
    }
    #canvas-div {
      width: 70%;
      margin: 0 auto;
      min-height: 40rem;
    }
  }
`;
