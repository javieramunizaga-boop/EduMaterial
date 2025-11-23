import { GoogleGenerativeAI } from "https://esm.run/@google/generative-ai";

// ⚠️ Reemplaza con tu propia API KEY (y luego la protegeremos)
const genAI = new GoogleGenerativeAI("AIzaSyCfib7Cx_pj9l8sjHtm3biOobmjm0MMUNs");
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

// Instrucciones del sistema: aquí va TODO lo que definiste en AI Studio
const INSTRUCCIONES = `
Eres CursoKit, un asistente especializado en generar listas de materiales,
presupuestos y BOM para cursos SENCE o cursos internos de OTEC.

Sigue estas reglas:
- Entrega respuestas claras, ordenadas y accionables.
- Organiza materiales por categorías.
- Si el usuario menciona un curso, genera la lista completa con cantidades.
- Si el usuario menciona proveedores, sugiere precios estimados.
- Si falta información, pregunta.
- Nunca inventes valores reales de proveedores; usa rangos estimados.

(🟦 Aquí luego copiaremos TODO tu prompt real de AI Studio)
`;

async function consultarIA() {
  const promptUsuario = document.getElementById("input").value;
  const outputDiv = document.getElementById("respuesta");

  if (!promptUsuario.trim()) {
    outputDiv.innerText = "Por favor escribe una consulta.";
    return;
  }

  outputDiv.innerText = "Generando respuesta… (unos segundos)";

  try {
    const result = await model.generateContent(INSTRUCCIONES + "\n\n" + promptUsuario);
    const response = await result.response.text();

    outputDiv.innerText = response;

  } catch (error) {
    console.error("Error en la IA:", error);
    outputDiv.innerText = "Ocurrió un error al generar la respuesta. Intenta nuevamente.";
  }
}

