import { SUBSCRIBED_TO_RECIPES_SERVICE } from '../actions/recipes/subscribe'

export default (state = [], { type } = {}) => {
  switch (type) {
    case SUBSCRIBED_TO_RECIPES_SERVICE :
      return state.concat('recipes')

    default :
      return state
  }
}
