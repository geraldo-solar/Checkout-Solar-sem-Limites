import { GoogleGenAI } from "@google/genai";
import { CustomerData } from "../types";

// Safely access API key to prevent crashes in environments where process is undefined (like GitHub Pages)
const getApiKey = () => {
  try {
    // Check if process exists and has env property before accessing
    if (typeof process !== 'undefined' && process.env) {
      return process.env.API_KEY || '';
    }
    return '';
  } catch (e) {
    // Silently fail if process is not defined
    return '';
  }
};

const apiKey = getApiKey();

export const generateConfirmationMessage = async (customer: CustomerData): Promise<string> => {
  if (!apiKey) {
    console.warn("API Key is missing. Returning default message.");
    return `Olá ${customer.firstName}, obrigado por adquirir o Solar sem Limites! Enviamos os detalhes para o seu email.`;
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    
    const modelId = 'gemini-2.5-flash';

    const prompt = `
      You are a premium customer success assistant for a high-end sustainable energy product called "Solar sem Limites".
      
      A customer named "${customer.firstName} ${customer.lastName}" just purchased the product using ${customer.paymentMethod === 'credit_card' ? 'Credit Card' : 'Pix'}.
      They provided the email "${customer.email}" and phone "${customer.phone}".
      City: ${customer.city}, State: ${customer.state}.
      
      Write a short, elegant, and warm confirmation message (maximum 3 sentences) in Portuguese (Brazil).
      
      Key points to include naturally:
      1. Thank them by first name.
      2. Confirm that access details have been sent to their email.
      3. Mention that we will keep them updated via WhatsApp.
      
      Tone: Sophisticated, eco-friendly, trustworthy, and welcoming.
      Do not include markdown or quotes.
    `;

    const response = await ai.models.generateContent({
      model: modelId,
      contents: prompt,
    });

    return response.text || `Parabéns pela compra, ${customer.firstName}!`;
  } catch (error) {
    console.error("Gemini generation error:", error);
    return `Obrigado, ${customer.firstName}! Sua compra do Solar sem Limites foi confirmada com sucesso.`;
  }
};