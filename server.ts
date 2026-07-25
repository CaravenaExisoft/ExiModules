import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // AI Assistant Analysis endpoint
  app.post("/api/ai/analyze", async (req, res) => {
    try {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        return res.status(500).json({ error: "GEMINI_API_KEY is not configured" });
      }

      const { section, query, dataContext } = req.body;
      const ai = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build",
          },
        },
      });

      const prompt = `
You are the Smart AI Executive Assistant for "Smart Systems" Enterprise Dashboard.
Section focused: ${section || "Executive Overview"}
User Question / Command: ${query}
Context Data: ${JSON.stringify(dataContext || {})}

Provide a concise, highly professional, strategic recommendation or response in Spanish (or the user's language). Include 3 bullet points with actionable insights or next steps.
`;

      const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: prompt,
      });

      res.json({ result: response.text });
    } catch (error: any) {
      console.error("Error calling Gemini API:", error);
      res.status(500).json({ error: error?.message || "Failed to generate AI analysis" });
    }
  });

  // AI Brief / Proposal Generator endpoint
  app.post("/api/ai/brief", async (req, res) => {
    try {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        return res.status(500).json({ error: "GEMINI_API_KEY is not configured" });
      }

      const { projectTitle, clientName, scope } = req.body;
      const ai = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build",
          },
        },
      });

      const prompt = `
Genera un briefing operativo formal de entregables para la sección de Servicios de Smart Systems:
Proyecto: ${projectTitle}
Cliente: ${clientName}
Alcance: ${scope}

Formatea la respuesta en Markdown con:
1. Resumen Ejecutivo
2. Hitos y Entregables Clave
3. Riesgos y Mitigación
4. Indicadores de Éxito (KPIs)
`;

      const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: prompt,
      });

      res.json({ brief: response.text });
    } catch (error: any) {
      console.error("Error generating brief:", error);
      res.status(500).json({ error: error?.message || "Failed to generate brief" });
    }
  });

  // Vite middleware for dev / static for prod
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[Smart Systems Server] listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
