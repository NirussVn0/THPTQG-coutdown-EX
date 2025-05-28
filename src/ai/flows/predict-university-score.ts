
'use server';
/**
 * @fileOverview A university score prediction function with mocked data.
 *
 * - predictUniversityScore - A function that handles the university score prediction process.
 * - PredictUniversityScoreInput - The input type for the predictUniversityScore function.
 * - PredictUniversityScoreOutput - The return type for the predictUniversityScore function.
 */

import { z } from 'zod';

const UniversityPredictionSchema = z.object({
  university: z.string().describe('The name of the university.'),
  predictedScore: z.number().describe('The predicted admission score for the university.'),
  reasoning: z.string().optional().describe('A brief explanation for the predicted score, considering factors like historical data, program popularity, and general trends. Keep it concise (1-2 sentences).')
});

const PredictUniversityScoreInputSchema = z.object({
  universities: z.array(z.string().min(1, "University name cannot be empty."))
    .min(1, "At least one university name must be provided.")
    .describe("An array of university names for which to predict admission scores."),
});
export type PredictUniversityScoreInput = z.infer<typeof PredictUniversityScoreInputSchema>;

const PredictUniversityScoreOutputSchema = z.object({
  predictions: z.array(UniversityPredictionSchema)
    .describe("An array of university score predictions."),
});
export type PredictUniversityScoreOutput = z.infer<typeof PredictUniversityScoreOutputSchema>;


export async function predictUniversityScore(input: PredictUniversityScoreInput): Promise<PredictUniversityScoreOutput> {
  // For now, we'll return mocked data directly without calling an LLM.
  // This allows the UI to function while the actual LLM integration is pending.
  // In a real scenario, you would call predictUniversityScoreFlow(input);

  if (!PredictUniversityScoreInputSchema.safeParse(input).success) {
    // This basic validation can be expanded
    // console.error("Invalid input for predictUniversityScore:", PredictUniversityScoreInputSchema.safeParse(input).error);
    // throw new Error("Invalid input provided for score prediction.");
    // Or return an empty/error state if preferred for frontend handling
    return { predictions: [] };
  }


  // Mocked predictions:
  const mockedPredictions = input.universities.map(uniName => {
    let score = 20 + Math.random() * 8; // Random score between 20 and 28
    let reason = "Dự đoán dựa trên xu hướng chung và độ hot của ngành."
    if (uniName.toLowerCase().includes("ngoại thương") || uniName.toLowerCase().includes("ftu")) {
      score = 27 + Math.random() * 2; // Higher for FTU
      reason = "FTU là trường top đầu với điểm chuẩn luôn ở mức cao."
    } else if (uniName.toLowerCase().includes("kinh tế quốc dân") || uniName.toLowerCase().includes("neu")) {
      score = 26 + Math.random() * 2;
      reason = "NEU có nhiều ngành hot, điểm chuẩn dự kiến cao."
    } else if (uniName.toLowerCase().includes("bách khoa") || uniName.toLowerCase().includes("hust")) {
      score = 25 + Math.random() * 3;
      reason = "HUST mạnh về kỹ thuật, điểm chuẩn cạnh tranh."
    }
    else if (uniName.toLowerCase().includes("y hà nội") || uniName.toLowerCase().includes("hmu")) {
      score = 27.5 + Math.random() * 1.5; // Typically very high
      reason = "Các ngành Y Dược thường có điểm chuẩn rất cao do tính chất đặc thù và nhu cầu lớn."
    }

    return {
      university: uniName,
      predictedScore: parseFloat(score.toFixed(2)), // Keep two decimal places
      reasoning: reason,
    };
  });

  return { predictions: mockedPredictions };
}


