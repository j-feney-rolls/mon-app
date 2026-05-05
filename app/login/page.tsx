"use client"
import { useState } from "react"
import { supabase } from "@/lib/supabase"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [chargement, setChargement] = useState(false)

  async function seConnecter() {
    setChargement(true)

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: "http://localhost:3000"
      }
    })

    if (error) {
      setMessage("Erreur : " + error.message)
    } else {
      setMessage("Vérifie tes emails — un lien de connexion t'a été envoyé !")
    }

    setChargement(false)
  }

  return (
    <main style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "100vh",
      gap: "16px"
    }}>
      <h1 style={{ fontSize: 24, fontWeight: "bold" }}>Connexion</h1>

      <input
        type="email"
        placeholder="ton@email.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{
          padding: "10px 16px",
          borderRadius: "8px",
          border: "1px solid #e0e0e0",
          fontSize: 16,
          width: 280
        }}
      />

      <button
        onClick={seConnecter}
        disabled={chargement}
        style={{
          background: "#534AB7",
          color: "white",
          border: "none",
          borderRadius: "8px",
          padding: "10px 28px",
          fontSize: 16,
          cursor: "pointer",
          width: 280,
          opacity: chargement ? 0.7 : 1
        }}
      >
        {chargement ? "Envoi en cours..." : "Recevoir un lien de connexion"}
      </button>

      {message && (
        <p style={{ color: "#1D9E75", fontSize: 14, maxWidth: 280, textAlign: "center" }}>
          {message}
        </p>
      )}
    </main>
  )
}
