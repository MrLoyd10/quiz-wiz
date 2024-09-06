import axiosInstance from "~/utils/axois";

export const useDashboardHelpers = (
  circleLoading: Ref<boolean>,
  isLoading: Ref<boolean>
) => {
  interface Quiz {
    id: number;
    title: string;
    description: string;
    number_of_questions: number;
    questions: Question[];
  }

  interface Question {
    id: number;
    quiz_id: number;
    question: string;
    correct_answer: string;
    options: any[];
  }

  interface ShareWith {
    id: number;
    name: string;
    email: string;
  }

  const toast = useToast();
  const quizzes = ref<Quiz[]>([]);
  const isSharedModalOpen = ref(false);
  const selectedQuizIdStore = ref(-1);

  async function deleteQuiz(quiz_id: number) {
    try {
      circleLoading.value = true;
      await axiosInstance.delete(`/delete-quiz/${quiz_id}`);
      console.log("Quiz deleted successfully");
      toast.add({
        id: "quiz_deleted",
        color: "green",
        description: "Quiz deleted successfully",
      });
    } catch (error) {
      console.error("Error deleting quiz:", error);
    } finally {
      circleLoading.value = false;
    }
  }

  async function fetchQuizzes() {
    isLoading.value = true;
    try {
      const response = await axiosInstance.get("/quizzes");
      quizzes.value = response.data;
    } catch (error: any) {
      console.log(
        "Failed to fetch quizzes: " +
          (error.response?.data.message || error.message || "Unknown error")
      );
    } finally {
      isLoading.value = false;
    }
  }

  function items(selectedQuizId: number) {
    return [
      [
        {
          label: "Delete",
          icon: "i-ic-baseline-delete",
          click: async () => {
            await deleteQuiz(selectedQuizId);
            console.log("Deleted quiz with ID:", selectedQuizId);
            // Refresh the quiz list after deletion
            await fetchQuizzes();
          },
        },
      ],
      [
        {
          label: "Share",
          icon: "i-heroicons-share",
          click: () => {
            console.log("Share quiz with ID:", selectedQuizId);
            selectedQuizIdStore.value = selectedQuizId;
            isSharedModalOpen.value = true;
          },
        },
      ],
      [
        {
          label: "View attempts",
          icon: "i-heroicons-eye-20-solid",
          click: () => {
            console.log("View attempts for quiz with ID:", selectedQuizId);
            // Implement view attempts functionality here, passing the quiz ID
          },
        },
      ],
    ];
  }

  async function shareQuiz(
    selectedQuizIdStore: number,
    shareWith: ShareWith[]
  ) {
    const userIds = shareWith.map((user) => user.id);

    try {
      circleLoading.value = true;
      const response = await axiosInstance.post("/share-quiz", {
        quiz_id: selectedQuizIdStore,
        shared_with_user_ids: userIds,
      });
      toast.add({
        id: "share_quiz_success",
        color: "green",
        description: response.data.message,
      });
    } catch (error: any) {
      toast.add({
        id: "share_quiz_error",
        color: "red",
        description:
          error.message || "An error occurred while sharing the quiz.",
      });
    } finally {
      circleLoading.value = false;
    }
  }

  return {
    quizzes,
    isSharedModalOpen,
    selectedQuizIdStore,
    fetchQuizzes,
    items,
    deleteQuiz,
    shareQuiz,
  };
};
