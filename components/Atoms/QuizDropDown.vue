<script setup lang="ts">
import { useViewAllAttemptStore } from "@/stores/view-all-attempt";
import { handleShareModal } from "@/composables/useShareWith";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/css/index.css";

const props = defineProps({
  quiz_id: {
    type: Number,
    required: true,
  },
});

const router = useRouter();
const viewAllAttemptStore = useViewAllAttemptStore();

const {
  isModalOpen,
  selectedUsers,
  handleUpdateShareWith,
  shareAction,
  circleLoading,
} = handleShareModal(props.quiz_id);

const items = [
  [
    {
      label: "View all attempts",
      icon: "i-heroicons-eye-16-solid",
      click: () => {
        viewAllAttemptStore.forgetData();
        viewAllAttemptStore.setQuizId(props.quiz_id);
        router.push("/view-all-attempt");
      },
    },
    {
      label: "Share",
      icon: "i-heroicons-pencil-square-20-solid",
      click: () => {
        isModalOpen.value = true;
      },
    },
    {
      label: "Delete",
      icon: "i-heroicons-trash-20-solid",
      click: () => {
        console.log("Delete");
      },
    },
  ],
];

const emit = defineEmits(["hover", "leave"]);

const handleMouseEnter = () => {
  emit("hover");
};

const handleMouseLeave = () => {
  emit("leave");
};

const handleDropdownClick = (event: Event) => {
  event.stopPropagation();
};
</script>

<template>
  <div class="vl-parent">
    <div v-if="circleLoading">
      <loading v-model:active="circleLoading" is-full-page :opacity="0.2" />
    </div>

    <!-- Share Modal -->
    <MoleculesShareModal
      v-model="isModalOpen"
      :shareWith="selectedUsers"
      :quiz-id="props.quiz_id"
      @update-share-with="handleUpdateShareWith"
      @share="shareAction"
    />

    <div
      @mouseenter="handleMouseEnter"
      @mouseleave="handleMouseLeave"
      @click.stop="handleDropdownClick"
    >
      <UDropdown :items="items" :popper="{ placement: 'bottom-start' }">
        <UButton
          icon="i-heroicons-ellipsis-vertical"
          size="sm"
          color="black"
          variant="ghost"
          class="hover:bg-slate-100 dark:hover:bg-slate-700"
        />
      </UDropdown>
    </div>
  </div>
</template>
