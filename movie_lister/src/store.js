import OMDb from './util/OMDb';
import { ref, computed } from '@vue/composition-api';
import Vue from 'vue';
import CompositionApi from '@vue/composition-api'

Vue.use(CompositionApi)

const state = ref({ items: [], progress: false})

function push_items(object) {
  state.value.items.push(object)
}

function clear_items() {
  state.value.items = []
}

async function searchMovie(title) {  
  state.value.progress = true
  clear_items() 
  const response = await OMDb.searchFor(title)
  await Promise.all(response.data.Search.map(async (item) => {
    await commit_search(item)
  }))
  state.value.progress = false
}

async function commit_search(item) {

  const itemDetails = await OMDb.details(item.imdbID)
  push_items(itemDetails.data)
  return;
}

const getItems = computed(() => state.value.items)
const getProgress = computed(() => state.value.progress)


export {

  searchMovie,
  getItems,
  getProgress,
  clear_items
}