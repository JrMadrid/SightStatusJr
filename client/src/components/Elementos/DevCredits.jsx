/* COMPONENTE DE ELEMENTO DE CREDITOS AL DESARROLLADOR */
import { useState } from "react";
import { FaDev, FaLinkedin, FaGithub } from "react-icons/fa";

export default function DevCredits() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* BOTÓN FLOTANTE */}
      <button
        onClick={() => setOpen(!open)}
        title="Créditos del sistema"
        style={{
          position: "fixed",
          bottom: 4,
          right: 4,
          width: 40,
          height: 40,
          paddingTop: "3px",
          borderRadius: 8,
          background: "#0f172a",
          color: "#ffffff",
          border: "none",
          cursor: "pointer",
          boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
          animation: "softPulse 4s ease-in-out infinite",
          zIndex: 9999,
        }}
      >
        <FaDev size={20} />
      </button>

      {/* PANEL HORIZONTAL */}
      {open && (
        <div
          style={{
            position: "fixed",
            bottom: 4,
            right: 50, // se abre hacia la izquierda
            height: 40,
            maxWidth: "50vw", // media pantalla
            padding: "0 16px",
            display: "flex",
            alignItems: "center",
            gap: 14,
            background: "#000716",
            color: "#e5e7eb",
            borderRadius: 10,
            boxShadow: "0 10px 25px rgba(0,0,0,0.45)",
            zIndex: 9998,
            whiteSpace: "nowrap",
          }}
        >
          <strong style={{ color: "#ffaf90" }}>CoreSightJr</strong>

          <span>Desarrollado por <strong>Juan Ramón Madrid</strong></span>

          <a
            href="https://www.linkedin.com/in/jrmadridm99"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 4,
              color: "#afdbf6",
              textDecoration: "none",
              fontSize: 13,
            }}
          >
            <FaLinkedin /> in/jrmadridm99
          </a>

          <a
            href="https://github.com/JrMadrid"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 4,
              color: "#afdbf6",
              textDecoration: "none",
              fontSize: 13,
            }}
          >
            <FaGithub /> JrMadrid
          </a>
        </div>
      )}
    </>
  );
};