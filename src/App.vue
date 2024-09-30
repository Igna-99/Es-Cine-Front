<script setup>

import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
import { usrStore } from './components/store/usrStore'
import { onMounted } from 'vue'

onMounted(() => {
  let store = usrStore();
  store.reiniciarSesion();
});
</script>

<template>
  <Navbar />

  <div class="w-full px-2 component min-h-screen max-w-[1400px] md:w-4/5">
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

  display: block;
  overflow-x: hidden;
}

</style>
