<template>
  <input
    class="
      h-8
      w-full
      p-4
      bg-gray-100
      border-2 border-gray-200
      rounded
      focus:outline-none
      focus:ring-2 focus:ring-blue-300
    "
    :placeholder="placeholderText"
  />
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "BaseInput",
  inheritAttrs: false,
  props: {
    placeholderText: String,
    value: String,
  },
});
</script>
