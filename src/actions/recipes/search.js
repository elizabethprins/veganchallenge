export const UPDATE_SEARCH = 'UPDATE_SEARCH'

export default ({ query, type } = {}) => ({
  type: UPDATE_SEARCH,
  payload: { query, type }
})
