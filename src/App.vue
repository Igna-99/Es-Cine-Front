<script setup>

    import Navbar from './components/Navbar.vue'
    import { usrStore } from './components/store/usrStore'
    import { onMounted } from 'vue'

    onMounted(() => {
        let store = usrStore()
        store.cargarDataStorage()
    })

</script>

<template>

  <Navbar />

  <div class="componentes">
    <RouterView></RouterView>
  </div>

</template>

<style>

    @import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap");

    .componentes {
        margin-top: 110px;
    }

</style>

