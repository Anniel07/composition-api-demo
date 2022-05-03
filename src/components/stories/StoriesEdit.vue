<template>
  <div class="text-danger" v-if="errors.length !== 0">
    <ul>
      <li v-for="(err, index) in errors" :key="index" >
        {{err}}
      </li>
    </ul>
  </div>

  <div class="container" style="width: 400px">
    <h2>Edit Story</h2>
    <form @submit.prevent="saveStory">
      <div class="form-group">
        <label for="plot">Plot</label>
        <input
          type="text"
          name="plot"
          id="plot"
          class="form-control"
          v-model="story.plot"
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
          v-model="story.writer"
          required
        />
      </div>
      <router-link :to="{ name: 'stories.index' }" class="btn btn-primary">
        Back
      </router-link>
      |
      <button type="submit" class="btn btn-success">Save</button>
    </form>
  </div>
</template>


<script>
import useStories from "../../composables/stories";
import { onMounted } from "vue";

export default {
  props: {
    id: {
      required: true,
      type: String,
    },
  },
  setup(props) {
    const { errors, story, getStory, updateStory } = useStories();

    onMounted(() => getStory(props.id));

    const saveStory = async () => {
      await updateStory(props.id);
    };

    return {
      errors,
      story,
      saveStory,
    };
  },
};
</script>