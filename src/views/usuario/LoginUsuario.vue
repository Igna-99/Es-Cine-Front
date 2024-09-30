<script>
import { usrStore } from "../../components/store/usrStore";
import PrimaryButton from "../../components/buttons/PrimaryButton.vue";

export default {
  components: {
    PrimaryButton,
  },
  data() {
    return {
      usrStore: usrStore(),
      error: false,
      msjError: "",
      email: "",
      contraseña: "",
    };
  },
  mounted() {
    if (this.usrStore.isLogged) {
      this.$router.push({ name: "usuario" });
    }

    document.title = "Iniciar Sesion";
  },
  updated() {
    if (this.usrStore.isLogged) {
      this.$router.push({ name: "usuario" });
    }
  },
  methods: {
    async ingresar() {
      if (this.email == "" || this.contraseña == "") {
        this.error = true;
        this.msjError = `email o contraseña no ingreados`;
      } else {
        let mensajeError = await this.usrStore.logIn(this.email, this.contraseña);

        if (mensajeError == null) {
          this.error = false;
          this.$router.push({ name: "usuario" });
        } else {
          this.error = true;
          this.msjError = mensajeError;
        }
      }
    },

    salir() {
      this.usrStore.logOut();
    },
  },
};
</script>

<template>
  <div v-if="usrStore.isLogged" class="">
    <h1>you are already logged in</h1>
  </div>

  <div v-else class="menus-border max-w-lg">
    <div class="container_basic gap-y-4 py-5">
      <h1 class="neon-text text-4xl text-center pb-2">INICIAR SESION</h1>

      <div class="input_box w-full max-w-96">
        <input type="text" required v-model="this.email" />
        <span>email</span>
      </div>

      <div class="input_box w-full max-w-96">
        <input type="password" required v-model="this.contraseña" />
        <span>Contraseña</span>
      </div>

      <PrimaryButton @click="ingresar">Iniciar Sesión</PrimaryButton>

      <div
        v-if="this.error"
        class="p-4 text-md text-red-800 rounded-lg dark:bg-red-200"
        role="alert"
      >
        <span class="font-semibold">{{ this.msjError }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.input_login {
  width: 100%;
  max-width: 420px;
}
</style>
