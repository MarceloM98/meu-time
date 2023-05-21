import { RiShutDownLine } from "react-icons/ri";
import { useAuth } from "../../hooks/auth";
import { Container, Profile, Logout } from "./style";

export function Header() {
  const { signOut, user } = useAuth();

  
  return (
    <Container>
      <Profile to="/profile">
        <div>
          <span>Bem-vindo</span>
          <strong>{user.firstname} {user.lastname}</strong>
        </div>
      </Profile>

      <Logout onClick={signOut}>
        <RiShutDownLine />
      </Logout>
    </Container>
  );
}
