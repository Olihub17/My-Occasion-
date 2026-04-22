import { GoogleGenAI, Type } from "@google/genai";
import { Budget } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export interface BudgetRecommendation {
  category: string;
  amount: number;
  percentage: number;
  description: string;
}

export async function getBudgetBreakdown(
  eventType: string,
  guestCount: number,
  totalBudget: number,
  language: 'ar' | 'en'
): Promise<BudgetRecommendation[]> {
  const prompt = `
    Act as a professional event planner. Provide a detailed budget breakdown for a ${eventType} for ${guestCount} guests with a total budget of ${totalBudget}.
    The output must be in ${language === 'ar' ? 'Arabic' : 'English'}.
    Provide the response as a JSON array of objects with the following properties:
    - category (string)
    - amount (number)
    - percentage (number)
    - description (string)
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              category: { type: Type.STRING },
              amount: { type: Type.NUMBER },
              percentage: { type: Type.NUMBER },
              description: { type: Type.STRING },
            },
            required: ["category", "amount", "percentage", "description"],
          },
        },
      },
    });

    const result = JSON.parse(response.text || "[]");
    return result;
  } catch (error) {
    console.error("AI Budgeting Error:", error);
    throw error;
  }
}
