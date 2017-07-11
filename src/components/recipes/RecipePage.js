import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import fetchRecipes from '../../actions/recipes/fetch'
import ReactMarkdown from 'react-markdown'
import Title from '../Title'
import LikeButton from '../../components/LikeButton'
import RaisedButton from 'material-ui/RaisedButton'
import Plus from 'material-ui/svg-icons/content/add'
import Minus from 'material-ui/svg-icons/content/remove'
import './RecipePage.css'

export class RecipePage extends PureComponent {
  static propTypes = {
    fetchRecipes: PropTypes.func.isRequired,
    _id: PropTypes.string,
    title: PropTypes.string,
    picture: PropTypes.string,
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


  render() {
    
    const {
      _id,
      title,
      picture,
      description,
      cookingSteps,
      persons,
      ingredients,
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
          if (item.amount !== undefined) {
            var minusAmount = Math.round((people/persons * item.amount) * 4) /4
            document.getElementById(`ingredient-${i}`).innerHTML = minusAmount
          }
        })
      }
    }

    function addOnePerson() {
      people++
      if (people>0) {
        document.getElementById('persons').innerHTML = people;
        items.map((item, i) => {
          if (item.amount !== undefined) {
            var plusAmount = Math.round((people/persons * item.amount) * 4) /4
            document.getElementById(`ingredient-${i}`).innerHTML = plusAmount
          }
        })
      }
    }

    return(
      <div className="recipepage wrapper">
        <header>
          <Title content={ title } />
          <p className="author">Geschreven door: { author.name }</p>
        </header>

        <main>
          <div className="recipedetails">
            <img className="image" src={picture} alt="foto" />

            <div className="description">
              <ReactMarkdown source={description} />
              <p><strong>Bereiding</strong></p>
              <ReactMarkdown source={cookingSteps} />

              <p>Aantal personen: <b id="persons">{persons}</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <RaisedButton primary={true} icon={<Minus/>} onClick={removeOnePerson}/><RaisedButton primary={true} icon={<Plus/>} onClick={addOnePerson}/></p>

              <ul>
                {ingredients.map((ingredient, i) => {
                  return (
                    <div key={i}>
                      <p><b id={`ingredient-${i}`}>{ingredient.amount}</b> {ingredient.measure} {ingredient.ingredient}</p>
                    </div>
                  )
                })}
              </ul>
            </div>
          </div>
        </main>
      </div>
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
