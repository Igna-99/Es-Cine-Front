<script setup>
import Navbar from './components/Navbar.vue'
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
      <Navbar />
</template>
<style>
  @import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap");
</style>

