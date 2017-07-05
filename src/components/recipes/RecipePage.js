import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import ReactMarkdown from 'react-markdown'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'

import './RecipeItem.css'
import fetchRecipes from '../../actions/recipes/fetch'
import Title from '../Title'


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
    this.props.fetchRecipes()
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

export default connect(mapStateToProps, { fetchRecipes })(RecipePage)
