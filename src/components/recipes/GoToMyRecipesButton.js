import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import RaisedButton from 'material-ui/RaisedButton'
import RecipeIcon from 'material-ui/svg-icons/communication/import-contacts'
import './CreateRecipeButton.css'

class GoToMyRecipesButton extends PureComponent {
  static propTypes = {
    signedIn: PropTypes.bool,
  }

  render() {
    const {currentUser} = this.props

    if (!this.props.signedIn) return null

    return (
      <div className="CreateRecipeButton">
        <Link to={`/mijn-recepten/${currentUser._id}`}>
          <RaisedButton
            label="Mijn Recepten"
            primary={true}
            icon={<RecipeIcon />} />
        </Link>
      </div>
    )
  }
}

const mapStateToProps = ({ currentUser }) => ({
  signedIn: !!currentUser && !!currentUser._id,
  currentUser
})

export default connect(mapStateToProps)(GoToMyRecipesButton)
