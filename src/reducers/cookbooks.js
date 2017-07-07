import { FETCHED_COOKBOOKS } from '../actions/cookbooks/fetch'
import {
  COOKBOOK_CREATED,
  COOKBOOK_UPDATED,
  COOKBOOK_REMOVED
} from '../actions/cookbooks/subscribe'

export default (state = [], { type, payload } = {}) => {
  switch (type) {
    case FETCHED_COOKBOOKS :
      return [ ...payload ]

    case COOKBOOK_CREATED :
      const newCookbook = { ...payload }
      return [newCookbook].concat(state)

    case COOKBOOK_UPDATED :
      return state.map((cookbook) => {
        if (cookbook._id === cookbook._id) {
          return { ...payload }
        }
        return cookbook
      })

    case COOKBOOK_REMOVED :
        return state.filter((cookbook) => (cookbook._id !== payload._id))


    default :
      return state

  }
}
