
'use server';
/**
 * @fileOverview A university score prediction AI flow.
 *
 * - predictUniversityScore - A function that handles the university score prediction process.
 * - PredictUniversityScoreInput - The input type for the predictUniversityScore function.
 * - PredictUniversityScoreOutput - The return type for the predictUniversityScore function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

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

  // Uncomment the following to use the actual Genkit flow once the prompt is defined and API key is set up.
  /*
  try {
    console.log("Calling predictUniversityScoreFlow with input:", input);
    const result = await predictUniversityScoreFlow(input);
    console.log("Received result from predictUniversityScoreFlow:", result);
    return result;
  } catch (error) {
    console.error("Error in predictUniversityScore calling predictUniversityScoreFlow:", error);
    // It's often better to throw the error to be caught by a global error handler
    // or to return a structured error response.
    // For now, returning an empty prediction array on error.
     return { predictions: [] };
  }
  */
}

// Define the prompt for Genkit
const predictScorePrompt = ai.definePrompt({
  name: 'predictUniversityScorePrompt',
  input: { schema: PredictUniversityScoreInputSchema },
  output: { schema: PredictUniversityScoreOutputSchema },
  prompt: `Bạn là một chuyên gia tư vấn tuyển sinh đại học tại Việt Nam với nhiều năm kinh nghiệm. 
  Dựa vào tên các trường đại học được cung cấp, hãy dự đoán điểm chuẩn dự kiến cho mỗi trường. 
  Cung cấp một con số cụ thể (ví dụ: 25.75) và một lý do ngắn gọn (1-2 câu) cho mỗi dự đoán, cân nhắc các yếu tố như uy tín của trường, độ hot của ngành, dữ liệu lịch sử (nếu có thể suy luận), và xu hướng chung.

  Danh sách trường:
  {{#each universities}}
  - {{{this}}}
  {{/each}}

  Hãy đảm bảo rằng kết quả trả về tuân thủ đúng cấu trúc JSON output schema đã được định nghĩa. 
  Chỉ trả lời bằng JSON.
  Ví dụ: Đại học Ngoại thương thường có điểm cao, khoảng 27-29. Đại học vùng có thể thấp hơn, khoảng 20-24.
  Hãy cố gắng đưa ra con số thực tế nhất có thể.
  `,
  // Example config for safety settings if needed
  // config: {
  //   safetySettings: [
  //     {
  //       category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
  //       threshold: 'BLOCK_ONLY_HIGH',
  //     },
  //   ],
  //   temperature: 0.3, // Lower temperature for more deterministic predictions
  // },
});

// Define the Genkit flow
const predictUniversityScoreFlow = ai.defineFlow(
  {
    name: 'predictUniversityScoreFlow',
    inputSchema: PredictUniversityScoreInputSchema,
    outputSchema: PredictUniversityScoreOutputSchema,
  },
  async (input) => {
    console.log("predictUniversityScoreFlow: Input received", input);
    try {
      const llmResponse = await predictScorePrompt(input);
      const output = llmResponse.output;
      console.log("predictUniversityScoreFlow: LLM Output", output);

      if (!output || !output.predictions) {
        console.warn("predictUniversityScoreFlow: LLM output is missing predictions. Returning empty array.");
        return { predictions: [] };
      }
      // Ensure scores are numbers and have two decimal places
      const validatedPredictions = output.predictions.map(p => ({
        ...p,
        predictedScore: parseFloat(Number(p.predictedScore).toFixed(2))
      }));

      return { predictions: validatedPredictions };
    } catch (e) {
        console.error("predictUniversityScoreFlow: Error during LLM call or processing", e);
        // Depending on how you want to handle errors, you might re-throw,
        // or return a default/empty response.
        // For robustness, especially if the LLM might fail or return unexpected formats:
        return { predictions: input.universities.map(uni => ({
            university: uni,
            predictedScore: 0, // Default or error score
            reasoning: "Không thể nhận được dự đoán từ AI do lỗi."
        }))};
    }
  }
);
