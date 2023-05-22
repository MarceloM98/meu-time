import { Container } from "./styles";

export function Card({ photo, name, age, nationality }) {
  return (
    <Container>
      <img src={photo} alt={`${name} photo`} />
      <div>
        <h2 id="name">{name}</h2>
        <h2>{age}</h2>
        <h2>{nationality}</h2>
      </div>
    </Container>
  );
}
