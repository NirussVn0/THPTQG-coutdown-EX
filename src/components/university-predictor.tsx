"use client";

import React, { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2, Lightbulb, ListChecks, AlertCircle } from 'lucide-react';
import { handlePredictScore } from '@/app/actions';
import { ScrollArea } from '@/components/ui/scroll-area';
import { type PredictUniversityScoreOutput } from '@/ai/flows/predict-university-score';

const formSchema = z.object({
  universityNames: z.string().min(3, { message: "Vui lòng nhập tên ít nhất một trường đại học." }),
});

type UniversityPredictorFormValues = z.infer<typeof formSchema>;

const UniversityPredictor: React.FC = () => {
  const [isPending, startTransition] = useTransition();
  const [predictions, setPredictions] = useState<PredictUniversityScoreOutput['predictions'] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<UniversityPredictorFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      universityNames: '',
    },
  });

  const onSubmit = async (values: UniversityPredictorFormValues) => {
    setError(null);
    setPredictions(null);

    const formData = new FormData();
    formData.append('universityNames', values.universityNames);

    startTransition(async () => {
      const result = await handlePredictScore(formData);
      if (result.success && result.data) {
        setPredictions(result.data.predictions);
      } else {
        setError(result.error || "Đã có lỗi xảy ra.");
      }
    });
  };

  return (
    <Card className="w-full max-w-2xl mx-auto my-8 shadow-xl bg-card/80 backdrop-blur-sm transition-all duration-300 hover:shadow-2xl hover:bg-card/90 hover:scale-[1.02]">
      <CardHeader>
        <div className="flex items-center space-x-2">
          <Lightbulb className="w-7 h-7 text-accent transition-all duration-300 hover:text-primary hover:scale-110 hover:rotate-12" />
          <CardTitle className="text-2xl transition-colors duration-300 hover:text-accent">Dự đoán điểm chuẩn Đại học</CardTitle>
        </div>
        <CardDescription className="transition-colors duration-300 hover:text-foreground/80">
          Nhập tên các trường bạn quan tâm (cách nhau bởi dấu phẩy, ví dụ: FTU, NEU, HUST) để dự đoán điểm cần thiết (lưu ý này đã dựa theo 2024 nên có thể không đúng 100%).
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-6">
            <FormField
              control={form.control}
              name="universityNames"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tên các trường Đại học</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ví dụ: Đại học Ngoại thương, Đại học Kinh tế Quốc dân, ..."
                      {...field}
                      className="bg-background/70 focus:bg-background transition-all duration-300 hover:bg-background/80 hover:shadow-md"
                      aria-label="Tên các trường Đại học bạn quan tâm, cách nhau bằng dấu phẩy"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={isPending} className="w-full transition-all duration-300 hover:scale-105 hover:shadow-lg">
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Đang dự đoán...
                </>
              ) : (
                "Dự đoán điểm"
              )}
            </Button>
          </CardFooter>
        </form>
      </Form>

      {error && (
        <div className="p-6 pt-0">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Lỗi</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        </div>
      )}

      {predictions && predictions.length > 0 && (
        <div className="p-6 pt-0">
          <h3 className="text-xl font-semibold mb-4 text-primary flex items-center">
            <ListChecks className="mr-2 w-6 h-6" />
            Kết quả dự đoán:
          </h3>
          <ScrollArea className="h-[300px] rounded-md border p-4 bg-background/50">
            <ul className="space-y-3">
              {predictions.map((pred, index) => (
                <li key={index} className={`p-4 rounded-md shadow-sm border transition-all duration-300 hover:shadow-md hover:scale-[1.02] ${pred.predictedScore === 0
                    ? 'bg-red-50 border-red-200 hover:bg-red-100 hover:border-red-300'
                    : 'bg-card border-border/50 hover:bg-card/90 hover:border-accent/30'
                  }`}>
                  <div className="flex justify-between items-start mb-2">
                    <p className={`font-semibold transition-colors duration-300 ${pred.predictedScore === 0 ? 'text-red-700' : 'text-foreground hover:text-accent'
                      }`}>{pred.university}</p>
                    {pred.predictedScore > 0 && (
                      <span className={`text-xs px-2 py-1 rounded-full ${pred.trend === 'increasing' ? 'bg-green-100 text-green-700' :
                        pred.trend === 'decreasing' ? 'bg-red-100 text-red-700' :
                          'bg-blue-100 text-blue-700'
                        }`}>
                        {pred.trend === 'increasing' ? '📈 Tăng' : pred.trend === 'decreasing' ? '📉 Giảm' : '📊 Ổn định'}
                      </span>
                    )}
                    {pred.predictedScore === 0 && (
                      <span className="text-xs px-2 py-1 rounded-full bg-red-100 text-red-700">
                        ❌ Không tìm thấy
                      </span>
                    )}
                  </div>
                  {pred.predictedScore > 0 ? (
                    <>
                      <p className="text-accent text-lg transition-colors duration-300 hover:text-primary mb-2">
                        Điểm dự kiến: <span className="font-bold">{pred.predictedScore.toFixed(2)}</span>
                      </p>
                      <p className="text-sm text-muted-foreground mb-2">{pred.reasoning}</p>
                      <div className="flex justify-between items-center text-xs text-muted-foreground">
                        <span>Độ tin cậy: {(pred.confidence * 100).toFixed(0)}%</span>
                        <div className="w-16 bg-gray-200 rounded-full h-1.5">
                          <div
                            className="bg-accent h-1.5 rounded-full transition-all duration-300"
                            style={{ width: `${pred.confidence * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="text-red-600">
                      <p className="text-sm mb-2">{pred.reasoning}</p>
                      <p className="text-xs text-red-500">
                        💡 Gợi ý: Thử nhập "Đại học Ngoại thương", "Đại học Bách khoa Hà Nội", "Đại học Y Hà Nội"...
                      </p>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </ScrollArea>
        </div>
      )}
      {predictions && predictions.length === 0 && !isPending && (
        <div className="p-6 pt-0">
          <Alert>
            <Lightbulb className="h-4 w-4" />
            <AlertTitle>Không có kết quả</AlertTitle>
            <AlertDescription>Không tìm thấy dự đoán cho các trường bạn đã nhập. Vui lòng kiểm tra lại tên trường.</AlertDescription>
          </Alert>
        </div>
      )}
    </Card>
  );
};

export default UniversityPredictor;
