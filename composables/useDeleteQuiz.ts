import { useRefetch } from "@/stores/refetch";
import axiosInstance from "@/utils/axios";

export const useDeleteQuiz = () => {
  const isDeleteModalOpen = ref(false);
  const toast = useToast();
  const circleLoading = ref(false);
  const refetch = useRefetch();

  async function handleDeleteQuiz(quiz_id: number) {
    try {
      circleLoading.value = true;
      const response = await axiosInstance.delete(`/api/quiz/${quiz_id}`);
      toast.add({
        id: "deleteSuccess",
        color: "green",
        description: response.data.message,
      });
      isDeleteModalOpen.value = false;
      refetch.setRefetch(true);
    } catch (error: any) {
      console.error(error);
      toast.add({
        id: "deleteError",
        color: "red",
        description:
          error.response?.data?.message || "Error deleting the quiz.",
      });
    } finally {
      circleLoading.value = false;
    }
  }

  function handleCancelDelete() {
    isDeleteModalOpen.value = false;
  }

  return {
    isDeleteModalOpen,
    circleLoading,
    handleDeleteQuiz,
    handleCancelDelete,
  };
};
