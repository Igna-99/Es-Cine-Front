
<template>
    <nav class="navbar">
        <ul class="nav-links">
            <li><router-link to="/cartelera">CARTELERA</router-link></li>
            <li><router-link to="/">HOME</router-link></li>
            <li>
                <div class="logo">
                    <img src="../assets/movie-logo.png" alt="Logo">
                </div>
            </li>
            <li v-if="!usrStore.isLogged"> <router-link to="/registro"> REGISTRARSE </router-link> </li>
            <li v-if="usrStore.isLogged"> <router-link to="/reservasUsuario"> MIS RESERVAS </router-link> </li>
            <li v-if="!usrStore.isLogged"> <router-link to="/login"> INICIAR SESION </router-link> </li>
            <li v-if="usrStore.isLogged"> <router-link to="/detallesUsuario"> {{usrStore.currentUser.nombre}} </router-link> </li>
        </ul>
    </nav>
</template>

<script>

    import { usrStore } from '../components/store/usrStore'

    export default {
        data() {
            return {
                usrStore: usrStore(),
            }
        },
    }

</script>

<style scoped>
    .navbar {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 10px;
        z-index: 999;
        transition: background-color 0.3s ease;
    }

    .logo {
        width: 50px;
        height: 50px;
        border-radius: 50%;
    }

    .logo img {
        display: block;
        width: 35px;
        height: auto;
        margin-top: -5px;
    }

    .nav-links {
        position: relative;
        list-style: none;
        margin: 0;
        border-radius: 5px;
        display: inline-flex;
        background-color: black;
        height: 45px;
    }

    .nav-links li a {
        position: relative;
        padding: 5px 30px;
        font-size: 1.5rem;
        color: #ffffff;
        border-radius: 2px;
        text-decoration: none;
        text-transform: uppercase;
        letter-spacing: 0.1rem;
        transition: 0.5s;
        z-index: 1;
        font-family: "Montserrat", sans-serif;
        font-size: 12px;
    }

    .router-link-active {
        font-weight:800 !important;
        color: #000 !important;
        background: rgb(255, 255, 255);
    }

    li {
        margin: 0px 35px;
        padding: 10px;
    }

    .nav-links a:hover {
        font-weight: bold;
        color: #000 !important;
        transform: scale(1);
        box-shadow: 0 0 5px rgb(170, 170, 170),
        0 0 15px rgb(161, 161, 161),
        0 0 30px rgb(224, 224, 224);
        background: rgb(255, 255, 255);
    }
    
    li:active {
        transform: translateY(4px);
    }

    @media (max-width: 768px) {
        .navbar {
            flex-direction: column;
        }
        .logo {
            margin-bottom: 10px;
        }
    }

</style>
  
  