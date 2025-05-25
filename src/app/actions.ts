"use server";

import { predictUniversityScore, type PredictUniversityScoreInput, type PredictUniversityScoreOutput } from '@/ai/flows/predict-university-score';
import { z } from 'zod';

const UniversityListSchema = z.object({
  universityNames: z.string().min(1, "Vui lòng nhập tên trường đại học."),
});

interface ActionResult {
  success: boolean;
  data?: PredictUniversityScoreOutput;
  error?: string;
}

export async function handlePredictScore(formData: FormData): Promise<ActionResult> {
  const rawFormData = {
    universityNames: formData.get('universityNames'),
  };

  const validatedFields = UniversityListSchema.safeParse(rawFormData);

  if (!validatedFields.success) {
    return {
      success: false,
      error: validatedFields.error.flatten().fieldErrors.universityNames?.join(", ") || "Dữ liệu không hợp lệ.",
    };
  }
  
  const universitiesArray = validatedFields.data.universityNames
    .split(',')
    .map(name => name.trim())
    .filter(name => name.length > 0);

  if (universitiesArray.length === 0) {
    return {
      success: false,
      error: "Vui lòng nhập ít nhất một tên trường đại học.",
    };
  }

  const input: PredictUniversityScoreInput = {
    universities: universitiesArray,
  };

  try {
    const result = await predictUniversityScore(input);
    return { success: true, data: result };
  } catch (error) {
    console.error("Error predicting university score:", error);
    return { success: false, error: "Đã có lỗi xảy ra trong quá trình dự đoán. Vui lòng thử lại." };
  }
}
