<template>
    <div>
        <h2>Reserva de Asientos</h2>
        <p>Selecciona tus asientos en la sala:</p>
        <div class="seat-container">
            <div v-for="(row, rowIndex) in seats" :key="rowIndex" class="seat-row">
                <div v-for="(seat, seatIndex) in row" 
                    :key="seatIndex" 
                    :class="{
                        seat: true, 
                        'seat-selected': isSelected(seat), 
                        'seat-unavailable': isUnavailable(seat),
                    }" 
                    v-on:click="toggleSeat(seat)" >
                    {{ seat.name }}
                </div>
            </div>
        </div>
        <div class="button-container">
            <button v-on:click="submitReservation">Reservar</button>
        </div>
        <div class="reserved-seats">
            <h3>Asientos reservados:</h3>
            <ul>
                <li v-for="seat in reservedSeats" :key="seat.name">{{ seat.name }}</li>
            </ul>
        </div>
    </div>
</template>

<script setup>

    import { reactive } from "vue";
    import axios from 'axios';

    //reactive: cualquier cambio en el estado de los asientos se reflejará automáticamente en la vista.
    const seats = reactive([
        [
            { name: "A1", selected: false, unavailable: false, },
            { name: "A2", selected: false, unavailable: false, },
        ],
        [
            { name: "B1", selected: false, unavailable: false, },
            { name: "B2", selected: false, unavailable: false, },
            { name: "B3", selected: false, unavailable: false, },
        ],
        [
            { name: "C1", selected: false, unavailable: false, },
            { name: "C2", selected: false, unavailable: false, },
            { name: "C3", selected: false, unavailable: false, },
            { name: "C4", selected: false, unavailable: false, },
        ],
    ]);

    const reservedSeats = reactive([]);

    const isSelected = (seat) => seat.selected;
    const isUnavailable = (seat) => seat.unavailable;

    const toggleSeat = (seat) => {
        seat.selected = !seat.selected;
    };

    const submitReservation = async () => {
        let selectedSeats = seats.flatMap((row) => row.filter((seat) => seat.selected)).map((seat) => seat.name);
        console.log(selectedSeats);
        const reservationData = {
            seats: selectedSeats
        };
        try {
            const response = await axios.post('https://646d3b2c9c677e232189d9bc.mockapi.io/reservations', reservationData);
            console.log('Reserva guardada:', response.data);
            //mostrar lista de reservados
            selectedSeats.forEach((seatName) => {
                reservedSeats.push({ name: seatName });
            });
            // desactivar los asientos?
            seats.forEach((row) => {
                row.forEach((seat) => {
                    if (seat.selected) {
                        seat.unavailable = true;
                    }
                });
            });
        } catch (error) {
            console.error('Error al guardar la reserva:', error);
        }
    };

</script>

<style scoped>

    h2, p {
        color: white;
    }
    .seat-container {
        display: flex;
        flex-direction: column;
    }

    .seat-row {
        display: flex;
        justify-content: center;
    }

    .seat {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 50px;
        height: 50px;
        margin: 5px;
        border: 1px solid #ccc;
        cursor: pointer;
    }

    .seat-selected {
        background-color: #99ccff;
    }

    .seat-unavailable {
        background-color: #f0f0f0;
        cursor: not-allowed;
    }

    .button-container{
        text-align: center;
        padding: 50px;
    }
</style>

