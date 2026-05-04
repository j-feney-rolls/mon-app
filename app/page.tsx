"use client"
import { useState } from "react"

// Ici on déclare les types des props — TypeScript oblige
function CarteProfile({ prenom, role, abonnes }: {
  prenom: string
  role: string
  abonnes: number
}) {
  const [jeSuis, setJeSuis] = useState(false)
  const [compteur, setCompteur] = useState(abonnes)

  function gererClic() {
    if (jeSuis) {
      setJeSuis(false)
      setCompteur(compteur - 1)
    } else {
      setJeSuis(true)
      setCompteur(compteur + 1)
    }
  }

  return (
    <div style={{
      background: "white",
      border: "1px solid #e0e0e0",
      borderRadius: "12px",
      padding: "28px",
      width: "300px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "12px"
    }}>
      <div style={{
        width: 72, height: 72,
        borderRadius: "50%",
        background: "#534AB7",
        color: "white",
        fontSize: 28,
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}>
        {prenom[0]}
      </div>

      <p style={{ fontWeight: "bold" }}>{prenom}</p>
      <p style={{ color: "#888", fontSize: 13 }}>{role}</p>

      <p style={{ fontSize: 17 }}>
        <strong>{compteur}</strong> abonnés
      </p>

      <button
        onClick={gererClic}
        style={{
          background: jeSuis ? "#1D9E75" : "#534AB7",
          color: "white",
          border: "none",
          borderRadius: "8px",
          padding: "9px 28px",
          width: "100%",
          cursor: "pointer"
        }}
      >
        {jeSuis ? "Abonné ✓" : "Suivre"}
      </button>
    </div>
  )
}

export default function Page() {
  return (
    <main style={{
      display: "flex",
      gap: "24px",
      padding: "48px",
      justifyContent: "center"
    }}>
      <CarteProfile prenom="Marie" role="Dev front-end" abonnes={2400} />
      <CarteProfile prenom="Paul" role="Designer" abonnes={890} />
      <CarteProfile prenom="Léa" role="Product Manager" abonnes={1200} />
    </main>
  )
}