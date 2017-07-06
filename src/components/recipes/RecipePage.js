import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import ReactMarkdown from 'react-markdown'
import Title from '../Title'
import RaisedButton from 'material-ui/RaisedButton'
import Plus from 'material-ui/svg-icons/content/add'
import Minus from 'material-ui/svg-icons/content/remove'
import './RecipePage.css'

export class RecipePage extends PureComponent {
  static propTypes = {
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

  toggleLike() {
    const { _id } = this.props
    this.props.toggleLike(_id)
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
      <div className="recipepage wrapper">
        <header>
          <Title content={ title } />
          <p className="author">By: { author.name }</p>
        </header>

        <main>
          <div className="recipedetails">
            <img className="image" src={picture} alt="foto" />

            <div className="description">
              <ReactMarkdown source={description} />
              <p><strong>Bereiding</strong></p>
              <ReactMarkdown source={cookingSteps} />
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
          </div>
        </main>

        <footer>
        </footer>
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

export default connect(mapStateToProps)(RecipePage)
