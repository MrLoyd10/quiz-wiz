import axiosInstance from "@/utils/axios";

export const useViewAllAttempt = () => {
  const getDetails = async (quiz_id: number, isLoading: Ref<boolean>) => {
    try {
      isLoading.value = true;
      const response = await axiosInstance.post("/api/view-all-attempts", {
        quiz_id: quiz_id,
      });
      return response.data;
    } catch (error) {
      console.error(error);
      return false;
    } finally {
      isLoading.value = false;
    }
  };

  async function handleDeleteAttempt(attempt_id: number) {
    const toast = useToast();
    try {
      const response = await axiosInstance.delete(
        `/api/view-all-attempts/${attempt_id}`
      );
    } catch (error: any) {
      console.error(error);
      toast.add({
        id: "deleteError",
        color: "red",
        description:
          error.response?.data?.message || "Error deleting the attempt.",
      });
    }
  }

  return {
    getDetails,
    handleDeleteAttempt,
  };
};
