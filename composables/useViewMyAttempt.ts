import axiosInstance from "@/utils/axios";

export const useViewMyAttempt = () => {
  const getDetails = async (isLoading: Ref<boolean>) => {
    try {
      isLoading.value = true;
      const response = await axiosInstance.get("/api/get-my-attempts");
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
