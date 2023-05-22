import { useState } from "react";
import { Container, TableStyled } from "./styles";

export function Table(info) {
  const [played, setPlayed] = useState();
  const [wins, setWins] = useState();
  const [draws, setDraws] = useState();
  const [loses, setLoses] = useState();

  function calculate(result) {
    let sum = 0;
    for (const [, value] of Object.entries(result)) {
      sum += value;
    }
    return sum;
  }

  function calculatePlayed() {
    const sum = calculate(info.info.played);
    setPlayed(sum);
  }
  function calculateWins() {
    const sum = calculate(info.info.wins);
    setWins(sum);
  }
  function calculateDraws() {
    const sum = calculate(info.info.draws);
    setDraws(sum);
  }
  function calculateLoses() {
    const sum = calculate(info.info.loses);
    setLoses(sum);
  }

  useState(() => {
    console.log(info);
    calculatePlayed();
    calculateWins();
    calculateDraws();
    calculateLoses();
  }, []);

  return (
    <Container>
      <TableStyled>
        <thead>
          <tr>
            <th>Jogos</th>
            <th>Vitórias</th>
            <th>Derrotas</th>
            <th>Empates</th>
          </tr>
        </thead>
        <tbody>
          {info ? (
            <tr>
              <td>{played}</td>
              <td>{wins}</td>
              <td>{draws}</td>
              <td>{loses}</td>
            </tr>
          ) : null}
        </tbody>
      </TableStyled>
    </Container>
  );
}
