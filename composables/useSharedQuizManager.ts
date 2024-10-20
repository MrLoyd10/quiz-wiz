// Most of the logic is using the useQuizManager.ts because it is the same logic.
// The only difference is getting the quiz details from a different endpoint.
// With a different kind of response.

import axiosInstance from "@/utils/axios";

export function useSharedQuizManager() {
  const getQuizDetails = async (isLoading?: Ref<boolean>) => {
    try {
      if (isLoading) {
        isLoading.value = true;
      }
      const response = await axiosInstance.get("/api/get-shared-quizzes");
      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    } finally {
      if (isLoading) {
        isLoading.value = false;
      }
    }
  };

  const getPersonAlreadyShared = async (quizId: number) => {
    try {
      const response = await axiosInstance.get(`/api/quiz/${quizId}/shares`);
      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const unshare = async (sharedQuizId: number) => {
    try {
      const response = await axiosInstance.delete(
        `/api/quiz/${sharedQuizId}/unshare`
      );
      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  return {
    getQuizDetails,
    getPersonAlreadyShared,
    unshare,
  };
}
