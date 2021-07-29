<template>
  <div class="mt-4 w-full sm:w-96 p-2 mx-auto">
    <BaseInput
      placeholderText="e.g. Bench Press for 5 sets at 135lb"
      :value="exerciseInput"
      @input="handleExerciseInputChange"
    />
  </div>

  <div
    v-for="workSet in workSets"
    :key="workSet.exerciseName + workSet.setOrder"
  >
    {{ workSet.setOrder }} {{ workSet.exerciseName }} at
    {{ workSet.weight }}
  </div>
</template>

<script lang="ts">
import { ref, defineComponent } from "vue";
import BaseInput from "./components/BaseInput.vue";
import PrimaryButton from "./components/PrimaryButton.vue";
import type { WorkSet } from "./domain/index";
import { parseExercise } from "./domain/index";

export default defineComponent({
  name: "App",
  components: {
    BaseInput,
    PrimaryButton,
  },
  computed: {},
  methods: {
    handleExerciseInputChange(event: Event) {
      if (event !== null) {
        // Need to recast here as TypeScript does not recognize target as HTMLInputElement
        const target = <HTMLInputElement>event.target;
        this.exerciseInput = target?.value;
      }
      this.workSets = parseExercise(this.exerciseInput);
    },
    formatWorkSetRef(id: String) {
      return `workSet${id}`;
    },
  },
  created() {
    this.handleExerciseInputChange(null);
  },
  setup() {
    const workSets = ref<Array<WorkSet>>([]);
    const exerciseInput = ref("Bench press for 5 sets at 135 lb");

    return {
      workSets,
      exerciseInput,
    };
  },
});
</script>

<style>
html {
  @apply bg-white;
}

#app {
  font-family: "Helvetica-Neue", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin: 0 auto;
}
</style>
