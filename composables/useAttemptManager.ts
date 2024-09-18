import axiosInstance from "@/utils/axios";
import { useAttemptStore } from "@/stores/attempt";

export function useAttemptManager() {
  const attemptStore = useAttemptStore();
  const attemptId = attemptStore.attempt_id;

  const getAttemptDetails = async (isLoading: Ref<boolean>) => {
    if (!attemptId) return false;

    try {
      isLoading.value = true;
      const response = await axiosInstance.get(
        `/api/quiz/attempt/${attemptId}`
      );
      return response.data;
    } catch (error) {
      console.error(error);
      return false;
    } finally {
      isLoading.value = false;
    }
  };

  return {
    getAttemptDetails,
  };
}
