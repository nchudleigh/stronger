<template>
  <div class="mt-4 w-96 mx-auto">
    <div v-for="set in workSets" :key="set.id" class="mt-4">
      <BaseInput placeholderText="Overhead Press @ 95lb x 5" />
    </div>
    <PrimaryButton
      class="mt-4"
      buttonText="Add a work set"
      @buttonClick="handleAddWorkSet"
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
    handleAddWorkSet() {
      const newWorkSet: WorkSet = {
        id: generateID(),
      };

      this.workSets.push(newWorkSet);
      console.log();
    },
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
