// src/recipes/RecipeItem.js
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import LikeButton from '../../components/LikeButton'
import toggleLike from '../../actions/recipes/toggleLike'
// import cBook from 'material-ui/svg-icons/action/alarm'
import cBook from '../../images/food.svg'
import { history } from '../../store'
import IconButton from 'material-ui/IconButton'
import './RecipeItem.css'

const PLACEHOLDER = 'http://via.placeholder.com/500x180?text=No%20Image'

export class RecipeItem extends PureComponent {
  static propTypes = {
    liked: PropTypes.bool,
    toggleLike: PropTypes.func.isRequired,
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    picture: PropTypes.string,
    likedBy: PropTypes.array,
  }

  toggleLike() {
      const { _id, liked } = this.props
      this.props.toggleLike(_id, liked)
    }

  cookBook () {
    history.push('/cookBook')
  }

  render() {
    const { _id, title, picture, liked, likedBy } = this.props



    return(
      <main>
      <article className="recipe">
            <h5> { title } </h5>
            <Link to={`/recepten/${_id}`}>
              <div className="cover"
              style={{ backgroundImage: `url(${picture || PLACEHOLDER })` }} />
            </Link>
          <div className="details">
            <LikeButton
                liked={liked}
                likes={likedBy.length}
                onChange={this.toggleLike.bind(this)} />
            <IconButton onClick={this.cookBook}><img className="cBook" alt="liked" src={ cBook } /></IconButton>
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
