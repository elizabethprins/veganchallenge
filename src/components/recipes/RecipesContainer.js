import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import RecipeItem from './RecipeItem'
import fetchRecipes from '../../actions/recipes/fetch'
import fetchCookbooks from '../../actions/cookbooks/fetch'
import subscribeToRecipesService from '../../actions/recipes/subscribe'
import subscribeToCookbooksService from '../../actions/cookbooks/subscribe'
import Search from './Search'
import DropDowns from './DropDowns'
import './RecipesContainer.css'
import GoToMyRecipesButton from './GoToMyRecipesButton'
import CreateRecipeButton from './CreateRecipeButton'
import banner from "./pexels-photo-cropped.jpg"


export class RecipesContainer extends PureComponent {
  static propTypes = {
    recipes: PropTypes.array.isRequired,
    fetchRecipes: PropTypes.func.isRequired,
    cookbooks: PropTypes.array.isRequired,
  }

  componentWillMount() {
    this.props.fetchRecipes()
    this.props.fetchCookbooks()
    this.props.subscribeToRecipesService()
    this.props.subscribeToCookbooksService()
  }

  renderRecipe(recipe, index) {
    return <RecipeItem key={index} { ...recipe } cookbooks={this.props.cookbooks} />
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

        <div>
          <CreateRecipeButton />
        </div>

        <div>
          <GoToMyRecipesButton />
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

const mapStateToProps = ({ recipes, cookbooks }) => ({ recipes, cookbooks })

export default connect(mapStateToProps, {
  fetchRecipes, fetchCookbooks, subscribeToRecipesService, subscribeToCookbooksService
})(RecipesContainer)
