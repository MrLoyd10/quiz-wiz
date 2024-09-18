import { z } from "zod";

// Schema to validate quiz details
export const quizDetailsSchema = z.object({
  title: z.string().min(1, "Title is required"),
  items: z.number().min(1, "At least one item is required"),
});

// Schema to validate each question and its options
export const quizQuestionSchema = z
  .object({
    question: z.string().min(1, "Question is required"),
    options: z
      .array(z.string().min(1, "Option cannot be empty"))
      .length(4, "Exactly four options are required"), // Ensure exactly 4 options
  })
  .refine(
    (data) => {
      const [correctAnswer, ...otherOptions] = data.options;
      // Check if the correct answer is duplicated in the other options
      return !otherOptions.includes(correctAnswer);
    },
    {
      message:
        "The correct answer must not be the same as any of the other options",
      path: ["options"], // This targets the "options" field in the error message
    }
  );
