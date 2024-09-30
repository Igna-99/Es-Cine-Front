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
      nombre: "",
      apellido: "",
      email: "",
      contraseña: "",
      contraseñaRep: "",
      error1: false,
      error2: false,
      error3: false,
      msjError3: "",
    };
  },
  methods: {
    async registrse() {
      if (
        this.nombre == "" ||
        this.apellido == "" ||
        this.email == "" ||
        this.contraseña == "" ||
        this.contraseñaRep == ""
      ) {
        this.error1 = true;
        this.error2 = false;
        this.error3 = false;
      } else if (this.contraseña != this.contraseñaRep) {
        this.error1 = false;
        this.error2 = true;
        this.error3 = false;
      } else {
        let mensaje = await this.usrStore.registrarse(
          this.nombre,
          this.apellido,
          this.email,
          this.contraseña
        );

        if (mensaje == null) {
          this.error1 = false;
          this.error2 = false;
          this.error3 = false;

          alert("te has registrado exitosamente");
          this.$router.push({ name: "login" });
        } else {
          this.error1 = false;
          this.error2 = false;
          this.error3 = true;
          this.msjError3 = mensaje;
        }
      }
    },
    salir() {
      this.usrStore.logOut();
    },
  },
  created() {
    document.title = "Registro";
  },
};
</script>

<template>
  <div v-if="usrStore.isLogged" class="container">
    <h1>you are already logged in</h1>
  </div>

  <div v-else class="menus-border max-w-lg">
    <div class="container_basic gap-y-4 py-5">
      <h1 class="neon-text text-4xl text-center pb-2">REGISTRARSE</h1>

      <div class="container-responsive-inputs ">
        <div class="input_box input_registro">
          <input type="text" required v-model="this.nombre" />
          <span>Nombre</span>
        </div>

        <div class="input_box input_registro">
          <input type="text" required v-model="this.apellido" />
          <span>Apellido</span>
        </div>
      </div>

      <div class="input_box input_registro">
        <input type="text" required v-model="this.email" />
        <span>Email</span>
      </div>

      <div class="input_box input_registro">
        <input type="password" required v-model="this.contraseña" />
        <span>contraseña</span>
      </div>

      <div class="input_box input_registro">
        <input type="password" required v-model="this.contraseñaRep" />
        <span>Repite Contraseña</span>
      </div>

      <PrimaryButton @click="registrse">Iniciar Sesión</PrimaryButton>

      <div
        v-if="this.error1"
        class="p-4 mb-4 text-md text-red-800 rounded-lg dark:bg-red-200"
        role="alert"
      >
        <span class="font-semibold">debe completar todos los campos</span>
      </div>

      <div
        v-if="this.error2"
        class="p-4 mb-4 text-md text-red-800 rounded-lg dark:bg-red-200"
        role="alert"
      >
        <span class="font-semibold">las contraseñas no coinciden</span>
      </div>

      <div
        v-if="this.error3"
        class="p-4 mb-4 text-md text-red-800 rounded-lg dark:bg-red-200"
        role="alert"
      >
        <span class="font-semibold">{{ this.msjError3 }}</span>
      </div>

    </div>
  </div>
</template>

<style scoped>
.container-responsive-inputs {
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 420px;
  flex-direction: column;
  column-gap: 0px;
  row-gap: 16px;
}

.input_registro {
  width: 100%;
  max-width: 420px;
}

@media (min-width: 768px) {
  .container-responsive-inputs {
    flex-direction: row;
    column-gap: 20px;
  }
}
</style>
