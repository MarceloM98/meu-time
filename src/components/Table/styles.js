import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
`;

export const TableStyled = styled.table`
  width: 100%;
  font-size: 1.5rem;
  line-height: 160%;
  color: #e1e1e6;
  border-collapse: collapse;

  thead {
    background-color: ${({ theme }) => theme.COLORS.BACKGROUND};
  }

  th:first-child {
    border-top-left-radius: 1.2rem;
  }

  th:last-child {
    border-top-right-radius: 1.2rem;
  }

  tbody {
    background-color: ${({ theme }) => theme.COLORS.BACKGROUND_700};
  }

  tr + tr {
    border-top: 1px solid #065e7c;
  }

  td {
    text-align: center;
  }
  @media (min-width: 600px) {
    table {
      font-size: 2rem;
    }
  }
`;
