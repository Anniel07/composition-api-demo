<template>
    <nav class="navbar navbar-expand navbar-dark bg-dark fixed-top">
      <router-link to="/" class="navbar-brand">Demos Vue3</router-link>
      <div class="navbar-nav mr-auto">
        <li class="nav-item">
          <router-link to="/todo" class="nav-link">Todo</router-link>
        </li>
       
        <li class="nav-item">
          <router-link to="/movies" class="nav-link">Movies</router-link>
        </li>
         <li class="nav-item">
          <router-link to="/stories" class="nav-link">Stories</router-link>
        </li>
      </div>
    </nav>
     
    <div class="container mt-3">
      <br /><br />
      <router-view />
    </div>
  

</template>

<script>

export default {
  name: "App",
  components: {
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /*margin-top: 60px; */
}
</style>
