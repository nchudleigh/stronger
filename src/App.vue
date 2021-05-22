<template>
  <div class="mt-4 w-full sm:w-96 p-2 mx-auto">
    <div v-for="(workSet, index) in workSets" :key="workSet.id" class="mt-4">
      <BaseInput
        :ref="`workSet${workSet.id}`"
        placeholderText="Overhead Press @ 95lb x 5reps"
        @keyup.enter="addWorkSet"
        @keyup.backspace="removeWorkSet(index)"
      />
    </div>
    <PrimaryButton
      class="mt-4"
      buttonText="ADD WORK SET"
      @buttonClick="addWorkSet"
    />
  </div>
</template>

<script lang="ts">
import { ref, defineComponent } from "vue";
import BaseInput from "./components/BaseInput.vue";
import PrimaryButton from "./components/PrimaryButton.vue";

type WorkSet = {
  id: String;
};

const generateID = (): String => (Math.random() * 2 ** 32).toString(32);

export default defineComponent({
  name: "App",
  components: {
    BaseInput,
    PrimaryButton,
  },
  methods: {
    addWorkSet(index) {
      const newWorkSet: WorkSet = {
        id: generateID(),
      };

      this.workSets.splice(index, 0, newWorkSet);
    },
    removeWorkSet(index: Number) {
      // remove the backspaced list item
      this.workSets.splice(index, 1);
      // get the ID of the new focus target
      const focusTargetID = this.workSets[index - 1].id;
      // focus preceding list item
      this.$refs[`workSet${focusTargetID}`].$el.focus();
    },
  },
  created() {
    this.addWorkSet(0);
  },
  setup() {
    const workSets = ref<Array<WorkSet>>([]);

    return {
      workSets,
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
