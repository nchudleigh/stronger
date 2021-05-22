<template>
  <div class="shadow-lg">
    <input
      class="
        h-8
        w-full
        p-4
        border-2 border-gray-100
        rounded
        focus:outline-none
        focus:ring-2 focus:ring-green-100
      "
      :placeholder="placeholderText"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "BaseInput",
  props: {
    placeholderText: String,
  },
});
</script>
