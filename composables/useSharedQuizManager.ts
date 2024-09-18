// Most of the logic is using the useQuizManager.ts because it is the same logic.
// The only difference is getting the quiz details from a different endpoint.
// With a different kind of response.

import axiosInstance from "@/utils/axios";

export function useSharedQuizManager() {
  const getQuizDetails = async (isLoading: Ref<boolean>) => {
    try {
      isLoading.value = true;
      const response = await axiosInstance.get("/api/get-shared-quizzes");
      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    } finally {
      isLoading.value = false;
    }
  };

  return {
    getQuizDetails,
  };
}
