import { useState } from "react";
import { Link } from "react-router-dom";
import { FiKey } from "react-icons/fi";

import { Container, Form, Background } from "./styles";
import { useAuth } from "../../hooks/auth";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";

export function SignIn() {
  const [apiKey, setApiKey] = useState("");

  const { signIn } = useAuth();

  function handleSignIn() {
    signIn({ apiKey });
  }
  return (
    <Container>
      <Form>
        <h1>Meu Time</h1>
        <p>Aplicação para saber tudo sobre futebol</p>

        <h2>Faça seu login</h2>

        <Input
          placeholder="API key"
          type="password"
          icon={FiKey}
          onChange={(e) => setApiKey(e.target.value)}
        />

        <Button title="Entrar" onClick={handleSignIn} />

        <a href="https://dashboard.api-football.com/register" target="_blank" rel="noopener noreferrer">Cadastre-se aqui</a>
      </Form>
      <Background />
    </Container>
  );
}
