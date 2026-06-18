import React, { useState, useEffect, useRef } from "react";

export const TrafficLight = () => {
  const [color, setColor] = useState("green");
  const [showPurple, setShowPurple] = useState(false);
  const intervalRef = useRef(null);

  const nextColor = (current) => {
    if (current === "green") return "yellow";
    if (current === "yellow") return "red";
    if (current === "red") return showPurple ? "purple" : "green";
    return "green";
  };

  const startTimer = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setColor(prevColor => nextColor(prevColor));
    }, 3000);
  };

  const handleChangeLight = () => {
    setColor(prevColor => nextColor(prevColor));
    startTimer();
  };

  const handlePurple = () => {
    if (showPurple) {
      setShowPurple(false);
      setColor("green");
    } else {
      setShowPurple(true);
      setColor("purple");
    }
    startTimer();
  };

  useEffect(() => {
    startTimer();
    return () => clearInterval(intervalRef.current);
  }, [showPurple]);

  const lightStyle = (lightColor, glowColor) => ({
    width: "80px",
    height: "80px",
    borderRadius: "50%",
    margin: "12px auto",
    cursor: "pointer",
    transition: "background 0.2s, box-shadow 0.2s",
    background: color === lightColor ? glowColor : "#2a2a2a",
    boxShadow: color === lightColor ? `0 0 30px 10px ${glowColor}` : "none",
    border: "2px solid #444"
  });

  const buttonStyle = {
    background: "#363636",
    border: "0.5px solid rgba(240, 240, 240, 0.25)",
    color: "#f0f0f0",
    padding: "12px 24px",
    borderRadius: "20px",
    fontSize: "14px",
    fontFamily: "'Doto', sans-serif",
    fontWeight: 500,
    cursor: "pointer"
  };

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "'Doto', sans-serif"
    }}>
      <div style={{
        background: "#363636",
        border: "0.5px solid rgb(187, 187, 187)",
        borderRadius: "20px",
        padding: "32px 40px",
        textAlign: "center"
      }}>
        <div
          style={lightStyle("green", "#3bff6e")}
          onClick={() => { setColor("green"); startTimer(); }}
        />
        <div
          style={lightStyle("yellow", "#ffd93b")}
          onClick={() => { setColor("yellow"); startTimer(); }}
        />
        <div
          style={lightStyle("red", "#ff3b3b")}
          onClick={() => { setColor("red"); startTimer(); }}
        />
        {showPurple && (
          <div
            style={lightStyle("purple", "#b13bff")}
            onClick={() => { setColor("purple"); startTimer(); }}
          />
        )}
      </div>
      <div style={{ display: "flex", gap: "12px", marginTop: "24px" }}>
        <button onClick={handleChangeLight} style={buttonStyle}>
          Cambiar luz
        </button>
        <button onClick={handlePurple} style={buttonStyle}>
          {showPurple ? "Quitar morado" : "Morado"}
        </button>
      </div>
    </div>
  );
};