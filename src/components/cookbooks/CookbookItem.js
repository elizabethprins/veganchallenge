import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import './CookbookItem.css'

class CookbookItem extends PureComponent {
  static propTypes = {
    _id: PropTypes.string.isRequired,
    bookTitle: PropTypes.string.isRequired,
    summary: PropTypes.string.isRequired,
  }

  render() {
    const { _id, bookTitle, summary, recipes } = this.props
    console.log(this.props)
    const recipeInCookbook = recipes.filter((recipe) => (recipe.cookbookId.includes(_id)))
    const randomRecipe = recipeInCookbook[Math.floor(Math.random()*recipeInCookbook.length)]

    return(
      <main>
        <article className="cookbook">
          <Link to={`/kookboeken/${_id}`}>
          <div className="cover"
          style={{ backgroundImage: `url(${randomRecipe === undefined ? "http://members.ziggo.nl/jpmmetselaar/contents/media/kookboek.jpg" : randomRecipe.picture})` }} />
          </Link>
          <br/>
          <h3> {bookTitle} </h3>
          <p> {summary} </p>
        </article>
      </main>
    )
  }
}


const mapStateToProps = ({ currentUser }) => ({
  signedIn: !!currentUser && !!currentUser._id })

export default connect(mapStateToProps)(CookbookItem)
