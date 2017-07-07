import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import RaisedButton from 'material-ui/RaisedButton'
import Recipe from 'material-ui/svg-icons/action/receipt'
import './CreateRecipeButton.css'

class GoToMyRecipesButton extends PureComponent {
  static propTypes = {
    signedIn: PropTypes.bool,
  }

  render() {
    const {currentUser} = this.props

    if (!this.props.signedIn) return null

    console.log("currentUser", currentUser)
    console.log("props!", this.props)

    return (
      <div className="CreateRecipeButton">
        <Link to={`/mijn-recepten/${currentUser._id}`}>
          <RaisedButton
            label="Mijn Recepten"
            primary={true}
            icon={<Recipe />} />
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
