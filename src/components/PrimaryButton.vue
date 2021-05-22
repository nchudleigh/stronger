<template>
  <button
    class="
      w-full
      py-2
      rounded-md
      font-semibold
      text-white
      bg-blue-500
      focus:outline-none
      focus:ring-4 focus:ring-blue-700
    "
    @click="handleClick"
  >
    {{ buttonText }}
  </button>
</template>

<script>
import { ref, defineComponent } from "vue";
export default defineComponent({
  name: "BaseInput",
  props: {
    buttonText: String,
  },
  methods: {
    handleClick() {
      console.log("handleClick");
      this.$emit("buttonClick");
    },
  },
});
</script>

<style></style>
