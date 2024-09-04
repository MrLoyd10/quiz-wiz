import { ref, onMounted } from "vue";
import axiosInstance from "~/utils/axois";

interface AttemptPreview {
  quiz_id: number;
  id: number;
  title: string;
  description: string;
  total_score: number;
  number_of_questions: number;
  questions: Question[];
  attempt_data: AttemptData[];
}

interface Question {
  id: number;
  quiz_id: number;
  question: string;
  correct_answer: string;
  options: any[];
}

interface AttemptData {
  isCorrect: boolean;
  index: number;
  selectedIndex: number;
  correctAnswerIndex: number;
  questionShuffled: string[];
}

// Create a composable function to fetch attempt preview
export function useAttemptPreview(attempt_id: number) {
  const attemptPreview = ref<AttemptPreview | null>(null);
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  const fetchAttemptPreview = async () => {
    isLoading.value = true;
    try {
      const response = await axiosInstance.post("/view-attempt", {
        attempt_id: attempt_id,
      });
      attemptPreview.value = response.data;
    } catch (err: any) {
      error.value = err.message || "Error fetching quiz result";
    } finally {
      isLoading.value = false;
    }
  };

  return {
    attemptPreview,
    isLoading,
    error,
    fetchAttemptPreview, // Return fetch function if you want to trigger it manually
  };
}
