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
  <button :disabled="this.disabled">
    <span>
      <slot />
    </span>
  </button>
</template>

<style scoped>
button {
  align-items: center;
  background-image: linear-gradient(
    92.88deg,
    #7c2f2f 9.16%,
    #963131 43.89%,
    #9b2d2d 64.72%
  );
  border: 0;
  border-radius: 8px;
  box-shadow: 0 5px 30px -5px rgba(190, 136, 136, 0.2);
  box-sizing: border-box;
  color: #ffffff;
  display: flex;
  justify-content: center;
  line-height: 1em;
  max-width: 100%;
  min-width: 196px;
  padding: 2px;
  text-decoration: none;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  cursor: pointer;
}

button:active,
button:hover {
  outline: 0;
}

button span {
  background-color: rgb(27, 15, 15);
  font-size: 20px;
  font-weight: 600;
  padding: 14px 22px;
  border-radius: 6px;
  width: 100%;
  height: 100%;
  transition: 300ms;
  line-height: 1.3;
}

button:hover span {
  background: none;
}
</style>
