<template>
  <div class="center">
    <v-container>
      <v-row>
        <v-col
          class="ma-10"
          cols="16"
          sm="11"
        >
          <v-autocomplete
            :items="items"
            :search-input.sync="title"            
            auto-select-first
            clearable
            filled
            rounded
            solo-inverted
            label="Search Movie"
            color="#3CB043"
            :hide-no-data="true"
          ></v-autocomplete>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: 'searchBar',
  data () {
    return {
      items: [],
      title: '',
      type: 'movie'
    }
  },
  watch: {
    title: 'search'
  },
  methods: {
    search () {
      if (this.title.length > 2) {
        console.log("Search the movie")
      }
    }
  }
}
</script>

<style>
.center {
  margin: auto;
  width: 50%;
  padding: 10px;
  margin-top: 10%;  
}
</style>