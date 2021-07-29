<template>
  <div class="mt-4 w-full sm:w-96 p-2 mx-auto">
    <BaseInput
      placeholderText="e.g. Bench Press for 5 sets at 135lb"
      :value="exerciseInput"
      @input="handleExerciseInputChange()"
    />
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
    handleExerciseInputChange() {
      this.exerciseInput = this.workSets = parseExercise(this.exerciseInput);
      console.log(this.workSets);
    },
    formatWorkSetRef(id: String) {
      return `workSet${id}`;
    },
    removeWorkSet(id: String) {
      const workSet = this.getWorkSetById(id);
      if (workSet === null) return;

      const focusTargetRef = this.formatWorkSetRef(workSet.id);
      // focus preceding list item
      const focusTargetComponent = this.$refs[focusTargetRef];
      if (focusTargetComponent === null) return;

      // remove the backspaced list item
      this.workSets.splice(index, 1);

      if (focusTargetComponent.$el) {
        focusTargetComponent.$el.focus();
      }
    },
  },
  created() {
    this.addWorkSet(0);
  },
  created() {},
  setup() {
    const workSets = ref<Array<WorkSet>>([]);
    const exerciseInput = ref("Bench Press at 185lb");

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
