<script>
import axios from "axios";
import { usrStore } from "../../components/store/usrStore";

import TrUser from "../../components/TrUser.vue";
import { navigateTo } from "../../../utils/navigateTo";

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
    displayedUsers() {
      let startIndex = this.currentPage * this.itemsPerPage - this.itemsPerPage;
      let endIndex = startIndex + this.itemsPerPage;

      return this.users.slice(startIndex, endIndex);
    },
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

  <div v-else class="borde_doble tamaño_xl">
    <div class="container_basic">
      <div class="neon-text-container">
        <h1 class="neon-text title-menus">Usuarios Registrados</h1>
      </div>

      <div v-if="!this.error">
        <table>
          <tr>
            <th>Nombre</th>
            <th>Email</th>
            <th>Rol</th>
            <th>Estado</th>
            <th></th>
          </tr>
          <TrUser
            v-for="(user, index) in this.displayedUsers"
            :user="user"
            @reloadUsers="loadUsers"
          />
          <tr class="autofill" v-for="n in 5 - this.displayedUsers.length" :key="'empty-' + n">
            <td colspan="5">&nbsp;</td>

          </tr>
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
    </div>
  </div>
</template>

<style scoped>

@media screen and (max-width: 750px) {
  .autofill{
    display: none;
  }
}
</style>
