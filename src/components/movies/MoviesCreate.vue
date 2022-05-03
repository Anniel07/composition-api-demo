<template>
  <div class="text-danger" v-if="errors.length !== 0">
    <ul>
      <li v-for="(err, index) in errors" :key="index" >
        {{err}}
      </li>
    </ul>
  </div>


  <div class="container" style="width: 400px">
    <h2>Create Movie</h2>
    <form @submit.prevent="saveMovie">
      <div class="form-group">
        <label for="title">Title</label>
        <input
          type="text"
          name="title"
          id="title"
          class="form-control"
          v-model="form.title"
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
          v-model="form.director"
          required
        />
      </div>
      <router-link :to="{ name: 'movies.index' }" class="btn btn-primary">
        Back
      </router-link>
      | 
      <button type="submit" class="btn btn-success">Create</button>
    </form>
  </div>
</template>


<script>
import useMovies from "../../composables/movies";
import { reactive } from "vue";

export default {
  setup() {
    const form = reactive({
      title: "",
      director: "",
    });

    const { errors, storeMovie } = useMovies();

    const saveMovie = async () => {
      await storeMovie({ ...form });
    };

    return {
      form,
      errors,
      saveMovie,
    };
  },
};
</script>