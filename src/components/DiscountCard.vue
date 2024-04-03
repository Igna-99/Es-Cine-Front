<script setup>
import { ref } from 'vue';
const props = defineProps({
    title: String,
    date: String,
    subTitle: String,
    description: String,
    color1: String,
    color2: String,
})

const backgoundGradientColors = ref(`background: linear-gradient(to right, rgb(${props.color1}), rgb(${props.color2})`)

</script>

<template>
    <div class="promo-card">
        <div class="main" :style="backgoundGradientColors">

            <p class="date"> valido hasta el {{ date }} </p>
            <p class="tittle"> {{ title }} </p>

            <slot />
        </div>

        <div class="description">
            <p class="description-tittle"> {{ subTitle }} </p>
            <p class="description-about"> {{ description }} </p>
        </div>

    </div>

</template>

<style scoped>
.promo-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: start;

    width: 100%;
    max-width: 500px;

    user-select: none;
    cursor: pointer;
    text-wrap: pretty;
}

.main {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;

    width: 100%;
    height: 140px;

    padding: 0px 25px;
    border-radius: 8px;
}

.date {
    position: absolute;
    top: 5%;
    color: rgb(180, 180, 180);
    font-size: 12px;
    font-weight: bolder;
    text-shadow: 2px 2px 10px black;
}

.tittle {
    color: white;
    font-size: 40px;
    font-weight: bolder;
    text-shadow: 4px 4px 20px black;
}

.description {
    display: flex;
    flex-direction: column;
    justify-content: space-around;

    width: 95%;
    min-height: 80px;
    padding: 10px;

    background-color: rgb(214, 214, 214);
    border-bottom: 1px solid rgb(63, 63, 63);
    border-left: 1px solid rgb(63, 63, 63);
    border-right: 1px solid rgb(63, 63, 63);
    border-radius: 0px 0px 15px 15px;

}

.description-tittle {
    color: rgb(56, 56, 56);
    font-size: 20px;
    font-weight: bolder;
}

.description-about {
    color: rgb(97, 97, 97);
    font-weight: 500;
    font-size: 14px;
}

@media (max-width: 850px) {
    .tittle {
        font-size: 35px;

    }

    .description-tittle {
        font-size: 18px;
    }

    .description-about {
        font-size: 12px;
    }
}
</style>