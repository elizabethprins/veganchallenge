// src/recipes/RecipeItem.js
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import LikeButton from '../../components/LikeButton'
import toggleLike from '../../actions/recipes/toggleLike'

import './RecipePage.css'
import { Link } from 'react-router'

const PLACEHOLDER = 'http://www.jennybeaumont.com/wp-content/uploads/2015/03/placeholder.gif'

export class RecipeItem extends PureComponent {
  static propTypes = {
    liked: PropTypes.bool,
    toggleLike: PropTypes.func.isRequired,
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    picture: PropTypes.string,
    persons: PropTypes.number,
    ingredients: PropTypes.array,
    breakfast: PropTypes.bool,
    brunch: PropTypes.bool,
    lunch: PropTypes.bool,
    snacks: PropTypes.bool,
    appetizer: PropTypes.bool,
    dinner: PropTypes.bool,
    dessert: PropTypes.bool,
    drink: PropTypes.bool,
    chinese: PropTypes.bool,
    indian: PropTypes.bool,
    mexican: PropTypes.bool,
    thai: PropTypes.bool,
    vietnamese: PropTypes.bool,
    indonesian: PropTypes.bool,
    greek: PropTypes.bool,
    italian: PropTypes.bool,
    spanish: PropTypes.bool,
    libanese: PropTypes.bool,
    maroccan: PropTypes.bool,
    westAfrican: PropTypes.bool,
    french: PropTypes.bool,
    bbq: PropTypes.bool,
    valentine: PropTypes.bool,
    birthday: PropTypes.bool,
    highTea: PropTypes.bool,
    easter: PropTypes.bool,
    halloween: PropTypes.bool,
    sinterklaas: PropTypes.bool,
    christmas: PropTypes.bool,
    spring: PropTypes.bool,
    summer: PropTypes.bool,
    autumn: PropTypes.bool,
    winter: PropTypes.bool,
    nuts: PropTypes.bool,
    gluten: PropTypes.bool,
    sugar: PropTypes.bool,
    soy: PropTypes.bool,
    raw: PropTypes.bool,
    lessThanFifteen: PropTypes.bool,
    fifteenToThirty: PropTypes.bool,
    thirtyToOneHour: PropTypes.bool,
    moreThanOneHour: PropTypes.bool,
    description: PropTypes.string,
    cookingSteps: PropTypes.string,
    tip: PropTypes.string,
    author: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }),
    likedBy: PropTypes.bool,
    comments: PropTypes.string,
  }

  toggleLike() {
      const { _id, liked } = this.props
      this.props.toggleLike(_id, liked)
    }


  render() {
    const {
      _id, title, picture, persons, ingredients, breakfast, brunch, lunch, snacks, appetizer, diner, dessert,
      drink, chinese, indian, mexican, thai, vietnamese, indonesian, greek, italian, spanish, libanese, maroccan,
      westAfrican, french, bbq, valentine, birthday, highTea, easter, halloween, sinterklaas, christmas, spring,
      summer, autumn, winter, nuts, gluten, sugar, soy, raw, lessThanFifteen, thirtyToOneHour, moreThanOneHour,
      description, cookingSteps, tip,liked, likedBy, author, comments,
    } = this.props

    return(
      <main>
      <article className="recipe">
          <Link to={`/recepten/${_id}`}>
            <div className="cover"
            style={{ backgroundImage: `url(${picture || PLACEHOLDER })` }} Link to={`/recepten/${_id}`} />
          </Link>
          <div className="details">
            <h5> { title } </h5>
            <LikeButton
                liked={liked}
                likes={likedBy.length}
                onChange={this.toggleLike.bind(this)} />
          </div>
      </article>
        </main>
    )
  }
}

const mapStateToProps = ({ currentUser }, { likedBy }) => ({
  signedIn: !!currentUser && !!currentUser._id,
  liked: !!currentUser && likedBy.includes(currentUser._id),
})

export default connect(mapStateToProps, { toggleLike })(RecipeItem)
