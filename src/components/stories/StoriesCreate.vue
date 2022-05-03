<template>
  <div class="text-danger" v-if="errors.length !== 0">
    <ul>
      <li v-for="(err, index) in errors" :key="index" >
        {{err}}
      </li>
    </ul>
  </div>


  <div class="container" style="width: 400px">
    <h2>Create Story</h2>
    <form @submit.prevent="saveStory">
      <div class="form-group">
        <label for="plot">Plot</label>
        <input
          type="text"
          name="plot"
          id="plot"
          class="form-control"
          v-model="form.plot"
          required
        />
      </div>

      <div class="form-group">
        <label for="writer">Writer</label>

        <input
          type="text"
          name="writer"
          id="writer"
          class="form-control"
          v-model="form.writer"
          required
        />
      </div>
      <router-link :to="{ name: 'stories.index' }" class="btn btn-primary">
        Back
      </router-link>
      | 
      <button type="submit" class="btn btn-success">Create</button>
    </form>
  </div>
</template>


<script>
import useStories from "../../composables/stories";
import { reactive } from "vue";

export default {
  setup() {
    const form = reactive({
      plot: "",
      writer: "",
      upvotes: 0
    });

    const { errors, storeStory } = useStories();

    const saveStory = async () => {
      await storeStory({ ...form });
    };

    return {
      form,
      errors,
      saveStory,
    };
  },
};
</script>