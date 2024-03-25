<script setup>

import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
import { usrStore } from './components/store/usrStore'
import { onMounted } from 'vue'

onMounted(() => {
  let store = usrStore()
  store.reiniciarSesion()
})

</script>

<template>
  <Navbar />

  <div class="component">
    <RouterView></RouterView>
  </div>

  <Footer />
</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap");

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.component {
  width: 80%;
  min-height: 95vh;
  margin: 0 auto;
  padding: 0;
  display: block;
  overflow-x: hidden;
}

@media screen and (max-width:1000px) {
  .component {
    width: 100%;
  }
}
</style>
