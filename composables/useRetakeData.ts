import axiosInstance from "~/utils/axois"; // Ensure the correct import path

export const useRetakeData = (isLoading: Ref<boolean>) => {
  const retake = ref({
    id: -1,
    title: "",
    description: "",
    number_questions: -1,
    questions: [],
  });

  const getRetakeData = async (quiz_id: number) => {
    try {
      isLoading.value = true;
      const response = await axiosInstance.post("/retake-data", {
        quiz_id: quiz_id,
      });
      retake.value.id = response.data.id;
      retake.value.title = response.data.title;
      retake.value.description = response.data.description;
      retake.value.number_questions = response.data.questions.length;
      retake.value.questions = response.data.questions;
    } catch (error: any) {
      console.log("Error fetching retake data:", error.message || error);
    } finally {
      isLoading.value = false;
    }
  };

  return {
    retake,
    getRetakeData,
  };
};
