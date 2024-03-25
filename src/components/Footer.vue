<script setup>
import { IconBrandFacebook, IconBrandInstagram, IconBrandX, IconBrandWhatsapp } from '@tabler/icons-vue';
</script>

<template>

    <footer class="footer-container">

        <div class="row">

            <div class="col">
                <img src="../assets/CineLogo.svg" alt="Descripción del SVG" class="logo">
            </div>

            <div class="col">
                <h4 class="neon-text">Informacion</h4>
                <p>Av Falsa 123</p>
                <p>Almagro</p>
                <p>Ciudad de Buenos Aires</p>
                <p class="email-p">cienapp@esCine.com.ar</p>

            </div>

            <div class="col">
                <h4 class="neon-text">Redes</h4>
                <div class="social">
                    <a href="https://www.facebook.com" target="_blank">
                        <IconBrandFacebook class="fab" size="40" stroke="2" />
                    </a>
                    <a href="https://www.instagram.com" target="_blank">
                        <IconBrandInstagram class="fab" size="40" stroke="2" />
                    </a>
                    <a href="https://www.x.com" target="_blank">
                        <IconBrandX class="fab" size="40" stroke="2" />
                    </a>
                    <a href="https://www.whatsapp.com" target="_blank">
                        <IconBrandWhatsapp class="fab" size="40" stroke="2" />
                    </a>

                </div>

            </div>


        </div>

        <hr>

        <p class="copyright"> ORT Dev Team © 2023 - All Rights Reserved</p>

    </footer>

</template>

<style scoped>
footer {
    background: linear-gradient(to left, #000629, #000000);
    width: 100%;
    padding: 80px 0 30px;
    border-radius: 25px 25px 0px 0px;
    font-size: 13px;
    line-height: 20px;
    color: #c5c5c5;
}

footer p {
    cursor: default;

}

.row {
    width: 85%;
    height: 100%;
    margin: auto;
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    justify-content: space-between;
}

.col {
    flex-basis: 25%;
    padding: 10px;
}

.col h4 {
    font-size: 25px;
    -webkit-text-stroke: 1px white;
    margin-bottom: 20px;
}

.logo {
    user-select: none;
    width: 130px;
}

.email-p {
    width: fit-content;
    margin: 15px 0;
    border-bottom: 1px solid;
    font-weight: 900;
}

.social {
    display: flex;
    justify-content: space-between;
}

.social a {
    color: white;
}

.social a:hover {
    color: rgb(206, 206, 206);
}

hr {
    width: 90%;
    border: 0;
    border-bottom: 1px solid #ccc;
    margin: 20px auto;
}

.copyright {

    text-align: center;
}

@media (max-width: 1000px) {
    footer {
        padding: 50px 0 25px;
    }


}

@media (max-width: 500px) {

    footer {
        padding: 35px 0 20px;
    }

    .col {
        padding: 10px 2px;
    }

}
</style>
