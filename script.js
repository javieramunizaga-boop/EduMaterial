import { GoogleGenerativeAI } from "https://esm.run/@google/generative-ai";

const genAI = new GoogleGenerativeAI("AIzaSyCfib7Cx_pj9l8sjHtm3biOobmjm0MMUNs");
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

async function consultarIA() {
  const prompt = document.getElementById("input").value;

  const result = await model.generateContent(prompt);
  const response = await result.response.text();

  document.getElementById("respuesta").innerText = response;
}
