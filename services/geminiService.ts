
import { GoogleGenAI, Type } from "@google/genai";
import { OduInfo } from "../types";

export const fetchOduContent = async (left: string, right: string): Promise<OduInfo> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  
  const isMeji = left === right;
  // O Odú da direita vem antes na nomenclatura
  const oduName = isMeji ? `${right} Meji` : `${right} ${left}`;
  
  const prompt = `Atue como um Babalaô experiente e profundo conhecedor do corpus de Ifá. 
    Escreva sobre o Odù: ${oduName}. 
    Forneça um resumo detalhado do mito/história (Itan) associado, 
    conselhos espirituais práticos para o dia a dia, 
    pelo menos 5 características principais de quem nasce sob esse Odù, 
    seus elementos (água, fogo, terra, ar) e uma saudação tradicional.
    Use um tom respeitoso, místico e acolhedor.`;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: [{ parts: [{ text: prompt }] }],
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          nome: { type: Type.STRING },
          resumo: { type: Type.STRING },
          conselho: { type: Type.STRING },
          caracteristicas: { 
            type: Type.ARRAY,
            items: { type: Type.STRING }
          },
          elementos: { type: Type.STRING },
          saudacao: { type: Type.STRING }
        },
        required: ["nome", "resumo", "conselho", "caracteristicas", "elementos", "saudacao"]
      }
    }
  });

  try {
    const data = JSON.parse(response.text || '{}');
    return data as OduInfo;
  } catch (error) {
    console.error("Error parsing Gemini response:", error);
    throw new Error("Não foi possível processar a sabedoria do Odù. Tente novamente.");
  }
};
