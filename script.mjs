import {

  GoogleGenerativeAI,

} from "https://esm.run/@google/generative-ai?target=web";
 
const API_KEY = "AIzaSyBa2YOTYsW1-f4c2N3Umd3ARYqLeVxxEp4";

const genAI = new GoogleGenerativeAI(API_KEY);
 
// 👇 Cambiamos al modelo actual

const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
 
// Instrucciones del sistema

const INSTRUCCIONES = `

Eres EduMaterial, un asistente que genera listas de materiales (BOM) y recursos para cursos.

Sigue estas reglas:

- Organiza materiales por categorías.

- Entrega cantidades y sugerencias.

- Si falta información, pregunta.

`;
 
async function consultarIA() {

  const entrada = document.getElementById("input").value;

  const respuestaDiv = document.getElementById("respuesta");
 
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

    console.error("Error en consultarIA:", err);

    respuestaDiv.innerText = "Error al generar la respuesta.";

  }

}
 
window.consultarIA = consultarIA;

document.getElementById("btn").addEventListener("click", consultarIA);
 
 

