<template>
  <div class="text-danger" v-if="errors.length !== 0">
    <ul>
      <li v-for="(err, index) in errors" :key="index" >
        {{err}}
      </li>
    </ul>
  </div>

  <div class="container" style="width: 400px">
    <h2>Edit Movie</h2>
    <form @submit.prevent="saveMovie">
      <div class="form-group">
        <label for="title">Title</label>
        <input
          type="text"
          name="title"
          id="title"
          class="form-control"
          v-model="movie.title"
          required
        />
      </div>

      <div class="form-group">
        <label for="director">Director</label>

        <input
          type="text"
          name="director"
          id="director"
          class="form-control"
          v-model="movie.director"
          required
        />
      </div>
      <router-link :to="{ name: 'movies.index' }" class="btn btn-primary">
        Back
      </router-link>
      |
      <button type="submit" class="btn btn-success">Save</button>
    </form>
  </div>
</template>


<script>
import useMovies from "../../composables/movies";
import { onMounted } from "vue";

export default {
  props: {
    id: {
      required: true,
      type: String,
    },
  },
  setup(props) {
    const { errors, movie, getMovie, updateMovie } = useMovies();

    onMounted(() => getMovie(props.id));

    const saveMovie = async () => {
      await updateMovie(props.id);
    };

    return {
      errors,
      movie,
      saveMovie,
    };
  },
};
</script>