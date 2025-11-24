import {
  GoogleGenerativeAI,
} from "https://esm.run/@google/generative-ai?target=web";

const genAI = new GoogleGenerativeAI("AIzaSyCLYRR7ZLE6sSrq1HsPt-oQZ6caj76L6ug");
const model = genAI.getGenerativeModel({ model: "models/gemini-1.5-flash-latest" });

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

window.consultarIA = consultarIA;
document.getElementById("btn").addEventListener("click", consultarIA);


