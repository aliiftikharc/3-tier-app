import React, { useState } from "react";

function App() {
  const [frequency, setFrequency] = useState(10);
  const [endpoint, setEndpoint] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:5000/start-fetching", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        duration: 60,
        frequency,
        endpoint,
      }),
    });

    if (res.ok) {
      alert("✅ Fetching started!");
    } else {
      alert("❌ Failed to start fetching.");
    }
  };

  const styles = {
    container: {
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "linear-gradient(to right, #232526, #414345)",
      fontFamily: "Segoe UI, sans-serif",
      color: "#fff",
      padding: "20px",
    },
    form: {
      backgroundColor: "#2c2c2c",
      padding: "30px",
      borderRadius: "12px",
      boxShadow: "0 0 15px rgba(255,255,255,0.1)",
      width: "100%",
      maxWidth: "400px",
    },
    heading: {
      textAlign: "center",
      marginBottom: "20px",
    },
    label: {
      display: "block",
      marginBottom: "6px",
      marginTop: "15px",
      textAlign: "left",
      fontWeight: "500",
    },
    input: {
      width: "100%",
      padding: "10px",
      marginBottom: "10px",
      border: "none",
      borderRadius: "6px",
      backgroundColor: "#444",
      color: "#fff",
    },
    button: {
      width: "100%",
      padding: "10px",
      backgroundColor: "#6c63ff",
      color: "#fff",
      border: "none",
      borderRadius: "8px",
      fontWeight: "bold",
      cursor: "pointer",
      marginTop: "20px",
    },
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={styles.heading}>📡 Data Fetcher</h2>

        <label style={styles.label}>Duration (minutes):</label>
        <input type="number" value={60} disabled style={styles.input} />

        <label style={styles.label}>Frequency:</label>
        <input
          type="number"
          value={frequency}
          onChange={(e) => setFrequency(e.target.value)}
          style={styles.input}
        />

        <label style={styles.label}>API Endpoint:</label>
        <input
          type="text"
          value={endpoint}
          onChange={(e) => setEndpoint(e.target.value)}
          required
          style={styles.input}
        />

        <button type="submit" style={styles.button}>
          Start Fetching
        </button>
      </form>
    </div>
  );
}

export default App;