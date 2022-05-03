<template>
  <div class="container">
    <h1>Stories<book-open-page-variant-icon /></h1>

    <div class="searchBar">
      <!-- Filter Search -->
      <form class="input-group mb-5" @submit.prevent="doFilter">
        <input
          type="search"
          class="form-control"
          v-model="searchQuery"
          placeholder="Search by Plot"
          aria-label="Recipient's username"
          aria-describedby="button-addon2"
          required
        />
        <input
          type="Submit"
          class="btn btn-primary"
          @click="doFilter"
          style="margin-left: 10px"
          value="Filter"
        />
        <button
          type="Clear"
          class="btn btn-info"
          style="margin-left: 10px"
          @click="doClear"
        >
          Clear
        </button>
      </form>
    </div>

    <table class="table">
      <tr class="bg-dark text-white">
        <th>#</th>
        <th>Plot</th>
        <th>Writer</th>
        <th>
          Upvotes
          <span @click="sortByUpvote">
            <arrow-down-icon v-if="order === 'desc'" title="Sort asc" />
            <arrow-up-icon v-else title="Sort desc" />
          </span>
        </th>
        <th>Actions</th>
      </tr>
      <!-- put in the for filteredStories for seee computed properties in action-->
      <tr v-for="story in stories" :key="story.id">
        <!-- iterar sobre propiedades -->
        <td v-for="prop in story" :key="prop">
          {{ prop }}
        </td>
        <!-- <td>{{ story.id }}</td>
        <td>{{ story.plot }}</td>
        <td>{{ story.writer }}</td>
        <td>{{ story.upvotes }}</td> -->
        <td>
          <button @click="doUpvote(story)" class="btn btn-primary">
            Upvote
          </button>
          |

          <router-link
            :to="{ name: 'stories.details', params: { id: story.id } }"
            class="btn btn-success"
          >
            Details
          </router-link>

          |
          <router-link
            :to="{ name: 'stories.edit', params: { id: story.id } }"
            class="btn btn-warning"
          >
            <pencil-icon title="Edit" />
          </router-link>
          |
          <button @click="deleteStory(story.id)" class="btn btn-danger">
            <delete-icon title="Delete" />
          </button>
        </td>
      </tr>

      <tr />
    </table>
    <p class="lead">
      Here's a list of all your Stories.
      <router-link :to="{ name: 'stories.create' }" class="btn btn-primary">
        <plus-icon title="Add" />
        Add a new one?
      </router-link>
    </p>
  </div>
</template>


<script>
import { ref } from "@vue/reactivity";
import useStories from "../../composables/stories";
import { /*computed,*/ onMounted } from "vue";
import _ from "lodash";

// usefull icons
import ArrowUpIcon from "vue-material-design-icons/ArrowUp.vue";
import ArrowDownIcon from "vue-material-design-icons/ArrowDown.vue";
import BookOpenPageVariantIcon from "vue-material-design-icons/BookOpenPageVariant.vue";
import PlusIcon from "vue-material-design-icons/Plus.vue";
import DeleteIcon from "vue-material-design-icons/Delete.vue";
import PencilIcon from "vue-material-design-icons/Pencil.vue";

export default {
  components: {
    DeleteIcon,
    PencilIcon,
    ArrowUpIcon,
    ArrowDownIcon,
    PlusIcon,
    BookOpenPageVariantIcon,
  },
  setup() {
    const {
      stories,
      getStories,
      destroyStory,
      updateStory,
      story,
      getStory,
      getStoriesByPlot,
    } = useStories();
    const order = ref("desc");
    const searchQuery = ref(""); // reference to search must be empty not null

    onMounted(getStories);

    const deleteStory = async (id) => {
      if (!window.confirm("You sure?")) {
        return;
      }
      await destroyStory(id);
      await getStories();
    };

    /**
     * Increment the votes for stories and save on DB. Note use of asyn and await
     */
    const doUpvote = async (storyV) => {
      await getStory(storyV.id);
      story.value.upvotes++;
      storyV.upvotes = story.value.upvotes; //for refresh in the view update properties
      //console.log(storyV.upvotes)
      await updateStory(storyV.id);
    };

    const sortByUpvote = () => {
      // params array and field to sort, is needed lodash is order to use _.orderBy
      // the first time this code is execute sort "desc", then toogle this value
      order.value = order.value === "desc" ? "asc" : "desc";
      stories.value = _.orderBy(stories.value, "upvotes", order.value);
    };

    /** using computed properties */
    /*
    const filteredStories = computed(() => {
      return stories.value.filter((story) => {
        // converts the query and value to lower case  index
        return story.plot.toLowerCase().indexOf(searchQuery.value.toLowerCase()) != -1;
        
      });
    });
    */

    /** this function is called when click is pressed on search button, get the values from the api */
    const doFilter = () => {
      getStoriesByPlot(searchQuery.value);
    };

    const doClear = async () => {
      searchQuery.value = ""
      await getStories()
    }

    return {
      stories,
      deleteStory,
      doUpvote,
      order,
      sortByUpvote,
      searchQuery,
      //filteredStories,
      doFilter,
      doClear
    };
  },
};
</script>