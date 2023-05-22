import { Container, SelectStyled } from "./styles";

export function Select({ info, disabled = true, title, ...rest }) {
  return (
    <Container>
      <SelectStyled disabled={disabled} {...rest} defaultValue={"/"}>
        <option value="/" disabled>
          {title}
        </option>
        {info
          ? info.map((data, index) => (
              <option key={index} value={data.id ?? data.name}>
                {data.name} {data.code ? `- ${data.code}` : ""}
              </option>
            ))
          : null}
      </SelectStyled>
    </Container>
  );
}
