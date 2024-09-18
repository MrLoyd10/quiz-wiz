import axiosInstance from "@/utils/axios";

export const useShareWith = () => {
  interface User {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
  }

  const toast = useToast();
  const usersList = ref<User[]>([]);
  const loading = ref(false);
  const nextPageUrl = ref<string | null>(null); // 'null' means there's no next page yet

  const searchUsers = async (searchQuery: string) => {
    loading.value = true;

    try {
      const response = await axiosInstance.post("api/search-user", {
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

export function handleShareModal(quiz_id: number) {
  const toast = useToast();
  const circleLoading = ref(false);
  const isModalOpen = ref(false);
  const selectedUsers = ref([]);

  function handleUpdateShareWith(users: any) {
    selectedUsers.value = users;
  }

  async function shareAction() {
    if (selectedUsers.value.length === 0) {
      toast.add({
        id: "noUsersSelected",
        color: "yellow",
        description: "Please select at least one user to share with.",
      });
      return;
    }

    try {
      circleLoading.value = true;
      const sharedWithUserIds = selectedUsers.value.map(
        (user: { id: number }) => user.id
      );
      const response = await axiosInstance.post("/api/share-quiz", {
        quiz_id: quiz_id,
        shared_with_user_ids: sharedWithUserIds,
      });

      toast.add({
        id: "shareSuccess",
        color: "green",
        description: response.data.message,
      });
    } catch (error: any) {
      console.error(error);
      toast.add({
        id: "shareError",
        color: "red",
        description:
          error.response?.data?.message || "Error sharing with users.",
      });
    } finally {
      circleLoading.value = false;
    }

    isModalOpen.value = false;
    await nextTick();
  }

  return {
    circleLoading,
    isModalOpen,
    selectedUsers,
    handleUpdateShareWith,
    shareAction,
  };
}
