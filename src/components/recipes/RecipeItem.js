// src/recipes/RecipeItem.js
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import LikeButton from '../../components/LikeButton'
import FlatButton from 'material-ui/FlatButton'
import toggleLike from '../../actions/recipes/toggleLike'
// import cBook from 'material-ui/svg-icons/action/alarm'
import cBook from '../../images/food.svg'
import IconButton from 'material-ui/IconButton'
import Dialog from 'material-ui/Dialog'
import Checkbox from 'material-ui/Checkbox'
import ActionFavorite from 'material-ui/svg-icons/action/bookmark'
import ActionFavoriteBorder from 'material-ui/svg-icons/action/bookmark-border'
import './RecipeItem.css'

const PLACEHOLDER = 'http://via.placeholder.com/500x180?text=No%20Image'

export class RecipeItem extends PureComponent {
  state = {
      open: false,
    };

    handleOpen = () => {
      this.setState({open: true});
    };

    handleClose = () => {
      this.setState({open: false});
      console.log(this.props.cookbookId)
    };

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

  addRecipeToCookBook(id) {
    console.log(this.props)
    const { cookbookId } = this.props
    const cookBookId = id
    cookbookId.push(cookBookId)
  }

  render() {
    const { _id, title, picture, liked, likedBy, cookBooks } = this.props

    const actions = [
     <FlatButton
       label="Annuleren"
       primary={true}
       onTouchTap={this.handleClose}
     />,
     <FlatButton
       label="Toevoegen"
       primary={true}
       keyboardFocused={true}
       onTouchTap={this.handleClose}
     />,
   ];

    return(
      <main>
        <article className="recipe">
              <Link to={`/recepten/${_id}`}>
                <div className="cover"
                style={{ backgroundImage: `url(${picture || PLACEHOLDER })` }} />
              </Link>
                <h4> { title } </h4>
            <div className="details">
              <LikeButton
                  liked={liked}
                  likes={likedBy.length}
                  onChange={this.toggleLike.bind(this)} />
              <IconButton onTouchTap={this.handleOpen}><img className="cBook" alt="liked" src={ cBook } /></IconButton>
              <Dialog
                title="Dialog With Actions"
                actions={actions}
                modal={false}
                open={this.state.open}
                onRequestClose={this.handleClose}
              >
              {cookBooks.map(function(cookBook) {
                return <Checkbox
                  checkedIcon={<ActionFavorite />}
                  uncheckedIcon={<ActionFavoriteBorder />}
                  label={cookBook.bookTitle}
                  onCheck={() => this.addRecipeToCookBook(cookBook._id)}
                />
              }.bind(this))}
              </Dialog>
            </div>
        </article>
      </main>
    )
  }
}

const mapStateToProps = ({ currentUser }, { likedBy }) => ({
  liked: !!currentUser && likedBy.includes(currentUser._id),
})

export default connect(mapStateToProps, { toggleLike })(RecipeItem)
