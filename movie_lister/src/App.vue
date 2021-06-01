<template>
  <v-app style = "
    ">
    <div id="app">
      <searchBar></searchBar>
      <items></items>
    </div>
  </v-app>
</template>


<script>
import SearchBar from './components/SearchBar'
import Items from './components/Items'
export default {
  name: 'app',
  components: {
    SearchBar,
    Items
  }
}
</script>
