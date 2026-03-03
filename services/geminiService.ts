import { GoogleGenAI, Type } from "@google/genai";
import { ConceptResponse } from "../types";

// Initialize Gemini API client safely
const getApiKey = () => {
  try {
    if (typeof process !== 'undefined' && process.env?.API_KEY) {
      return process.env.API_KEY;
    }
  } catch (e) {
    console.warn("Error accessing process.env", e);
  }
  return '';
};

const apiKey = getApiKey();
const ai = new GoogleGenAI({ apiKey });

export const generateArchitecturalConcept = async (prompt: string): Promise<ConceptResponse | null> => {
  if (!apiKey) {
    console.warn("API Key is missing. Returning mock data for preview.");
    return {
      title: "The Lagoon Respite",
      concept: "A sustainable floating structure on the Lagos Lagoon, utilizing recycled timber and raffia shading systems. The design mimics the root structure of mangroves to provide stability and natural filtration.",
      materials: ["Recycled Lagos Timber", "Laterite Earth", "Bamboo Composite", "Raffia Thatch"],
      features: ["Rainwater Harvesting Roof", "Passive Lagoon Cooling", "Floating Gardens", "Solar Weave Facade"]
    };
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Generate a contemporary African architectural concept situated in Nigeria based on this inspiration: "${prompt}". 
      The design should blend modern sustainability with traditional Nigerian aesthetics (Yoruba, Igbo, or Hausa influences).
      Return a JSON object with a poetic title, a detailed concept description (approx 40 words), a list of 4 key materials, and 4 unique architectural features.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            concept: { type: Type.STRING },
            materials: { type: Type.ARRAY, items: { type: Type.STRING } },
            features: { type: Type.ARRAY, items: { type: Type.STRING } },
          },
          required: ["title", "concept", "materials", "features"],
        },
      },
    });

    if (response.text) {
      return JSON.parse(response.text) as ConceptResponse;
    }
    return null;
  } catch (error) {
    console.error("Error generating concept:", error);
    return null;
  }
};

export const generateBuildingQuestion = async (userPrompt: string, currentStage: string, history: string[]): Promise<string> => {
  if (!apiKey) return "What type of windows would you like to add to this layout?";

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `
        You are an AI Architect assistant helping a client build a house layer by layer.
        Current Stage: ${currentStage} (e.g., Layout, Windows, Roof, Materials).
        User Input: "${userPrompt}"
        Conversation History: ${history.join('\n')}

        Your goal is to acknowledge their choice and ask the NEXT logical question to progress the design.
        Keep it brief (under 20 words).
        Example: "Great choice. Now, what kind of roof should we place on top?"
      `,
    });
    return response.text || "What would you like to add next?";
  } catch (error) {
    console.error("Error generating question:", error);
    return "What would you like to add next?";
  }
};

export const generateBuildingImage = async (prompt: string, view: '3d' | 'ortho' = '3d'): Promise<string | null> => {
  if (!apiKey) return null;

  try {
    const viewPrompt = view === '3d' 
      ? "3D isometric architectural sketch, white background, minimal, clean lines, ambient occlusion" 
      : "Orthographic top-down architectural blueprint plan, white background, technical drawing style, clean lines";

    const fullPrompt = `Architectural concept: ${prompt}. ${viewPrompt}. High quality, detailed, professional architectural rendering.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-image",
      contents: {
        parts: [{ text: fullPrompt }],
      },
      config: {
        // @ts-ignore - imageConfig is valid for this model but types might be outdated
        imageConfig: {
          aspectRatio: "1:1",
        }
      }
    });

    // Extract image
    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
      }
    }
    return null;
  } catch (error) {
    console.error("Error generating building image:", error);
    return null;
  }
};