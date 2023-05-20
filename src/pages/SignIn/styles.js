import styled from "styled-components";

export const Container = styled.div`
  height: 100vh;

  display: flex;
  align-items: stretch;
`;

export const Form = styled.form`
  margin: 0 auto;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  text-align: center;

  > h1 {
    font-size: 4.8rem;
    color: ${({ theme }) => theme.COLORS.ORANGE};
  }

  > p {
    font-size: 1.4rem;
    color: ${({ theme }) => theme.COLORS.GRAY_100};
  }

  > h2 {
    font-size: 2.4rem;
    margin: 4rem 0;
  }

  > a {
    margin-top: 12.4rem;
    color: ${({ theme }) => theme.COLORS.WHITE};
    font-size: 1.4rem;
  }

  @media (min-width: 1024px) {
    padding: 0 13.5rem;
  }
`;

export const Background = styled.div`
  display: none;
  flex: 1;

  @media (min-width: 1024px) {
    display: block;
    background: url(https://cdn.pixabay.com/photo/2013/10/02/15/00/stadium-189777_1280.jpg)
      no-repeat center center;
    background-size: cover;
  }
`;
