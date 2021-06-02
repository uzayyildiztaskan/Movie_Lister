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
            :hide-no-data= "true"
            @blur="clear()"      
            auto-select-first
            clearable
            filled
            rounded
            solo-inverted
            label="Search Movie"
            color="#3CB043"
          ></v-autocomplete>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { searchMovie, getItems } from '../store'
import { ref, watch } from '@vue/composition-api';

export default {  
  name: 'searchBar',

  setup() {

    const title = ref('')
    const items = ref([])

    watch(title, () => {
      search()
    })

    watch(getItems, () => {
      console.log(getItems)
      update(getItems)
    });

    const clear = () => {
      while(items.value.length>0) {
        items.value.splice(0, 1)
      }
    }

    const search = () => {
       if (title.value != null && title.value.length > 2) {
         searchMovie(title.value)
      }
    }

    const update = (list) => {
      list.value.forEach(item => {
        items.value.push(item.Title)
      })
    }

    return {
      items,
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
  padding: 10px;
  margin-top: 0.1;  
}
</style>