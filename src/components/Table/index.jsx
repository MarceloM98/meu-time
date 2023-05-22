import { useEffect, useState } from "react";
import { Container, TableStyled } from "./styles";

export function Table(info) {
  const [played, setPlayed] = useState();
  const [wins, setWins] = useState();
  const [draws, setDraws] = useState();
  const [loses, setLoses] = useState();

  useEffect(() => {
    setPlayed(info.info.played.total);
    setWins(info.info.wins.total);
    setDraws(info.info.draws.total);
    setLoses(info.info.loses.total);
  }, []);

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
              <td>{wins}</td>
              <td>{draws}</td>
              <td>{loses}</td>
              <td>{played}</td>
            </tr>
          ) : null}
        </tbody>
      </TableStyled>
    </Container>
  );
}
