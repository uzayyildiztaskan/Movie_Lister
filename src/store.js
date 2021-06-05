import OMDb from './util/OMDb';
import { ref, computed } from '@vue/composition-api';
import Vue from 'vue';
import CompositionApi from '@vue/composition-api'

Vue.use(CompositionApi)

const state = ref({ items: [], progress: false})

const cachedTitle = ref("")
const cachedItems = ref([])

function clear_items() {
  
  state.value.items = []
  return;
}

async function searchMovie(title) { 

  if(cachedTitle.value.toLowerCase().startsWith(title.toLowerCase())) {

    state.value.items = cachedItems.value
  }

  else {

    state.value.progress = true
    cachedTitle.value = title
    cachedItems.value = []
    clear_items() 
    const response = await OMDb.searchFor(title)
    await Promise.all(response.data.Search.map(async (item) => {
      await commit_search(item)
    }))
    state.value.progress = false
  }
}

async function commit_search(item) {

  const itemDetails = await OMDb.details(item.imdbID)
  state.value.items.push(itemDetails.data)
  cachedItems.value.push(itemDetails.data)  
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
