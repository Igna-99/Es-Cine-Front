<script>
export default {
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<template>
  <button
    :disabled="this.disabled"
    type="button"
    class="text-white focus:ring-4 font-semibold rounded-lg text-base md:text-sm px-5 py-2.5 me-2 focus:outline-none"
  >
    <slot />
  </button>
</template>

<style scoped>
button {
  background-color: rgb(74, 45, 155);
  cursor: pointer;
}

button:disabled {
  background-color: rgb(149, 141, 199);
  cursor: inherit;
}

button:disabled:hover {
  background-color: rgb(149, 141, 199);
}

button:hover {
  background-color: #3d2580;
}

button:focus {
  --tw-ring-opacity: 0.45;
  --tw-ring-color: rgb(74 45 155 / var(--tw-ring-opacity));
}
</style>
