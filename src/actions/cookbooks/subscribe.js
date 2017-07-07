import API from '../../api'

export const SUBSCRIBED_TO_COOKBOOKS_SERVICE = 'SUBSCRIBED_TO_COOKBOOKS_SERVICE'
export const COOKBOOK_CREATED = 'COOKBOOK_CREATED'
export const COOKBOOK_UPDATED = 'COOKBOOK_UPDATED'
export const COOKBOOK_REMOVED = 'COOKBOOK_REMOVED'

const api = new API()
const cookbooks = api.service('cookbooks')

export default () => {
  return (dispatch) => {
    cookbooks.on('created', (cookbook) => { dispatch(createdCookbook(cookbook)) })
    cookbooks.on('updated', (cookbook) => { dispatch(updatedCookbook(cookbook)) })
    cookbooks.on('patched', (cookbook) => { dispatch(updatedCookbook(cookbook)) })
    cookbooks.on('removed', (cookbook) => { dispatch(removedCookbook(cookbook)) })

    dispatch({ type: SUBSCRIBED_TO_COOKBOOKS_SERVICE })
  }
}

const createdCookbook = (cookbook) => {
  return {
    type: COOKBOOK_CREATED,
    payload: cookbook
  }
}

const updatedCookbook = (cookbook) => {
  return {
    type: COOKBOOK_UPDATED,
    payload: cookbook
  }
}

const removedCookbook = (cookbook) => {
  return {
    type: COOKBOOK_REMOVED,
    payload: cookbook
  }
}
