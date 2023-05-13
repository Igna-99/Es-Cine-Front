<script setup>

import {useRoute} from "vue-router"
const router = useRoute();
const id = router.params.id.toString();
</script>

<template>
    <h1>
        
        Pelicula</h1>
    
        <router-link class="btn btn-primary" to="/">Volver</router-link>
        
</template>

