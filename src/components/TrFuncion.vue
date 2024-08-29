<script>
import axios from "axios";
import { usrStore } from "./store/usrStore";
import { formatDate } from "../../utils/funcionsMovieDB";

export default {
  data() {
    return {
      usrStore: usrStore(),
    };
  },
  emits: ["reloadFunctions"],
  props: ["function", "tittle"],
  methods: {
    async deleteFunction(idFunction) {
      const url = "http://localhost:8080/funcion/delete";

      const data = {
        idFuncion: idFunction,
      };

      try {
        await axios.post(url, data, { withCredentials: true });

        alert("Funcion Eliminada Correctamente");

        document.getElementById("btn_cerrar_modal" + this.function.idFuncion).click();
        this.$emit("reloadFunctions");
      } catch (error) {
        console.log(error);
      }
    },
    stripSeconds(string) {
      let strips = string.split(":");
      return `${strips[0]}:${strips[1]}`;
    },
  },
};
</script>

<template>
  <tr style="height: 74px; width: 100%">
    <td class="movie" data-cell="Pelicula: ">{{ this.tittle }}</td>
    <td class="sala" data-cell="Sala: ">{{ this.function.sala }}</td>
    <td class="rol" data-cell="Horario: ">
      {{ this.stripSeconds(this.function.horario) }}
    </td>
    <td>
      <div
        class="icon icon_resaltable red"
        data-bs-toggle="modal"
        :data-bs-target="'#modalHabilitar' + this.function.idFuncion"
      >
        <i class="bi bi-trash3-fill"></i>
      </div>
    </td>
  </tr>

  <!-- Modal -->

  <div
    class="modal fade"
    :id="'modalHabilitar' + this.function.idFuncion"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
    data-bs-theme="dark"
  >
    <div class="modal-dialog">
      <div class="modal-content text-light">
        <div class="modal-header">
          Eliminar Funcion

          <button
            :id="'btn_cerrar_modal' + this.function.idFuncion"
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>

        <div class="modal-body">
          Deseas Eliminar La Funcion #{{ this.function.idFuncion }}
        </div>

        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-danger"
            @click="deleteFunction(this.function.idFuncion)"
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.name,
.email {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.icon {
  display: inline;
  font-size: 20px;
  padding: 6px 6px 4px 6px;
  margin: 0px 5px;
  border-radius: 10px;
  background-color: rgba(255, 255, 255, 0.1);
}

.icon_resaltable:hover {
  cursor: pointer;
  background-color: rgba(255, 255, 255, 0.3);
}

.red {
  color: rgb(141, 2, 2);
}

.green {
  color: rgb(2, 141, 32);
}

.element {
  display: flex;
  width: 100%;
  align-items: center;
  flex-wrap: nowrap;
  justify-content: space-between;
  text-align: center;
}
</style>
