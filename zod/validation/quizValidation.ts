import z from "zod";
import { quizDetailsSchema, quizQuestionSchema } from "@/zod/schema/quizSchema";

export const validateQuizDetails = (title: string, items: number) => {
  const toast = useToast();
  try {
    quizDetailsSchema.parse({
      title: title,
      items: items,
    });
  } catch (e) {
    if (e instanceof z.ZodError) {
      const firstError = e.errors[0];
      toast.add({
        id: firstError.code,
        description: firstError.message,
        color: "red",
      });
      throw new Error("Quiz details validation failed");
    }
  }
};

// Function to validate each question and options
export const validateQuestion = (
  question: Ref<string>,
  options: Ref<string[]>
) => {
  const toast = useToast();
  try {
    quizQuestionSchema.parse({
      question: question.value,
      options: options.value,
    });
    return true;
  } catch (e) {
    if (e instanceof z.ZodError) {
      const firstError = e.errors[0];
      toast.add({
        id: firstError.code,
        description: firstError.message,
        color: "red",
      });
    }
    return false;
  }
};
