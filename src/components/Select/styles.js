import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  max-width: 100%;
`;

export const SelectStyled = styled.select`
  cursor: pointer;
  background-color: #ebe7e4;
  border: none;
  border-radius: 10rem;
  padding: 0.4rem;
  text-align: center;
  width: 100%;
  height: 3rem;
  display: flex;
  flex-wrap: wrap;
  font-size: 1rem;
  > option {
    font-size: 1rem;
  }
  @media (min-width: 600px) {
    font-size: 1.4rem;
    height: 4rem;
    > option {
      font-size: 1.4rem;
    }
  }
  @media (min-width: 1024px) {
    height: 5rem;
    font-size: 1.8rem;
  }
`;
