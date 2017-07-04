// src/actions/user/sign-in.js
import { history } from '../../store'
import API from '../../api'
import {
  APP_LOADING,
  APP_DONE_LOADING,
  LOAD_ERROR,
  LOAD_SUCCESS
} from '../loading'

export const USER_SIGNED_IN = 'USER_SIGNED_IN'

const api = new API()

export default (user) => {

  console.log(user)
  return (dispatch) => {
    dispatch({ type: APP_LOADING })

    api.authenticate(user)
      .then((user) => {
        dispatch({ type: APP_DONE_LOADING })
        dispatch({ type: LOAD_SUCCESS })

        api.app.set('user', user)

        history.replace('/')

        dispatch({
          type: USER_SIGNED_IN,
          payload: user
        })
      })
      .catch((error) => {
        dispatch({ type: APP_DONE_LOADING })
        dispatch({
          type: LOAD_ERROR,
          payload: error.message
        })
      })
  }
}
