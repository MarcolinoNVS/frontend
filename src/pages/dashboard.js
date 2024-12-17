import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          console.log("Token não encontrado");
          navigate("/login");
          return;
        }

        console.log("Token enviado:", token);

        const role = localStorage.getItem("role");

        const apiUrl =
          role === "admin"
            ? "https://marcosnovais.com/api/admin"
            : "https://marcosnovais.com/api/cliente";

        const response = await axios.get(apiUrl, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("Resposta da API:", response.data);

        // Verifique se a resposta é um JSON válido
        if (response.status === 200 && response.data) {
          setUserData(response.data);
        } else {
          setError("Resposta inesperada.");
        }
      } catch (err) {
        console.log("Erro ao fazer a requisição:", err);

        // Verificando erro com código de status 401 ou 403
        if (err.response?.status === 401 || err.response?.status === 403) {
          console.log("Token inválido ou expirado");
          navigate("/login");
        } else {
          setError("Você não tem permissão para acessar esta página.");
        }
      }
    };

    fetchData();
  }, [navigate]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!userData) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="alldashboard-container">
      <h2>Bem-vindo ao Dashboard</h2>
      <p>
        {userData.role === "admin" ? "Painel de Admin" : "Painel de Cliente"}
      </p>
      <p>Nome do usuário: {userData.name}</p>
      <p>Role: {userData.role}</p>
    </div>
  );
};

export default Dashboard;
