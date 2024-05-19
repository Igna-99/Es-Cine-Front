<script setup>
import DiscountCard from '../components/DiscountCard.vue'

document.title = "Promociones"

</script>

<template>
    <section class="promo-section">
        <div class="neon-text-container text-cartelera">
            <h2 class="neon-text tittles-promo">Promociones</h2>
        </div>

        <div class="promos-container">

            <DiscountCard color1="69, 41, 214" color2="151, 130, 255" date="6/3/25" title="15% Off"
                subTitle="15% de descuento con tarjetas Visa"
                description="Promocion valida para tarjetas Visa de credito y debito">

                <img src="../assets/svgs/visa.svg" alt="" class="icon" draggable="false">

            </DiscountCard>

            <DiscountCard color1="236,8,34" color2="247,161,34" date="21/7/25" title="10% Off"
                subTitle="10% de descuento con tarjetas MasterCard"
                description="Promocion valida para tarjetas MasterCard de credito y debito">

                <img src="../assets/svgs/master.svg" alt="" class="icon" draggable="false">

            </DiscountCard>

            <DiscountCard color1="7,162,119" color2="67,229,180" date="31/10/26" title="2 x 1 "
                subTitle="2 x 1 en entradas de cine pagando con Google Pay"
                description="Promocion valida para pagos realizados con google pay">

                <img src="../assets/svgs/googlePay.svg" alt="" class="icon" draggable="false">

            </DiscountCard>

            <DiscountCard color1="39,146,216" color2="112,192,252" date="1/1/27" title="30% Off"
                subTitle="30% de descuento con tarjetas American Express"
                description="Promocion valida para tarjetas American Express de credito y debito">

                <img src="../assets/svgs/amex.svg" alt="" class="icon" draggable="false"> 

            </DiscountCard>

        </div>
    </section>
</template>

<style scoped>
.tittles-promo {
    margin: 20px 0;
    font-size: 3rem;
}

.promos-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    row-gap: 25px;
    column-gap: 10px;
    justify-items: center;

    margin: auto;
    width: 98%;
    max-width: 1080px;
}

.icon {
    position: absolute;
    width: 170px;
    top: 50%;
    right: -60px;
    transform: translate(-50%, -50%);
    opacity: 0.2;
}

@media (max-width: 850px) {
    .promos-container {
        grid-template-columns: 1fr;
        gap: 40px;
    }

    .tittles-promo {
        font-size: 2.5rem;
    }
}

@media (max-width: 360px) {
    .icon {
        width: 150px;
        top: 50%;
        right: -60px;
    }
}
</style>
