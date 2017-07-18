import { SUBSCRIBED_TO_RECIPES_SERVICE } from '../actions/recipes/subscribe'
import { SUBSCRIBED_TO_COOKBOOKS_SERVICE } from '../actions/cookbooks/subscribe'

export default (state = [], { type } = {}) => {
  switch (type) {
    case SUBSCRIBED_TO_RECIPES_SERVICE :
      return state.concat('recipes')

    case SUBSCRIBED_TO_COOKBOOKS_SERVICE :
      return state.concat('cookbooks')

    default :
      return state
  }
}
