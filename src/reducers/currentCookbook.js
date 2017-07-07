import { GOT_COOKBOOK } from '../actions/cookbooks/get'

export default (state = null, { type, payload } = {}) => {
  switch (type) {
    case GOT_COOKBOOK :
      return payload

    default :
      return state
  }
}
