import styled from "styled-components";
import { Link } from "react-router-dom";

export const Container = styled.header`
  grid-area: header;

  height: 10.5rem;
  width: 100%;

  border-bottom-width: 0.1rem;
  border-bottom-style: solid;
  border-bottom-color: ${({ theme }) => theme.COLORS.BACKGROUND_700};

  display: flex;
  justify-content: space-between;

  padding: 0 2rem;
  @media (min-width: 768px) {
  }
`;

export const Profile = styled(Link)`
  display: flex;
  align-items: center;

  > img {
    width: 5.6rem;
    height: 5.6rem;
    border-radius: 50%;
  }

  > div {
    display: flex;
    flex-direction: column;
    line-height: 2.4rem;

    span {
      font-size: 1.4rem;
      color: ${({ theme }) => theme.COLORS.GRAY_100};
    }
    strong {
      font-size: 1.8rem;
      color: ${({ theme }) => theme.COLORS.ORANGE};
    }
  }
`;

export const Logout = styled.button`
  border: none;
  background: none;

  > svg {
    color: ${({ theme }) => theme.COLORS.GRAY_100};
    transition: all 0.5s;
    font-size: 36px;
  }
  &:hover {
    > svg {
      color: ${({ theme }) => theme.COLORS.ORANGE};
    }
  }
`;
