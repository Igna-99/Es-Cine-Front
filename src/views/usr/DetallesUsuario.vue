<script>
import { useRoute, useRouter } from 'vue-router'

export default {
  data() {
    return {
      route: useRoute()
    }
  },
  methods: {


  }

}

</script>

<template>
    <h1>detalles del usuario {{ this.route.params.id }}</h1>
    
        
</template>
