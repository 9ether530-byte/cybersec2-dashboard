"use client";

import { useState, useEffect } from "react";

interface Threat {
  id: string;
  name: string;
  severity: "critical" | "high" | "medium" | "low";
  status: "active" | "contained" | "eliminated";
  source: string;
  timestamp: Date;
}

export default function Home() {
  const [threats, setThreats] = useState<Threat[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const mockThreats: Threat[] = [
      { id: "1", name: "SQL Injection Attempt", severity: "critical", status: "active", source: "192.168.1.105", timestamp: new Date() },
      { id: "2", name: "Brute Force Login", severity: "high", status: "contained", source: "10.0.0.23", timestamp: new Date() },
      { id: "3", name: "Suspicious File Upload", severity: "medium", status: "eliminated", source: "172.16.0.45", timestamp: new Date() },
      { id: "4", name: "Port Scan Detected", severity: "low", status: "active", source: "203.0.113.12", timestamp: new Date() },
    ];
    
    setTimeout(() => {
      setThreats(mockThreats);
      setLoading(false);
    }, 1000);
  }, []);

  const getSeverityColor = (severity: string) => {
    switch(severity) {
      case "critical": return "#ff4444";
      case "high": return "#ff8844";
      case "medium": return "#ffaa00";
      case "low": return "#44aaff";
      default: return "#888888";
    }
  };

  return (
    <main style={{ minHeight: "100vh", background: "#0a0e1a", color: "#ffffff", padding: "20px", fontFamily: "system-ui, sans-serif" }}>
      <header style={{ borderBottom: "1px solid #1a2744", paddingBottom: "20px", marginBottom: "30px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <h1 style={{ fontSize: "32px", fontWeight: "bold", background: "linear-gradient(135deg, #00ff88, #00ccff)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", margin: 0 }}>
              CYBERSEC 2.0
            </h1>
            <p style={{ color: "#666", margin: "5px 0 0 0" }}>Autonomous Defense System</p>
          </div>
          <div style={{ color: "#00ff88", fontSize: "14px", fontFamily: "monospace" }}>
            STATUS: ONLINE | NODES: 24 ACTIVE
          </div>
        </div>
      </header>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "20px", marginBottom: "30px" }}>
        {[
          { label: "Active Threats", value: "12", color: "#ff4444" },
          { label: "Honeypots", value: "156", color: "#00ccff" },
          { label: "Blocked Today", value: "1,247", color: "#00ff88" },
          { label: "Uptime", value: "99.97%", color: "#ffaa00" },
        ].map((stat, i) => (
          <div key={i} style={{ background: "#111827", border: "1px solid #1f2937", borderRadius: "8px", padding: "20px" }}>
            <div style={{ color: "#666", fontSize: "12px", textTransform: "uppercase" }}>{stat.label}</div>
            <div style={{ fontSize: "28px", fontWeight: "bold", color: stat.color }}>{stat.value}</div>
          </div>
        ))}
      </div>

      <section>
        <h2 style={{ fontSize: "18px", marginBottom: "15px", color: "#ccc" }}>Live Threat Feed</h2>
        
        {loading ? (
          <div style={{ textAlign: "center", padding: "40px", color: "#666" }}>Loading threat data...</div>
        ) : (
          <div style={{ background: "#111827", border: "1px solid #1f2937", borderRadius: "8px", overflow: "hidden" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: "#1a2332", color: "#888", fontSize: "12px", textTransform: "uppercase" }}>
                  <th style={{ padding: "12px", textAlign: "left" }}>Threat</th>
                  <th style={{ padding: "12px", textAlign: "left" }}>Severity</th>
                  <th style={{ padding: "12px", textAlign: "left" }}>Source IP</th>
                  <th style={{ padding: "12px", textAlign: "left" }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {threats.map((threat) => (
                  <tr key={threat.id} style={{ borderTop: "1px solid #1f2937" }}>
                    <td style={{ padding: "12px" }}>{threat.name}</td>
                    <td style={{ padding: "12px" }}>
                      <span style={{ 
                        display: "inline-block", 
                        padding: "4px 8px", 
                        borderRadius: "4px", 
                        fontSize: "11px",
                        background: getSeverityColor(threat.severity) + "22",
                        color: getSeverityColor(threat.severity)
                      }}>
                        {threat.severity.toUpperCase()}
                      </span>
                    </td>
                    <td style={{ padding: "12px", fontFamily: "monospace", color: "#00ccff" }}>{threat.source}</td>
                    <td style={{ padding: "12px" }}>
                      <span style={{ 
                        color: threat.status === "active" ? "#ff4444" : threat.status === "contained" ? "#ffaa00" : "#00ff88"
                      }}>
                        {threat.status.toUpperCase()}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <footer style={{ marginTop: "50px", borderTop: "1px solid #1a2744", paddingTop: "20px", textAlign: "center", color: "#444", fontSize: "12px" }}>
        CyberSec 2.0 Autonomous Defense System | AI-Powered Security Operations Center
      </footer>
    </main>
  );
}
