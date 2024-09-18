import { useQuizStore } from "~/stores/quiz";
import axiosInstance from "@/utils/axios";

export function useQuizManager() {
  const toast = useToast();
  const quizStore = useQuizStore();
  const question = ref("");
  const options = ref(["", "", "", ""]);
  const currentItem = ref(quizStore.current_item);

  const watchCurrentItem = () => {
    watch(
      () => quizStore.current_item,
      (newVal) => {
        currentItem.value = newVal;
        if (quizStore.questions[newVal]) {
          // Restore the question and options when moving back or forward
          question.value = quizStore.questions[newVal].question;
          options.value = quizStore.questions[newVal].options.map(
            (opt) => opt.option
          );
        }
      },
      { immediate: true }
    );
  };

  function setQuizDetails(quizDetails: {
    title: string;
    description: string;
    items: number;
  }) {
    quizStore.setQuizDetails(
      quizDetails.title,
      quizDetails.description,
      quizDetails.items
    );
  }

  const setQuestion = (options: Ref<string[]>, question: Ref<string>) => {
    const formattedOptions = options.value.map((opt, index) => ({
      option: opt,
      is_correct: index === 0, // Assuming the first option is the correct one
    }));

    quizStore.setQuestion(question.value, formattedOptions);

    // Clear the inputs for the next question
    question.value = "";
    options.value = ["", "", "", ""];
  };

  const submitQuiz = async (isLoading: Ref<boolean>) => {
    try {
      isLoading.value = true;
      const response = await axiosInstance.post("/api/quizzes", {
        title: quizStore.title,
        description: quizStore.description,
        questions_count: quizStore.items,
        questions: quizStore.questions,
      });

      toast.add({
        id: "quiz-submition-success",
        description: "Quiz successfully submitted.",
        color: "green",
      });

      return true;
    } catch (error: any) {
      if (error.response && error.response.data) {
        const errorMessage =
          error.response.data.error || "Quiz submission failed.";

        toast.add({
          id: "quiz-submition-error",
          title: "Quiz Submission Failed",
          description: errorMessage,
          color: "red",
        });
      }
      console.error(error);

      return false;
    } finally {
      quizStore.forgetQuizData();
      isLoading.value = false;
    }
  };

  const getQuizDetails = async (isLoading: Ref<boolean>) => {
    try {
      isLoading.value = true;
      const response = await axiosInstance.get("/api/quizzes");
      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    } finally {
      isLoading.value = false;
    }
  };

  return {
    setQuizDetails,
    setQuestion,
    watchCurrentItem,
    question,
    options,
    currentItem,
    submitQuiz,
    getQuizDetails,
  };
}
