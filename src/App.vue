<script>
import { useRouter } from 'vue-router'
import { usrStore } from './components/store/usrStore'

export default {
  data() {
    return {
      store: usrStore(),
    }
  },
  methods: {


  },
  created: async function () {
    this.store.fetchDataPromise()

    .then(() =>{
       
      })
  }

}

</script>

<template>

  <nav class="navbar navbar-expand-lg bg-body-tertiary bg-dark fixed-top" data-bs-theme="dark">
    <div class="container-fluid">
      <h1 class="navbar-brand">Cine ORT</h1>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link class="nav-link active" to="/"> Home</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link active" to="/usuarios"> Usuarios</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link active" to="/reserva"> reserva</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>

  <div class="contenido">
    <RouterView></RouterView>
  </div>
</template>

<style scoped>
.contenido{
  margin-top: 56px;
}


</style>
