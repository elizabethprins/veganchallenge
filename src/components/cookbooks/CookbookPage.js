import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import CookbookRecipeItem from './CookbookRecipeItem'
import fetchRecipes from '../../actions/recipes/fetch'
import subscribeToRecipesService from '../../actions/recipes/subscribe'
import Title from '../Title'
import './CookbookPage.css'

export class CookbookPage extends PureComponent {
  static propTypes = {
    recipes: PropTypes.array.isRequired,
    fetchRecipes: PropTypes.func.isRequired,
  }

  componentWillMount() {
    this.props.fetchRecipes()
    this.props.subscribeToRecipesService()
  }

  renderCookbookRecipes(recipe, index) {
    return <CookbookRecipeItem key={index} { ...recipe } />
  }

render() {
  const {recipes} = this.props
  const {cookbooks} = this.props
  const thisCookbook = this.props.params.cookbookId
  const cookbookRecipes = recipes.filter((recipe) => recipe.cookbookId.includes(thisCookbook))

  console.log("this props",this.props)

  return(
      <div className="cookbookrecipes wrapper">
        <header className="header">
          <div className="title">
            <Title content="Inhoud kookboek" level={2} />
          </div>
        </header>

        <main>
          <div className="cookbookrecipes">
            { cookbookRecipes.map(this.renderCookbookRecipes.bind(this)) }
          </div>
        </main>
      </div>
    )
  }
}

const mapStateToProps = ({ recipes }) => ({ recipes })

export default connect(mapStateToProps, {
  fetchRecipes, subscribeToRecipesService
})(CookbookPage)
