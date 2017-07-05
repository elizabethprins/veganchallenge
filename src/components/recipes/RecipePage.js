import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import ReactMarkdown from 'react-markdown'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
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

    let people=persons
    let items=ingredients

    function removeOnePerson() {
      people--
      if (people>0) {
        document.getElementById('persons').innerHTML = people
        items.map((item, i) => {
          var hello = people/persons * item.amount
          console.log(hello)
          document.getElementById(`ingredient-${i}`).innerHTML = hello;
        })
      }
    }

    function addOnePerson() {
      people++
      document.getElementById('persons').innerHTML = people;
      items.map((item, i) => {
        var hello = people/persons * item.amount
        console.log(hello)
        document.getElementById(`ingredient-${i}`).innerHTML = hello;
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

        <main>
          <div className="description">
            <ReactMarkdown source={description} />
          </div>

          <div className="cookingSteps">
            <ReactMarkdown source={cookingSteps} />
          </div>

          <div className="ingredients">
            <p>Voor <b id="persons">{persons}</b>{`${persons > 1 ? ' personen' : ' persoon'}`}:</p>
            <RaisedButton primary={true} icon={<Minus/>} onClick={removeOnePerson}/><RaisedButton primary={true} icon={<Plus/>} onClick={addOnePerson}/>
            <ul>
              {ingredients.map((ingredient, i) => {
                return (
                  <p><b id={`ingredient-${i}`}>{ingredient.amount}</b> {ingredient.measure} {ingredient.ingredient}</p>
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

export default connect(mapStateToProps)(RecipePage)
