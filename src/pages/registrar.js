import React, { useState } from "react";
import api from "../api";

const Registrar = () => {
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const [role, setRole] = useState("cliente");
  const [mensagem, setMensagem] = useState("");
  const [mensagemErro, setMensagemErro] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault(); // Prevenir o recarregamento da página

    // Validação da senha (pelo menos 6 caracteres)
    if (senha.length < 6) {
      setMensagemErro("A senha deve ter no mínimo 6 caracteres.");
      return;
    }

    // Log para verificar os dados antes de enviar
    console.log("Enviando dados para o backend:", { usuario, senha, role });

    try {
      // Usando a instância do Axios configurada
      await api.post("/register", {
        usuario,
        senha,
        role,
      });

      // Se o registro for bem-sucedido
      setMensagem("Usuário registrado com sucesso!");
      setMensagemErro(""); // Limpa a mensagem de erro
      setUsuario("");
      setSenha("");
      setRole("cliente");
    } catch (err) {
      console.error(
        "Erro no registro:",
        err.response ? err.response.data : err
      );
      setMensagemErro(
        "Erro ao registrar usuário. Verifique os dados e tente novamente."
      );
      setMensagem(""); // Limpa a mensagem de sucesso
    }
  };

  return (
    <div className="poppins-thin">
      <h2>Registrar</h2>
      <form onSubmit={handleRegister}>
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
        <div>
          <label>Papel: </label>
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="cliente">Cliente</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <button type="submit">Cadastrar</button>
      </form>

      {mensagem && <p style={{ color: "green" }}>{mensagem}</p>}
      {mensagemErro && <p style={{ color: "white" }}>{mensagemErro}</p>}
    </div>
  );
};

export default Registrar;
