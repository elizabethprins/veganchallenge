import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import RaisedButton from 'material-ui/RaisedButton'
import NewRecipeIcon from 'material-ui/svg-icons/communication/import-contacts'
import './CreateRecipeButton.css'

class CreateRecipeButton extends PureComponent {
  static propTypes = {
    signedIn: PropTypes.bool,
  }

  render() {
    if (!this.props.signedIn) return null

    return (
      <div className="CreateRecipeButton">
        <Link to="/nieuw-recept">
          <RaisedButton
<<<<<<< HEAD
            label="Recept Toevoegen"
=======
            label="Voeg recept toe"
>>>>>>> 459c6ceeafeb55fc2eb23e1132bc02b362f3c027
            primary={true}
            icon={<NewRecipeIcon />} />
        </Link>
      </div>
    )
  }
}

const mapStateToProps = ({ currentUser }) => ({
  signedIn: !!currentUser && !!currentUser._id,
})

export default connect(mapStateToProps)(CreateRecipeButton)
