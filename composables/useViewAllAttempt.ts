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

  return {
    getDetails,
  };
};
