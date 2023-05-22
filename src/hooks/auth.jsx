import { createContext, useContext, useState, useEffect } from "react";
import { api } from "../services/api";

export const AuthContext = createContext({});

function AuthProvider({ children }) {
  const [data, setData] = useState({});

  async function signIn({ apiKey }) {
    try {
      const response = await api.get("/status", {
        headers: {
          "x-apisports-key": apiKey,
        },
      });
      if (response.data.results != 1) {
        throw new Error();
      }

      const user = response.data.response.account;

      localStorage.setItem("@meuTime:user", JSON.stringify(user));
      localStorage.setItem("@meuTime:token", apiKey);

      api.defaults.headers.common["x-apisports-key"] = apiKey;
      setData({ user });
    } catch (e) {
      alert("erro");
      console.log(e);
    }
  }

  function signOut() {
    localStorage.removeItem("@meuTime:user");
    localStorage.removeItem("@meuTime:token");

    setData({});
  }

  useEffect(() => {
    const user = localStorage.getItem("@meuTime:user");
    const token = localStorage.getItem("@meuTime:token");

    if (token && user) {
      api.defaults.headers.common["x-apisports-key"] = token;

      setData({
        token,
        user: JSON.parse(user),
      });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ signIn, user: data.user, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);

  return context;
}

export { AuthProvider, useAuth };
