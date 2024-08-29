<script></script>

<template>
    <button class="button-64">
        <span class="text">
            <slot />
        </span>
    </button>
</template>

<style scoped>
.button-64 {
    align-items: center;
    background-image: linear-gradient(92.88deg, #7c2f2f 9.16%, #963131 43.89%, #9b2d2d 64.72%);
    border: 0;
    border-radius: 8px;
    box-shadow: rgba(252, 65, 65, 0.2) 0 15px 30px -5px;
    box-sizing: border-box;
    color: #FFFFFF;
    display: flex;
    justify-content: center;
    line-height: 1em;
    max-width: 100%;
    min-width: 140px;
    padding: 2px;
    text-decoration: none;
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;
    cursor: pointer;
}

.button-64:active,
.button-64:hover {
    outline: 0;
}

.button-64 span {
    background-color: rgb(27, 15, 15);
    font-size: 20px;
    font-weight: 600;
    padding: 14px 22px;
    border-radius: 6px;
    width: 100%;
    height: 100%;
    transition: 300ms;
    line-height: 1.3;
}

.button-64:hover span {
    background: none;
}

@media (min-width: 768px) {
    .button-64 {
        min-width: 196px;
    }
}
</style>