import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import ReactMarkdown from 'react-markdown'
import fetchRecipes from '../../actions/recipes/fetch'
import getCurrentRecipe from '../../actions/recipes/get'

import Title from '../Title'
import OtherVersionsButton from '../collaborations/OtherVersionsButton'
import CreateOtherVersionButton from '../collaborations/CreateOtherVersionButton'
import './RecipeItem.css'


export class RecipePage extends PureComponent {
  static propTypes = {
    _id: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    cookingSteps: PropTypes.string,
    persons: PropTypes.number,
    tip: PropTypes.string,
    fetchRecipes: PropTypes.func.isRequired,
    author: PropTypes.shape({
      name: PropTypes.string.isRequired,
    })
  }

  componentWillMount() {
    const { recipe, getCurrentRecipe } = this.props
    const { recipeId } = this.props.params
    getCurrentRecipe(recipeId)
  }

  toggleLike() {
    const { _id } = this.props
    this.props.toggleLike(_id)
  }


  renderIngredientList(ingredient) {
    return (
      <p>{ingredient.amount} {ingredient.measure} {ingredient.ingredient}</p>
    )
  }


  render() {
    const {
      _id,
      title,
      description,
      cookingSteps,
      persons,
      ingredients,
      picture,
      author,
    } = this.props

    if (!_id) return null

    return(
      <article className="recipe page">
        <header>
          <div
            className="cover"
            style={{ backgroundImage: `url(${picture})` }} />
          <Title content={ title } />
          <p className="author">By: { author.name }</p>
        </header>

        <OtherVersionsButton params={this.props.params} />
        <CreateOtherVersionButton params={this.props.params}/>

        <main>
          <div className="description">
            <ReactMarkdown source={description} />
          </div>

          <div className="cookingSteps">
            <ReactMarkdown source={cookingSteps} />
          </div>

          <div className="ingredients">
            <ul>
              <strong>{`Voor ${persons} ${persons > 1 ? 'personen' : 'persoon'}:`}</strong>
              {ingredients.map(this.renderIngredientList)}
            </ul>
          </div>
        </main>
      </article>
    )
  }
}

const mapStateToProps = ({ recipes }, { params }) => {
  const recipe = recipes.reduce((prev, next) => {
    if (next._id === params.recipeId) {
      return next
    }
    return prev
  }, {})

  return {
    ...recipe
  }
}

export default connect(mapStateToProps, { getCurrentRecipe })(RecipePage)
