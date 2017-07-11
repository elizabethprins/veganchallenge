import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import RaisedButton from 'material-ui/RaisedButton'
import Recipe from 'material-ui/svg-icons/action/receipt'
import './GoToMyRecipesButton.css'

class GoToMyRecipesButton extends PureComponent {
  static propTypes = {
    signedIn: PropTypes.bool,
  }

  render() {
    const {currentUser} = this.props

    if (!this.props.signedIn) return null

    return (
      <div className="GoToMyRecipesButton">
        <Link to={`/mijn-recepten/${currentUser._id}`}>
          <RaisedButton
            label="Mijn Keuken"
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
