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
    #2f407c 9.16%,
    #3e3196 43.89%,
    #4a2d9b 64.72%
  );
  border: 0;
  border-radius: 8px;
  box-shadow: 0 5px 30px -5px rgba(151, 65, 252, 0.2);
  box-sizing: border-box;
  color: #ffffff;
  display: flex;
  justify-content: center;
  line-height: 1em;
  max-width: 100%;
  min-width: 140px;
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
  background-color: rgb(15, 15, 27);
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

button:disabled {
  background-image: linear-gradient(
    92.88deg,
    rgba(66, 89, 172, 0.6) 9.16%,
    rgba(82, 66, 189, 0.6) 43.89%,
    rgba(95, 61, 190, 0.6) 64.72%
  );
  cursor: default;
  color: rgb(119, 119, 119);
}

button:disabled span {
  background-color: rgb(15, 15, 27);
}


@media (min-width: 768px) {
  button {
    min-width: 196px;
  }
}
</style>
