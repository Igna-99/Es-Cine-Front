<script>
import axios from "axios";
import { usrStore } from "../../components/store/usrStore";
import { navigateTo } from "../../../utils/navigateTo";

import TrUser from "../../components/TrUser.vue";
import DangerButton from "../../components/buttons/DangerButton.vue";

export default {
  data() {
    return {
      usrStore: usrStore(),

      users: [],
      currentPage: 1,
      itemsPerPage: 5,
      totalUsers: 0,
      pagesShown: 1,

      error: false,
      msjError: null,
    };
  },
  components: {
    TrUser,
    DangerButton,
  },
  methods: {
    navigateTo,
    async loadUsers() {
      const url = "http://localhost:8080/usuario/all";
      try {
        const response = await axios.get(url, { withCredentials: true });    
        this.users = response.data.result;
        this.totalUsers = this.users.length;
      } catch (error) {
        this.error = true;
        this.msjError = error.response.data.message;
        console.error(error);
      }
    },

    handlePageChange(data) {
      this.currentPage = data.currentPage;
    },

    updateMaxPagesShown() {
      const width = window.innerWidth;
      if (width < 500) {
        this.pagesShown = 1;
      } else if (width < 750) {
        this.pagesShown = 3;
      } else {
        this.pagesShown = 5;
      }
    },
  },
  computed: {
    sortedUsers() {
      let currentUserId = this.usrStore.currentUser.idUsuario;
      const loggedInUserArray = this.users.filter(
        (user) => user.idUsuario === currentUserId
      );
      const otherUsers = this.users.filter((user) => user.idUsuario !== currentUserId);

      return [...loggedInUserArray, ...otherUsers];
    },
    displayedUsers() {
      let startIndex = this.currentPage * this.itemsPerPage - this.itemsPerPage;
      let endIndex = startIndex + this.itemsPerPage;

      return this.sortedUsers.slice(startIndex, endIndex);
    },
  },
  async created() {
    document.title = "Usuarios Registrados";
    await this.loadUsers();
  },
  mounted() {
    this.updateMaxPagesShown();
    window.addEventListener("resize", this.updateMaxPagesShown);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.updateMaxPagesShown);
  },
};
</script>

<template>
  <div v-if="!this.usrStore.isLogged" class="borde_doble">
    <div class="container_basic">
      <h1>no estas logeado</h1>
    </div>
  </div>

  <div v-else-if="!this.usrStore.isAdmin" class="borde_doble">
    <div class="container_basic">
      <h1>Acesso Denegado</h1>
    </div>
  </div>

  <div v-else class="menus-border max-w-4xl">
    <div class="container_basic py-5">
      <h1 class="neon-text text-4xl text-center pb-5">Usuarios Registrados</h1>

      <div class="text-white w-full" v-if="!this.error">
        <table class="table-fixed">
          <thead>
            <tr>
              <th style="width: 20%">Nombre</th>
              <th style="width: 37%">Email</th>
              <th style="width: 12%">Rol</th>
              <th style="width: 14%">Estado</th>
              <th style="width: 15%"></th>
            </tr>
          </thead>
          <tbody>
            <TrUser
              v-for="(user, index) in this.displayedUsers"
              :user="user"
              @reloadUsers="loadUsers"
            />
            <tr
              class="autofill"
              v-for="n in this.itemsPerPage - this.displayedUsers.length"
              :key="'empty-' + n"
            >
              <td colspan="5"></td>
            </tr>
          </tbody>
        </table>

        <div class="pagination-container">
          <vue-awesome-paginate
            v-model="this.currentPage"
            :total-items="this.totalUsers"
            :items-per-page="this.itemsPerPage"
            :max-pages-shown="this.pagesShown"
            @page-clicked="this.handlePageChange"
          >
          </vue-awesome-paginate>
        </div>
      </div>

      <div v-else="this.error" class="alert alert-danger">
        {{ this.msjError }}
      </div>

      <DangerButton @click="navigateTo('adminMenu')"> Regresar </DangerButton>
    </div>
  </div>
</template>

<style scoped>
.autofill {
  height: 74px;
}

@media screen and (max-width: 768px) {
  .autofill {
    display: none;
  }
}
</style>
