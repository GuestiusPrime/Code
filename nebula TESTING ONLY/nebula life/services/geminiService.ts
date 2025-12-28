import { GoogleGenAI, Type } from "@google/genai";

if (!process.env.API_KEY) {
    console.warn("API_KEY environment variable not set. AI features will not work.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

const schema = {
    type: Type.OBJECT,
    properties: {
        category: {
            type: Type.STRING,
            enum: ['Skills', 'Hobbies', 'Projects', 'Goals', 'Journal'],
            description: "Categorize the user's text into one of the following main categories: Skills, Hobbies, Projects, Goals, or Journal."
        },
        title: {
            type: Type.STRING,
            description: 'A concise title for the item, based on the user input. For example, for "learn guitar", the title should be "Learn Guitar".'
        },
        description: {
            type: Type.STRING,
            description: 'A brief, one-sentence description of the item if details are provided in the prompt. Otherwise, this should be an empty string.'
        }
    },
    required: ['category', 'title', 'description']
};


export async function categorizeAndCreateItem(userInput: string): Promise<{ category: string, title: string, description: string }> {
    if (!process.env.API_KEY) {
        throw new Error("API key is not configured. Please set the API_KEY environment variable.");
    }

    const model = 'gemini-2.5-flash';
    
    try {
        const response = await ai.models.generateContent({
            model,
            contents: userInput,
            config: {
                systemInstruction: "You are an intelligent task-sorting assistant for an app called Nebula Life. Your job is to analyze a user's free-form text and categorize it into one of the provided categories. Extract a clear title and a brief description for the task. Default to the most logical category.",
                responseMimeType: "application/json",
                responseSchema: schema,
                temperature: 0.1, // Lower temperature for more deterministic categorization
            }
        });

        let jsonText = response.text.trim();
        if (jsonText.startsWith('```json')) {
            jsonText = jsonText.slice(7, -3).trim();
        }

        if (!jsonText) {
            throw new Error("The AI returned an empty response. Please try rephrasing your idea.");
        }

        const parsed = JSON.parse(jsonText);
        return parsed;
    } catch (error) {
        console.error("Error calling Gemini API for categorization:", error);
        throw new Error("Could not process your request with AI. The service may be unavailable or the API key may be invalid.");
    }
}