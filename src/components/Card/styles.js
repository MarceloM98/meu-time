import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  display: flex;
  padding: 0.8rem;
  flex-direction: column;
  border: 1px solid ${({ theme }) => theme.COLORS.GRAY_100};
  border-radius: 1rem;
  flex-grow: 1;
  background-color: ${({ theme }) => theme.COLORS.BACKGROUND};
  height: 100%;
  > img {
    width: 100%;
    border-radius: 10rem;
  }
  > div {
    margin-top: 1rem;
    text-align: center;
    justify-content: center;
  }
  h2 {
    color: ${({ theme }) => theme.COLORS.WHITE};
  }
  #name {
    color: ${({ theme }) => theme.COLORS.ORANGE};
  }
`;
