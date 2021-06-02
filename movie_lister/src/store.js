import OMDb from './util/OMDb';
import { ref, computed } from '@vue/composition-api';
import Vue from 'vue';
import CompositionApi from '@vue/composition-api'

Vue.use(CompositionApi)

const state = ref({ items: [] })

function push_items(object) {
  state.value.items.push(object)
}

async function searchMovie(title) {  
  const response = await OMDb.searchFor(title)
  console.log(response)
  response.data.Search.forEach((item) => {
    commit_search(item)
  })
}

async function commit_search(item) {

  const itemDetails = await OMDb.details(item.imdbID)
  push_items(itemDetails.data)
}

const getItems = computed(() => state.value.items)


export {

  searchMovie,
  getItems
}