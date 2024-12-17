import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children, role }) => {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role");

  // Se o usuário não estiver autenticado, redirecione para o login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Se uma role for exigida e não corresponder, redirecione para a página correta
  if (role && userRole !== role) {
    // Verifica se a role é 'cliente' e redireciona corretamente
    if (role === "cliente" && userRole !== "cliente") {
      return <Navigate to="/login" replace />;
    }
    return <Navigate to="/dashboard" replace />;
  }

  // Caso esteja autenticado e com a role correta, renderize o componente
  return children;
};

export default PrivateRoute;
