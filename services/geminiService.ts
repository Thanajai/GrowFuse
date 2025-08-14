import { GoogleGenAI, Type } from "@google/genai";
import type { CropRecommendation } from '../types';
import { Language, ForecastDuration } from '../types';

const API_KEY = process.env.API_KEY;

let ai: GoogleGenAI | null = null;

// Initialize the SDK only if the API key is available.
// This prevents the entire application from crashing on load if the key is not set.
if (API_KEY) {
  try {
    ai = new GoogleGenAI({ apiKey: API_KEY });
  } catch (e) {
    console.error("Failed to initialize GoogleGenAI. The API key might be misconfigured.", e);
  }
}

const cropRecommendationSchema = {
  type: Type.ARRAY,
  items: {
    type: Type.OBJECT,
    properties: {
      cropName: {
        type: Type.STRING,
        description: 'Name of the recommended crop, translated into the specified language.',
      },
      englishCropName: {
        type: Type.STRING,
        description: 'The English name of the crop (e.g., "Wheat", "Black Gram").',
      },
      confidenceScore: {
        type: Type.NUMBER,
        description: 'A score from 0 to 100 representing the suitability of the crop for the given conditions.',
      },
      justification: {
        type: Type.STRING,
        description: 'A brief, 1-2 sentence justification for why this crop is recommended, tailored to the user\'s inputs. This text should be in the specified language.',
      },
    },
    required: ["cropName", "englishCropName", "confidenceScore", "justification"],
  },
};

const getLanguageName = (lang: Language): string => {
  switch (lang) {
    case Language.HINDI: return 'Hindi';
    case Language.TAMIL: return 'Tamil';
    case Language.TELUGU: return 'Telugu';
    case Language.KANNADA: return 'Kannada';
    case Language.BENGALI: return 'Bengali';
    case Language.MARATHI: return 'Marathi';
    case Language.PUNJABI: return 'Punjabi';
    case Language.ENGLISH:
    default:
      return 'English';
  }
};

export const getAgroRecommendations = async (
  location: string,
  soilType: string,
  landArea: number,
  language: Language,
  forecastDuration: ForecastDuration
): Promise<CropRecommendation[]> => {
  // Check for the API key inside the function to provide a user-friendly error at runtime.
  if (!ai) {
    throw new Error("The recommendation service is currently unavailable due to a configuration issue. Please contact support.");
  }
  
  try {
    const languageName = getLanguageName(language);
    const prompt = `
      As an expert agricultural advisor for Indian farmers, recommend the top 5 most suitable crops based on the following farm data and long-term weather forecast.
      Your analysis should prioritize crops that will thrive over the specified period.

      Farm Data & Forecast:
      - Language for Response: ${languageName}
      - Location: ${location}, India
      - Soil Type: ${soilType}
      - Land Area: ${landArea} acres
      - Forecast Period: Considering the typical weather patterns and climate forecast for the next ${forecastDuration} months.

      Instructions:
      1. Analyze the inputs, giving significant weight to the long-term weather viability over the next ${forecastDuration} months.
      2. Provide the 'cropName' in the ${languageName} language. For example, if the language is Hindi and the crop is Wheat, the cropName should be "गेहूँ".
      3. Provide the 'englishCropName' for each crop. This should be a simple, clean name (e.g., "Wheat", "Sorghum", "Black Gram") suitable for use in an image search query. Avoid adding regional names or other text in parentheses.
      4. Provide a confidence score (0-100) for each recommendation, reflecting its suitability for the entire forecast period.
      5. Write a short justification for each crop in the ${languageName} language.
      6. Return the response as a valid JSON array matching the provided schema. Do not include any extra text or markdown formatting.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: cropRecommendationSchema,
      },
    });

    const jsonText = response.text.trim();
    const recommendationsFromApi = JSON.parse(jsonText);
    
    if (!Array.isArray(recommendationsFromApi)) {
        throw new Error("API did not return a valid array of recommendations.");
    }

    // Generate an image for each recommendation in parallel for better performance.
    const recommendationsWithImages = await Promise.all(
      recommendationsFromApi.map(async (rec: any) => {
        try {
          const imagePrompt = `A high-quality, vibrant photograph of a healthy ${rec.englishCropName} crop growing in a sun-drenched field. Focus on the crop itself. Photorealistic, agricultural photography, clear blue sky.`;

          const imageResponse = await ai.models.generateImages({
              model: 'imagen-3.0-generate-002',
              prompt: imagePrompt,
              config: {
                  numberOfImages: 1,
                  outputMimeType: 'image/jpeg',
                  aspectRatio: '16:9',
              },
          });
          
          const base64ImageBytes = imageResponse.generatedImages[0].image.imageBytes;
          const imageUrl = `data:image/jpeg;base64,${base64ImageBytes}`;

          return {
              ...rec,
              imageUrl,
          };
        } catch (imageError) {
          console.error(`Failed to generate image for ${rec.englishCropName}, falling back to Unsplash.`, imageError);
          // Fallback to Unsplash if image generation fails for any reason
          const sanitizedName = rec.englishCropName
            .replace(/ *\([^)]*\) */g, "")
            .trim()
            .replace(/\s+/g, '-')
            .toLowerCase();
          return {
            ...rec,
            imageUrl: `https://source.unsplash.com/400x250/?${sanitizedName},crop,field,farm`
          };
        }
      })
    );

    return recommendationsWithImages as CropRecommendation[];
  } catch (error) {
    console.error("Error fetching recommendations from Gemini API:", error);
    if (error instanceof Error) {
        throw new Error(`Failed to get recommendations: ${error.message}`);
    }
    throw new Error("An unknown error occurred while fetching recommendations.");
  }
};