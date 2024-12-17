import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/home";
import Contact from "./pages/contact";
import Projects from "./pages/Projects";
import Login from "./pages/login";
import Dashboard from "./pages/dashboard";
import React, { useState, useEffect } from "react";
import "./App.css";
import "./index.css";
import backgroundImage from "./assets/fundoback.jpg";
import backgroundImageMobile from "./assets/fundoback.jpg";
import Cliente from "./pages/Cliente";
import PrivateRoute from "./components/PrivateRoute";
import Registrar from "./pages/registrar";

const App = () => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [touchPosition, setTouchPosition] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      if (window.innerWidth <= 768) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    setCursorPosition({ x: clientX, y: clientY });
  };

  const handleTouchMove = (e) => {
    const { clientX, clientY } = e.touches[0];
    setTouchPosition({ x: clientX, y: clientY });
  };

  const { x, y } = isMobile ? touchPosition : cursorPosition;
  const xPos = (x / window.innerWidth) * 100;
  const yPos = (y / window.innerHeight) * 100;

  return (
    <Router>
      <div
        className="app"
        style={{
          backgroundImage: `url(${
            isMobile ? backgroundImageMobile : backgroundImage
          })`,
          backgroundSize: "cover",
          backgroundPosition: `${xPos}% ${yPos}%`,
          backgroundRepeat: "no-repeat",
          minHeight: "100vh",
          color: "#fff",
          transition: "background-position 0.1s ease-out",
        }}
        onMouseMove={isMobile ? null : handleMouseMove}
        onTouchMove={isMobile ? handleTouchMove : null}
      >
        <Header />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registrar" element={<Registrar />} />

            {/* Rotas protegidas */}
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/cliente"
              element={
                <PrivateRoute>
                  <Cliente />
                </PrivateRoute>
              }
            />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
