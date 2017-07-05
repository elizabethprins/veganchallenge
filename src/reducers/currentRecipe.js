import { GOT_RECIPE } from '../actions/recipes/get'

export default (state = null, { type, payload } = {}) => {
  switch (type) {
    case GOT_RECIPE :
      return payload

    default :
      return state
  }
}
