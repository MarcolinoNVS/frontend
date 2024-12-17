import React, { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("Tentando fazer login com:", { usuario, senha });

    try {
      // Usando a instância do Axios configurada
      const response = await api.post("/login", { usuario, senha });

      console.log("Resposta da API:", response.data);

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("role", response.data.role);

      if (response.data.role === "admin") {
        navigate("/dashboard");
      } else if (response.data.role === "cliente") {
        navigate("/cliente");
      }
    } catch (err) {
      console.error("Erro na requisição:", err);
      setError("Erro ao conectar com o servidor.");
    }
  };

  const handleRegisterRedirect = () => {
    navigate("/registrar");
  };

  return (
    <div className="poppins-thin">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Usuário:</label>
          <input
            type="text"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Senha:</label>
          <input
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
        </div>
        <button type="submit">Entrar</button>
        <button type="button" onClick={handleRegisterRedirect}>
          Cadastrar
        </button>
      </form>

      {error && <p style={{ color: "white" }}>{error}</p>}
    </div>
  );
};

export default Login;
