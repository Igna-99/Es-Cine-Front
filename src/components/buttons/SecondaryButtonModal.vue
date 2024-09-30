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
  background-color: rgb(95, 95, 95);
}

button:hover {
  background-color: rgb(85, 85, 85);
}

button:focus {
  --tw-ring-opacity: 0.45;
  --tw-ring-color: rgb(100 100 100 / var(--tw-ring-opacity));
}
</style>
