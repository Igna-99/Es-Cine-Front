<script>
import { usrStore } from "../../components/store/usrStore";

import { navigateTo } from "../../../utils/navigateTo";
import { getMoviesToReleaseFromTMDB } from "../../../utils/funcionsMovieDB";

import MoviePremiereCard from "../../components/MoviePremiereCard.vue";
import DangerButton from "../../components/buttons/DangerButton.vue";
import AddMovieToReleaseModal from "../../components/AddMovieToReleaseModal.vue";

export default {
  data() {
    return {
      usrStore: usrStore(),

      moviesToRelease: [],
      currentPage: 1,
      itemsPerPage: 6,
      totalMovies: 0,
      pagesShown: 1,

      show: false,
      moviesShowed: [],
    };
  },
  components: {
    MoviePremiereCard,
    DangerButton,
    AddMovieToReleaseModal,
  },
  computed: {
    displayedMovies() {
      let startIndex = this.currentPage * this.itemsPerPage - this.itemsPerPage;
      let endIndex = startIndex + this.itemsPerPage;

      return this.moviesToRelease.slice(startIndex, endIndex);
    },
  },
  methods: {
    navigateTo,

    async loadMovies() {
      try {
        this.moviesToRelease = await getMoviesToReleaseFromTMDB();
        this.totalMovies = this.moviesToRelease.length;
        if (this.displayedMovies.length === 0 && this.currentPage > 1) {
          this.currentPage--;
        }
      } catch (error) {
        console.error("Error loading movies:", error.message || error);
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

      if (width < 768) {
        this.itemsPerPage = 3;
      } else {
        this.itemsPerPage = 6; // Valor predeterminado
      }
    },
  },
  async created() {
    document.title = "Administrar Peliculas";

    await this.loadMovies();
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

  <div v-else class="menus-border max-w-6xl mb-10">
    <div class="container_basic py-5">
      <h1 class="neon-text text-4xl text-center pb-5">
        Administrar Peliculas Por Estrenar
      </h1>

      <div class="movies_grid">
        <MoviePremiereCard
          v-for="movie in this.displayedMovies"
          :movie="movie"
          @reloadMovies="this.loadMovies()"
        />
        <div
          class="flex flex-row items-center bg-zinc-800/20 border border-zinc-700 rounded-lg shadow w-full h-40 overflow-hidden"
          v-for="n in this.itemsPerPage - this.displayedMovies.length"
          :key="'empty-' + n"
        />
      </div>

      <div class="pagination-container">
        <vue-awesome-paginate
          v-model="this.currentPage"
          :total-items="this.totalMovies"
          :items-per-page="this.itemsPerPage"
          :max-pages-shown="this.pagesShown"
          @page-clicked="this.handlePageChange"
        >
        </vue-awesome-paginate>
      </div>

      <div class="flex flex-col-reverse gap-3 sm:flex-row">
        <DangerButton @click="navigateTo('adminMenu')"> Regresar </DangerButton>
        <AddMovieToReleaseModal @reloadMovies="loadMovies()" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.container_btns {
  margin-bottom: 30px;
}

.movies_grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 10px;
  justify-items: center;
  width: 98%;
}

.activado {
  font-weight: bold;
  color: black;
  border: 2px solid black;
  background-color: rgba(255, 255, 255, 0.753);
}

@media screen and (min-width: 768px) {
  .movies_grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    width: 92%;
  }
}
</style>
