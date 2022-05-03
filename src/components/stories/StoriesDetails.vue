<template>
  <div class="container" style="width: 400px; text-align: left">
    <h2>Story Details</h2>
    <div class="jumbotron" style="padding: 10px;">
      
      <div
        class="row"
        v-for="(value, propertyName, index) in story"
        :key="propertyName"
      >
        <div class="col-sm-4">
          <strong>{{ columns[index] }}:</strong>
        </div>
        <div class="col-sm-8">{{ value }}</div>
      </div>
    </div>
    <router-link :to="{ name: 'stories.index' }" class="btn btn-primary">
      Back
    </router-link>
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
    const { story, getStory } = useStories();
    const columns = ["Id", "Plot", "Writer", "Upvotes"];
    onMounted(getStory(props.id));

    return {
      story,
      columns,
    };
  },
};
</script>