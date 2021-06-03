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
              :hide-no-data= "true"
              auto-select-first
              clearable
              filled
              rounded
              solo-inverted
              label="Search Movie"
              color="#3CB043"
            ></v-combobox>
          </v-col>
        </v-row>
      </v-container>
    </div>
    <div class="bottom">
      <items :list="itemsComplete"></items>
    </div>
  </div>
</template>

<script>
import { searchMovie, getItems, getProgress } from '../store'
import { ref, watch } from '@vue/composition-api';
import Items from './Items.vue';

export default {
  components: { Items },  
  name: 'searchBar',

  setup() {

    const title = ref('')
    const items = ref([])
    const itemsComplete = ref([])

    watch(title, () => {
      search()
    })

    watch([getItems, getProgress], () => {
      if(!getProgress.value){       
        update(getItems)
      }
    });

    const clear = () => {
      items.value = []
    }

    const clearPosters = () => {
      itemsComplete.value = []
    }

    const search = () => {
      if (title.value != null && title.value.length > 2) {
        clearPosters()
        searchMovie(title.value)
      }

      else {
        clear()
        clearPosters()
      }
    }

    const update = (list) => {
      list.value.forEach(item => {

        items.value.push(item.Title)

        itemsComplete.value.push(item)
      })
    }

    return {
      items,
      itemsComplete,
      title,
      search,
      update,
      clear
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

</style>