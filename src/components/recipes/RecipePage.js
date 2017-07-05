import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import ReactMarkdown from 'react-markdown'
import fetchRecipes from '../../actions/recipes/fetch'
import getCurrentRecipe from '../../actions/recipes/get'

import Title from '../Title'
import OtherVersionsButton from '../collaborations/OtherVersionsButton'
import CreateOtherVersionButton from '../collaborations/CreateOtherVersionButton'
import RaisedButton from 'material-ui/RaisedButton'
import Plus from 'material-ui/svg-icons/content/add'
import Minus from 'material-ui/svg-icons/content/remove'
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

    var people=persons
    var items=ingredients

    function removeOnePerson() {
      people--
      if (people>0) {
        document.getElementById('persons').innerHTML = people
        items.map((item) => {
          var hello = people/persons * item.amount
          console.log(hello)
          document.getElementById('ingredient').innerHTML = hello;
        })
      }
    }

    function addOnePerson() {
      people++
      document.getElementById('persons').innerHTML = people;
      items.map((item) => {
        var hello = people/persons * item.amount
        console.log(hello)
        document.getElementById('ingredient').innerHTML = hello;
      })
    }

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
            <p>Voor <b id="persons">{persons}</b> personen:</p>
            <RaisedButton primary={true} icon={<Minus/>} onClick={removeOnePerson}/><RaisedButton primary={true} icon={<Plus/>} onClick={addOnePerson}/>
            <ul>
              {ingredients.map((ingredient) => {
                return (
                  <p><b id="ingredient">{ingredient.amount}</b> {ingredient.measure} {ingredient.ingredient}</p>
                )
              })}
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
