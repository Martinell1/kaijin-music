import { remove, save } from '../../assets/js/array-store'
import { SEARCH_KEY } from '../../assets/js/constance'
import { useStore } from 'vuex'
export default function useSearchHistory () {
  const store = useStore()
  function saveSearch (query) {
    const maxLen = 100

    const searches = save(query, SEARCH_KEY, (item) => {
      return item === query
    }, maxLen)

    store.commit('setSearchHistory', searches)
  }

  function deteleSearch (query) {
    const searches = remove(SEARCH_KEY, (item) => {
      return item === query
    })
    store.commit('setSearchHistory', searches)
  }

  return {
    saveSearch,
    deteleSearch
  }
}
