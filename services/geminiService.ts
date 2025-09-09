import { GoogleGenAI, Type } from "@google/genai";
import type { JiaResponse, Product } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

// Step 1: Updated the schema to match your real product data structure.
const productSchema = {
  type: Type.OBJECT,
  properties: {
    id: { type: Type.STRING },
    name: { type: Type.STRING },
    brand: { type: Type.STRING },
    price: { type: Type.NUMBER },
    originalPrice: { type: Type.NUMBER },
    discount: { type: Type.STRING },
    imageUrl: { type: Type.STRING },
    gender: { type: Type.STRING },
    category: { type: Type.STRING },
    description: { type: Type.STRING },
    sizes: { type: Type.ARRAY, items: { type: Type.STRING } },
  },
  required: ["id", "name", "brand", "price", "originalPrice", "discount", "imageUrl", "gender", "category", "description", "sizes"]
};

const responseSchema = {
    type: Type.OBJECT,
    properties: {
        products: {
            type: Type.ARRAY,
            description: "An array of product objects selected from the provided catalog that best match the user's query.",
            items: productSchema
        },
        responseMessage: {
            type: Type.STRING,
            description: "A friendly, conversational response to the user, either confirming the search, answering a question, or confirming navigation."
        },
        followUpQuery: {
            type: Type.STRING,
            description: "If the user's intent is to navigate the site (e.g., 'go to men's section'), populate this with a relevant search query. Otherwise, this should be null or omitted."
        }
    },
    required: ["responseMessage"]
};

// Step 2: Completely rewrote the AI's instructions to search your data instead of creating mock data.
const SYSTEM_INSTRUCTION = `You are JIA, a helpful and trendy AI fashion shopping assistant. Your primary function is to act as a smart search filter for an e-commerce website.
You will be provided with the user's voice query and the website's complete product catalog as a JSON string.

Your task is to analyze the user's query and respond in one of three ways, always providing a valid JSON object based on the schema.

1.  **Product Search Mode (Primary):** If the user's query is about finding clothes, shoes, or accessories (e.g., "show me red dresses", "find a slim fit t-shirt"), you MUST filter the provided JSON product catalog.
    - Search through all fields of the products in the catalog ('name', 'description', 'brand', 'category', 'gender', 'color') to find items that best match the query.
    - Your response in the 'products' field of the JSON output MUST be an array containing ONLY the full product objects of the matching items, copied exactly from the provided catalog.
    - Do NOT invent new products, modify existing ones, or create placeholder data. Return only real data from the catalog.
    - Limit the results to a maximum of 12 items.
    - The 'responseMessage' should be a short, friendly confirmation, like "Here are some red dresses I found for you."
    - The 'followUpQuery' field should be omitted or null.

2.  **Navigation Mode:** If the user asks to navigate the site or see a general category (e.g., "take me to the kids section"), do not search the catalog.
    - The 'products' array MUST be empty.
    - The 'responseMessage' should be a confirmation, like "Of course, heading to the kids section..."
    - The 'followUpQuery' field MUST contain a relevant search term for that category. For "take me to the kids section", the followUpQuery could be "kids clothing and footwear".

3.  **Policy/General Query Mode:** If the user asks about store policies or a general question, do not search the catalog.
    - The 'products' array MUST be empty.
    - The 'responseMessage' field should contain the answer to the user's question.
    - The 'followUpQuery' field should be omitted or null.
`;


// Step 3: Updated the function to accept your product list as an argument.
export const getFashionResults = async (query: string, allProducts: Product[]): Promise<JiaResponse> => {
    try {
        // We now provide the AI with your full product catalog along with the user's query.
        const productCatalog = JSON.stringify(allProducts);
        const contents = `Here is the full product catalog available for searching, in a JSON array format: ${productCatalog}. Now, please process the following user query: "${query}"`;
        
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: contents,
            config: {
                systemInstruction: SYSTEM_INSTRUCTION,
                responseMimeType: "application/json",
                responseSchema: responseSchema,
            },
        });

        const jsonText = response.text.trim();
        const parsedResponse: JiaResponse = JSON.parse(jsonText);
        
        if (!parsedResponse.responseMessage) {
            throw new Error("Received an incomplete response from the assistant.");
        }
        
        return parsedResponse;

    } catch (error) {
        console.error("Error calling Gemini API:", error);
        if (error instanceof Error && (error.message.includes('JSON') || error.message.includes('response'))) {
             throw new Error("Sorry, I received an unexpected response. Please try rephrasing your search.");
        }
        throw new Error("Sorry, I'm having trouble searching right now. Please try again later.");
    }
};

