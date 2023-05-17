<script>
import { useRouter } from 'vue-router'
import { usrStore } from '../../components/store/usrStore'

export default {
    data() {
        return {
            store: usrStore(),
            router: useRouter()
        }
    },
    methods: {
        navegar(id) {
            this.router.push(
                { path: "/DetallesUsuario/" + id }
            )

        }


    }

}

</script>

<template>
    <h1>USUARIOSasd</h1>

    <ul class="">
        <li class="" v-for="usuario in this.store.listaDeUsuarios">
            <p @click="navegar(usuario.id)" > {{ usuario.name }}</p>
        </li>

    </ul>
</template>
