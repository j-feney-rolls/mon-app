"use client"
import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"

type Profil = {
  id: string
  prenom: string
  role: string
  abonnes: number
}

function CarteProfile({ prenom, role, abonnes }: Profil) {
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
  const [profils, setProfils] = useState<Profil[]>([])
  const [chargement, setChargement] = useState(true)
  const [erreur, setErreur] = useState("")

  useEffect(() => {
    async function chargerProfils() {
      console.log("Début du chargement...")

      const { data, error } = await supabase
        .from("profils")
        .select("*")

      console.log("data :", data)
      console.log("error :", error)

      if (error) {
        setErreur("Erreur : " + error.message)
      } else {
        setProfils(data || [])
      }

      setChargement(false)
    }

    chargerProfils()
  }, [])

  if (chargement) return (
    <p style={{ padding: 48, fontFamily: "sans-serif" }}>
      Chargement...
    </p>
  )

  if (erreur) return (
    <p style={{ padding: 48, fontFamily: "sans-serif", color: "red" }}>
      {erreur}
    </p>
  )

  if (profils.length === 0) return (
    <p style={{ padding: 48, fontFamily: "sans-serif" }}>
      Aucun profil trouvé.
    </p>
  )

  return (
    <main style={{
      display: "flex",
      gap: "24px",
      padding: "48px",
      justifyContent: "center",
      flexWrap: "wrap"
    }}>
      {profils.map((profil) => (
        <CarteProfile
          key={profil.id}
          id={profil.id}
          prenom={profil.prenom}
          role={profil.role}
          abonnes={profil.abonnes}
        />
      ))}
    </main>
  )
}