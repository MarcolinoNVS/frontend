// src/api.js
import axios from "axios";

// Usando a variável de ambiente para a URL da API
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "https://aws.marcosnovais.com", // Aqui você coloca o seu URL
});

export default api;
