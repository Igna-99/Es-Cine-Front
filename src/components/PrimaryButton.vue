<script></script>

<template>
    <button class="button-64">
        <span class="text">
            <slot />
        </span>
    </button>
</template>

<style>
.button-64 {
    align-items: center;
    background-image: linear-gradient(92.88deg, #2f407c 9.16%, #3e3196 43.89%, #4a2d9b 64.72%);
    border: 0;
    border-radius: 8px;
    box-shadow: rgba(151, 65, 252, 0.2) 0 15px 30px -5px;
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
    background-color: rgb(15, 15, 27);
    font-size: 20px;
    font-weight: 600;
    padding: 16px 24px;
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