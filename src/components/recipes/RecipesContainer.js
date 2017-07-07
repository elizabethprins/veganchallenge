import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import RecipeItem from './RecipeItem'
import './RecipesContainer.css'
import fetchRecipes from '../../actions/recipes/fetch'
import subscribeToRecipesService from '../../actions/recipes/subscribe'
import Search from './Search'
import DropDowns from './DropDowns'
import CreateRecipeButton from './CreateRecipeButton'
import banner from "./pexels-photo.jpg";

export class RecipesContainer extends PureComponent {
  static propTypes = {
    recipes: PropTypes.array.isRequired,
    fetchRecipes: PropTypes.func.isRequired,
  }

  componentWillMount() {
    this.props.fetchRecipes()
    this.props.subscribeToRecipesService()
  }

  renderRecipe(recipe, index) {
    return <RecipeItem key={index} { ...recipe }  />
  }

render() {
  return(

      <div className="recipes wrapper">
        <header className="header">
          <div className="image">
            <img src={ banner } className="banner" alt="Pen-Pineapple-Apple-Pen"/>
          </div>
          <div className="search">
            <Search />
          </div>
        </header>

        <div className="dropdowns">
          <DropDowns />
        </div>

        <main>
          <div className="recipes">
            { this.props.recipes.map(this.renderRecipe.bind(this)) }
          </div>
        </main>
      </div>
    )
  }
}

const mapStateToProps = ({ recipes }) => ({ recipes })

export default connect(mapStateToProps, {
  fetchRecipes, subscribeToRecipesService
})(RecipesContainer)
