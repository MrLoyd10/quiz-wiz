import axiosInstance from "@/utils/axios";
import { useTakeQuizStore } from "@/stores/take-quiz";

export function useTakeQuizManager() {
  const takeQuizStore = useTakeQuizStore();
  const toast = useToast();

  const getQuizQuestions = async (isLoading: Ref<boolean>) => {
    try {
      isLoading.value = true;
      const response = await axiosInstance.get(
        `/api/quiz/${takeQuizStore.quiz_id}`
      );
      return response.data;
    } catch (error) {
      console.error(error);
      return false;
    } finally {
      isLoading.value = false;
    }
  };

  function shuffleArray<T>(array: T[]): T[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  async function submitAttemptAnswer(isLoading: Ref<boolean>) {
    try {
      isLoading.value = true;
      const response = await axiosInstance.post("/api/quiz/attempt", {
        quiz_id: takeQuizStore.quiz_id,
        answers: takeQuizStore.answer_data,
      });

      toast.add({
        id: "attempt-submition-success",
        description: "Attempt successfully submitted.",
        color: "green",
      });

      return response.data;
    } catch (error: any) {
      if (error.response && error.response.data) {
        const errorMessage =
          error.response.data.error || "Attempt submission failed.";

        toast.add({
          id: "attempt-submition-error",
          title: "Attempt Submission Failed",
          description: errorMessage,
          color: "red",
        });
      }
      console.error(error);

      return false;
    } finally {
      isLoading.value = false;
    }
  }

  return { getQuizQuestions, shuffleArray, submitAttemptAnswer };
}
