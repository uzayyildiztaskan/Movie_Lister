<template>
  <v-app id="app">
      <searchBar class="color"></searchBar>
  </v-app>
</template>


<script>
import SearchBar from './components/SearchBar'
export default {
  name: 'app',
  components: {
    SearchBar
  }
}
</script>