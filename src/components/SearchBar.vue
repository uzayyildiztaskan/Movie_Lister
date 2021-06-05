<template>
  <div>
    <v-img 
      src="../assets/logo.png"
      height="200px"
      width="250px"
      class="ma-auto mt-10"/>
    <div class="center">
      <v-container>
        <v-row>
          <v-col
            class="ma-10"
            cols="15"
          >
            <v-combobox
              :items="items"
              :search-input.sync="title"            
              :hide-no-data="true"
              auto-select-first
              clearable
              filled
              rounded
              solo-inverted
              label="Search Movie"
              item-color="#3CB043"
            ></v-combobox>
          </v-col>
        </v-row>
      </v-container>
    </div>
    <div class="bottom">
      <items :title="title"/>
    </div>
    <div class="bottomInfo">
      <h1 class="text-center mt-5 grey--text mb-2 cursorDefault fontType" v-if="title == null || title.length == 0 ">
        Type to start searching your movie!        
      </h1>
    </div>
    <v-snackbar
      v-model="info">
      Select a movie from the list to display movie details.
      <template v-slot:action="{ attrs }">
        <v-btn
          color="blue"
          text
          v-bind="attrs"
          @click="info = false"
        >
          Got it!
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>

import { searchMovie, getItems, getProgress, clear_items } from '../store'
import { ref, watch } from '@vue/composition-api';
import Items from './Items.vue';

export default {
  components: { Items },  
  name: 'searchBar',

  setup() {

    const title = ref('')
    const items = ref([])

    const info = ref(false)
    const infoNotGiven = ref(true)

    watch(title, () => {

      search()
    })

    watch([getItems, getProgress], () => {

      if(!getProgress.value){

        update(getItems)
      }
    });

    const search = () => {

      if (title.value != null && title.value.length > 2) {

        searchMovie(title.value)
      }

      else if(title.value == null){

        clear_items()
      }
    }

    const update = (list) => {

      if(list.value.length !=0 ) {
        
        list.value.forEach(item => {

          if(item.Title.toLowerCase().startsWith(title.value.toLowerCase())){

            items.value.push(item.Title)          
          }
        });

        if(infoNotGiven.value) {
          infoNotGiven.value = false
          info.value = true
        }
      }

      else {

        items.value = []
      }
    }

    return {
      items,
      title,
      info
    }
  }
}
</script>

<style>

.center {

  margin: auto;
  width: 50%;
} 

.bottom {

  margin: auto;
  width: 95%;
  margin-top: 2%;
}

.bottomInfo {

  margin: auto;
  margin-top: 5%;
}

.cursorDefault {

  cursor: default;
}

.fontType {
  
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
}
</style>
