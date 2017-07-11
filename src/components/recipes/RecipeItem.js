// src/recipes/RecipeItem.js
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import LikeButton from '../../components/LikeButton'
import FlatButton from 'material-ui/FlatButton'
import toggleLike from '../../actions/recipes/toggleLike'
import addToRecipe from '../../actions/cookbooks/add-recipe'
import CookBook from 'material-ui/svg-icons/communication/import-contacts'
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
      activeCheckboxes: JSON.parse(localStorage.getItem('activeCheckboxes')) || []
    }

  handleOpen = () => {
    this.setState({open: true})
  }

  handleClose = () => {
    this.setState({open: false})
  }

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

  addRecipeToCookbook(id) {
    let found = this.state.activeCheckboxes.includes(id)
    if (found) {
      this.setState({
        activeCheckboxes: this.state.activeCheckboxes.filter(x => x !== id)
      })
    } else {
      this.setState({
        activeCheckboxes: this.state.activeCheckboxes.concat(id)}, () => { localStorage.setItem('activeCheckboxes', JSON.stringify(this.state.activeCheckboxes))})
      }

    const cookbook = id
    const { _id } = this.props
    this.props.addToRecipe(_id, cookbook)
  }

  render() {
    const { _id, title, picture, liked, likedBy, cookbooks, currentUser } = this.props
    const { activeCheckboxes } =this.state

    const myCookbooks = cookbooks.filter((cookbook) => (cookbook.creatorId === this.props.currentUser._id))

    const actions = [
     <FlatButton
       label="Annuleren"
       primary={false}
       onTouchTap={this.handleClose}
     />,
     <FlatButton
       label="Toevoegen"
       primary={false}
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
              <IconButton className="button" onTouchTap={this.handleOpen}><CookBook /></IconButton>
              <Dialog
                title="Dit recept aan een kookboek toevoegen"
                actions={actions}
                modal={false}
                open={this.state.open}
                onRequestClose={this.handleClose}
              >
              {myCookbooks.map(function(cookbook) {
                return <Checkbox
                  iconStyle={{'fill': '#B30000'}}
                  checkedIcon={<ActionFavorite />}
                  uncheckedIcon={<ActionFavoriteBorder />}
                  label={cookbook.bookTitle}
                  onCheck={() => this.addRecipeToCookbook(cookbook._id)}
                  checked={this.state.activeCheckboxes.includes(cookbook._id)}
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
  currentUser
})

export default connect(mapStateToProps, { toggleLike, addToRecipe })(RecipeItem)
