<template>
    <div>
        <h2>Reserva de Asientos</h2>
        <p>Selecciona tus asientos en la sala:</p>
        <div class="seat-container">
            <div v-for="(row, rowIndex) in seats" :key="rowIndex" class="seat-row">
                <div v-for="(seat, seatIndex) in row" :key="seatIndex" :class="{seat: true, 'seat-selected': isSelected(seat), 'seat-unavailable': isUnavailable(seat),}" v-on:click="toggleSeat(seat)">
                    {{ seat.name }}
                </div>
            </div>
        </div>
        <div class="button-container">
            <button v-on:click="submitReservation">Reservar</button>
        </div>
        
    </div>
</template>

<script setup>

    import { reactive } from "vue";

    //reactive: cualquier cambio en el estado de los asientos se reflejará automáticamente en la vista.
    const seats = reactive([
        [
            { name: "A1", selected: false, unavailable: false },
            { name: "A2", selected: false, unavailable: false },
        ],
        [
            { name: "B1", selected: false, unavailable: false },
            { name: "B2", selected: false, unavailable: false },
            { name: "B3", selected: false, unavailable: false },
        ],
        [
            { name: "C1", selected: false, unavailable: false },
            { name: "C2", selected: false, unavailable: false },
            { name: "C3", selected: false, unavailable: false },
            { name: "C4", selected: false, unavailable: false },
        ],
    ]);

    const isSelected = (seat) => seat.selected;
    const isUnavailable = (seat) => seat.unavailable;

    const toggleSeat = (seat) => {
        seat.selected = !seat.selected;
    };

    const submitReservation = () => {
        const selectedSeats = seats
        .flatMap((row) => row.filter((seat) => seat.selected))
        .map((seat) => seat.name);
        console.log(selectedSeats);
    };

</script>


