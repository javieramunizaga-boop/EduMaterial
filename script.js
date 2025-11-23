import { GoogleGenerativeAI } from "https://esm.run/@google/generative-ai";

const genAI = new GoogleGenerativeAI("AIzaSyCfib7Cx_pj9l8sjHtm3biOobmjm0MMUNs");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// Instrucciones del sistema
const INSTRUCCIONES = `
Eres EduMaterial, un asistente que genera listas de materiales (BOM) y recursos para cursos.
Sigue estas reglas:
- Organiza materiales por categorías.
- Entrega cantidades y sugerencias.
- Si falta información, pregunta.
`;

async function consultarIA() {
  const entrada = document.getElementById('input').value;
  const respuestaDiv = document.getElementById('respuesta');

  if (!entrada.trim()) {
    respuestaDiv.innerText = "Escribe una consulta.";
    return;
  }

  respuestaDiv.innerText = "Generando respuesta...";

  try {
    const result = await model.generateContent(INSTRUCCIONES + "\n\n" + entrada);
    const texto = await result.response.text();
    respuestaDiv.innerText = texto;

  } catch (err) {
    console.error(err);
    respuestaDiv.innerText = "Error al generar la respuesta.";
  }
}

// 🔥 HACER LA FUNCIÓN VISIBLE AL HTML
window.consultarIA = consultarIA;

// 🔥 CONECTAR EL BOTÓN SIN onClick en HTML
document.getElementById("btn").addEventListener("click", consultarIA);

