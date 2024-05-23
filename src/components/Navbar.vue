<template>
    <header>
        <div class="nav-links"> <router-link to="/promociones">PROMOCIONES</router-link> </div>

        <div class="nav-links"> <router-link to="/">CARTELERA</router-link> </div>

        <div class="logo"> <img src="../assets/svgs/CineLogo.svg" alt="Logo"> </div>

        <div v-if="!usrStore.isLogged" class="nav-links"> <router-link to="/registro"> REGISTRARSE </router-link> </div>
        <div v-else class="nav-links"> <router-link to="/reservasUsuario"> MIS RESERVAS </router-link> </div>

        <div v-if="!usrStore.isLogged" class="nav-links"> <router-link to="/login"> INICIAR SESION </router-link> </div>
        <div v-else class="nav-links"> <router-link to="/detallesUsuario"> {{ usrStore.currentUser.nombre }} </router-link>
        </div>

        <h1 class="titulo-sm"> Cine </h1>

        <span @click="opneNavMenu" class="btn-menu"> MENU </span>

        <div class="overlay" id="mobile-menu">
            <span @click="closeNavMenu" class="close">&times;</span>

            <div class="overlay-content" style="height: 100%;">

                <router-link @click="closeNavMenu" to="/">CARTELERA</router-link>
                <router-link @click="closeNavMenu" to="/promociones">PROMOCIONES</router-link>

                <div v-if="!this.usrStore.isLogged" class="overlay-option">
                    <router-link @click="closeNavMenu" to="/registro"> REGISTRARSE </router-link>
                    <router-link @click="closeNavMenu" to="/login"> INICIAR SESION </router-link>
                </div>

                <div v-else class="overlay-option">
                    <router-link @click="closeNavMenu" to="/reservasUsuario"> MIS RESERVAS </router-link>
                    <router-link @click="closeNavMenu" to="/detallesUsuario"> {{ usrStore.currentUser.nombre
                    }}</router-link>

                </div>

            </div>
        </div>

    </header>
</template>

<script>
import { usrStore } from '../components/store/usrStore'

export default {
    data() {
        return {
            usrStore: usrStore(),
        }
    },
    methods: {
        opneNavMenu() {
            document.body.style.overflow = "hidden"
            document.getElementById("mobile-menu").style.width = "100%"
        },
        closeNavMenu() {
            document.body.style.overflow = "auto";
            document.getElementById("mobile-menu").style.width = "0%"
        }
    },
}

</script>

<style scoped>
header {
    display: grid;
    grid-template-columns: 2fr 2fr 1fr 2fr 2fr;
    background-color: black;

    transition: 1s;
    width: 80%;
    max-width: 1400px;
    
    margin: 0 auto;

    padding: 5px 2%;
    border-radius: 5px;
    margin-top: 5px;
    font-family: "Montserrat", sans-serif;
    text-transform: uppercase;
    user-select: none;
}

header a {
    text-decoration: none;
}

.nav-links {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0;
    padding: 0;
    white-space: nowrap;
}

header .nav-links a {
    padding: 3px 25px;
    font-size: 1.5rem;
    color: #ffffff;
    border-radius: 2px;
    letter-spacing: 0.1rem;
    transition: 0.5s;
    z-index: 1;

    font-size: 12px;
}   

.router-link-active {
    font-weight: 800 !important;
    background-image: linear-gradient(92.88deg, #324483 9.16%, #3d3092 43.89%, #43288d 64.72%);
}

.logo {
    margin: auto 0;
    text-align: center;
    border-radius: 50%;
}

.logo img {
    height: auto;
    width: 35px;
}

.btn-menu {
    display: none;
    justify-content: center;
    align-items: center;

    width: 90px;
    height: 40px;

    margin: auto; 
    margin-right: 0;

    background-color: #000;
    color: #ffffff;

    border: 2px solid #ffffff;
    border-radius: 5px;
}

.btn-menu:hover {
    background-color: #ffffff;
    color: #000000;
}

.titulo-sm {
    display: none;
    color: #ffffff;
    margin: auto;
    font-weight: 700;
    text-align: center;
}



@media screen and (max-width:1000px) {
    header {
        width: 100%;
        min-width: 1pc;
        margin-top: 0px;

        grid-template-columns: 1fr 3fr 1fr;

        height: 60px;
        padding: 5px 2%;
        border-radius: 0px 0px 8px 8px;
        transition: 1s;
    }

    .logo {
        text-align: center;

    }

    .logo img {
        display: block;
        width: 50px;
        height: auto;
    }

    .nav-links {
        display: none;
    }

    .btn-menu {
        display: flex;
    }

    .titulo-sm {
        display: inherit;
    }

}

/* Menu nav */

header .overlay {
    height: 100%;
    width: 0;
    position: fixed;
    z-index: 3;
    left: 0;
    top: 0;
    background-color: #202020e7;
    overflow: hidden;
    transition: all 0.3s;
}

header .overlay .overlay-content {
    display: flex;
    height: 100%;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    white-space: nowrap;

}

header .overlay .overlay-option {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

}

header .overlay a {
    padding: 15px;
    font-size: 36px;
    display: block;
    transition: all 0.3s ease 0s;
    font-weight: 700;
    color: #ffffff;

    border-radius: 5px;
}

header .overlay .close {
    position: absolute;
    top: 5px;
    right: 5px;
    font-size: 65px;
}



.close {
    color: #ffffff;

    cursor: pointer;
    padding: 5px 20px;
    border-radius: 5px;
    font-weight: 700;
}



@media screen and (max-height:450px) {

    .header .overlay a {
        font-size: 20px;
    }

    .header .overlay .close {
        top: 15px;
        right: 35px;
        font-size: 40px;
    }
}
</style>
  
  