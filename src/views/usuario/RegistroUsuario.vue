<script>
import { usrStore } from "../../components/store/usrStore";
import PrimaryButton from "../../components/PrimaryButton.vue";

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

  <div v-else class="borde_doble tamaño_s">
    <div class="container_basic container_flex">
      <div class="neon-text-container">
        <h1 class="neon-text title-menus">REGISTRO</h1>
      </div>

      <div class="container-responsive-inputs">
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

      <div v-if="this.error1" class="alert alert-danger" role="alert">
        <span class="errorSpam"> debe completar todos los campos </span>
      </div>
      <div v-if="this.error2" class="alert alert-danger" role="alert">
        <span class="errorSpam"> las contraseñas no coinciden </span>
      </div>
      <div v-if="this.error3" class="alert alert-danger" role="alert">
        <span class="errorSpam"> {{ this.msjError3 }} </span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.neon-text {
  margin: 30px 0px 15px 0px;
}

.container-responsive-inputs {
  display: flex;
  flex-direction: row;
  align-items: center;
  column-gap: 20px;
  width: 95%;
}

.input_registro {
  width: 95%;
  margin: 15px 0px;
}

.container_basic button {
  margin: 15px 0px;
}

@media (max-width: 750px) {
  .container-responsive-inputs {
    display: flex;
    flex-direction: column;
    column-gap: 0px;
    width: 100%;
  }
}
</style>
