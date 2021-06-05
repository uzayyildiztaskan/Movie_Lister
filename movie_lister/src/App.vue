<template>
  <v-app id="app">
      <searchBar></searchBar>
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