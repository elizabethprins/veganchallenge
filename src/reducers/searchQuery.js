import { UPDATE_SEARCH } from '../actions/recipes/search'

export default (state = { type: '', query: '' }, { type, payload } = {}) => {
  switch(type) {
    case UPDATE_SEARCH :
      return { ...payload }

    default :
      return state
  }
}