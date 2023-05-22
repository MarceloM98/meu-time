import { Container, TableStyled } from "./styles";

export function Table(info) {
  return (
    <Container>
      <TableStyled>
        <thead>
          <tr>
            <th>Vitórias</th>
            <th>Derrotas</th>
            <th>Empates</th>
            <th>Jogos</th>
          </tr>
        </thead>
        <tbody>
          {info ? (
            <tr>
              <td>{info.info.played.total}</td>
              <td>{info.info.wins.total}</td>
              <td>{info.info.draws.total}</td>
              <td>{info.info.loses.total}</td>
            </tr>
          ) : null}
        </tbody>
      </TableStyled>
    </Container>
  );
}
