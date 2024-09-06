import axiosInstance from "~/utils/axois";

export const useShareWith = () => {
  interface User {
    id: number;
    name: string;
    email: string;
  }

  const toast = useToast();
  const usersList = ref<User[]>([]);
  const loading = ref(false);
  const nextPageUrl = ref<string | null>(null); // 'null' means there's no next page yet

  const searchUsers = async (searchQuery: string) => {
    loading.value = true;

    try {
      const response = await axiosInstance.post("/user", {
        search: searchQuery,
      });

      usersList.value = response.data.data;
      nextPageUrl.value = response.data.next_page_url; // Check if there's a next page
    } catch (err: any) {
      toast.add({
        id: "errorFetchingUsers",
        color: "red",
        description:
          err.response?.data?.message ||
          "An error occurred while fetching users.",
      });
    } finally {
      loading.value = false;
    }
  };

  const loadMoreUsers = async () => {
    if (!nextPageUrl.value) return;

    try {
      const response = await axiosInstance.post(nextPageUrl.value);
      console.log(response.data.data);
      usersList.value.push(...response.data.data);
      nextPageUrl.value = response.data.next_page_url;
    } catch (err: any) {
      toast.add({
        id: "errorLoadingMoreUsers",
        color: "red",
        description: err.response?.data?.message || "Error loading more users.",
      });
    }
  };

  return {
    usersList,
    loading,
    nextPageUrl,
    searchUsers,
    loadMoreUsers,
  };
};
