// src/actions/recipes/subscribe.js
import API from '../../api'

export const SUBSCRIBED_TO_RECIPES_SERVICE = 'SUBSCRIBED_TO_RECIPES_SERVICE'
export const RECIPE_CREATED = 'RECIPE_CREATED'
export const RECIPE_UPDATED = 'RECIPE_UPDATED'
export const RECIPE_REMOVED = 'RECIPE_REMOVED'

const api = new API()
const recipes = api.service('recipes')

export default () => {
  return (dispatch) => {
    recipes.on('created', (recipe) => { dispatch(createdRecipe(recipe)) })
    recipes.on('updated', (recipe) => { dispatch(updatedRecipe(recipe)) })
    recipes.on('patched', (recipe) => { dispatch(updatedRecipe(recipe)) })
    recipes.on('removed', (recipe) => { dispatch(removedRecipe(recipe)) })

    dispatch({ type: SUBSCRIBED_TO_RECIPES_SERVICE })
  }
}

const createdRecipe = (recipe) => {
  return {
    type: RECIPE_CREATED,
    payload: recipe
  }
}

const updatedRecipe = (recipe) => {
  return {
    type: RECIPE_UPDATED,
    payload: recipe
  }
}

const removedRecipe = (recipe) => {
  return {
    type: RECIPE_REMOVED,
    payload: recipe
  }
}
