import { ref, onMounted } from "vue";
import axiosInstance from "~/utils/axois"; // Make sure to adjust the path if necessary

interface History {
  id: number;
  user_id: number;
  quiz_id: number;
  attempt_id: number;
  action: "Created" | "Attempt" | "Deleted";
  details: string;
  created_at_formatted: string;
}

export const useHistoryData = (isLoading: Ref<boolean>) => {
  const historyData = ref<History[]>([]);
  const currentPage = ref(1);
  const itemsPerPage = ref(10);
  const totalItems = ref(0);

  // Fetch history data with pagination
  const fetchHistory = async (page: number) => {
    try {
      isLoading.value = true;
      const response = await axiosInstance.post(`/history`, {
        item_per_page: itemsPerPage.value,
        page: page,
      });
      historyData.value = response.data.data; // Access the paginated data
      totalItems.value = response.data.total; // Set total items for pagination
    } catch (error: any) {
      console.log(
        "Failed to fetch history: " +
          (error.response?.data.message || error.message || "Unknown error")
      );
    } finally {
      isLoading.value = false;
    }
  };

  return {
    historyData,
    currentPage,
    itemsPerPage,
    totalItems,
    fetchHistory,
  };
};
