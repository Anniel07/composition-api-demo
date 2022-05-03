<template>
  <div class="container">
    <h1>Movies<video-icon /></h1>

    <table class="table">
      <tr class="bg-dark text-white">
        <th>#</th>
        <th>Title</th>
        <th>Director</th>
        <th>Actions</th>
      </tr>
      <tr v-for="movie in movies" :key="movie.id">
        <td>{{ movie.id }}</td>
        <td>{{ movie.title }}</td>
        <td>{{ movie.director }}</td>
        <td>
          <router-link
            :to="{ name: 'movies.edit', params: { id: movie.id } }"
            class="btn btn-warning"
          >
            <pencil-icon title="Edit" />
          </router-link>
          |
          <button @click="deleteMovie(movie.id)" class="btn btn-danger">
            <delete-icon title="Delete" />
          </button>
        </td>
      </tr>

      <tr />
    </table>
    <p class="lead">
      Here's a list of all your Movies.
      <router-link :to="{ name: 'movies.create' }" class="btn btn-primary">
        <plus-icon title="Add" />
        Add a new one?
      </router-link>
    </p>
  </div>
</template>


<script>
import useMovies from "../../composables/movies";
import { onMounted } from "vue";
// usefull icons
import VideoIcon from "vue-material-design-icons/Video.vue";
import PlusIcon from "vue-material-design-icons/Plus.vue";
import DeleteIcon from "vue-material-design-icons/Delete.vue";
import PencilIcon from "vue-material-design-icons/Pencil.vue";

export default {
  components: {
    VideoIcon,
    PlusIcon,
    DeleteIcon,
    PencilIcon,
  },
  setup() {
    const { movies, getMovies, destroyMovie } = useMovies();

    onMounted(getMovies);

    const deleteMovie = async (id) => {
      if (!window.confirm("You sure?")) {
        return;
      }
      await destroyMovie(id);
      await getMovies();
    };

    return {
      movies,
      deleteMovie,
    };
  },
};
</script>