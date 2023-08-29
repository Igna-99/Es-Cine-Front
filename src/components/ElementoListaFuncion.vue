<template>
    <div class="container_basic element">

        <div class="container_icon icon_red resaltable" data-bs-toggle="modal"
            :data-bs-target="'#modalHabilitar' + this.function.idFuncion">
            <i class="bi bi-trash3-fill"></i>
        </div>

        <div class="container_basic">
            <h5>
                {{ this.tittle }}
            </h5>
            <h6>
                Funcion #{{ this.function.idFuncion }} | sala {{ this.function.sala }} | Horario {{ this.function.horario }}
            </h6>
        </div>

    </div>

    <div class="modal fade" :id="'modalHabilitar' + this.function.idFuncion" tabindex="-1"
        aria-labelledby="exampleModalLabel" aria-hidden="true" data-bs-theme="dark">
        <div class="modal-dialog">
            <div class="modal-content text-light">

                <div class="modal-header ">
                    Eliminar Funcion

                    <button :id="'btn_cerrar_modal' + this.function.idFuncion" type="button" class="btn-close"
                        data-bs-dismiss="modal" aria-label="Close"></button>
                </div>

                <div class="modal-body">
                    Deseas Eliminar La Funcion #{{ this.function.idFuncion }}
                </div>

                <div class="modal-footer">
                    <button type="button" class="btn btn-danger" @click="deleteFunction(this.function.idFuncion)">
                        Eliminar
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import { usrStore } from '../components/store/usrStore'

export default {
    data() {
        return {
            usrStore: usrStore()
        }
    },
    emits: ['reloadFunctions'],
    props: ['function', 'tittle'],
    methods: {
        async deleteFunction(idFunction) {

            const url = 'http://localhost:8080/funcion/delete';

            const data = {
                idFuncion: idFunction,
            };

            try {
                await axios.post(url, data, { withCredentials: true });

                alert("Funcion Eliminada Correctamente")

                document.getElementById('btn_cerrar_modal' + this.function.idFuncion).click();
                this.$emit("reloadFunctions");

            } catch (error) {
                console.log(error)
            }
        },

    },

}

</script>

<style scoped>
.element {
    display: grid;
    grid-template-columns: 1fr 10fr 1fr;
    align-items: center;

    padding: 10px 8%;
    border-radius: 5px;
    margin: 10px 0px;
}

@media screen and (max-width:680px) {
    .element {
        grid-template-columns: 1fr 5fr;
        padding: 5px 2%;
    }
}
</style>