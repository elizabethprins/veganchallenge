import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import RaisedButton from 'material-ui/RaisedButton'
import Recipe from 'material-ui/svg-icons/action/receipt'
import Plus from 'material-ui/svg-icons/content/add'
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
            label="Nieuw Recept"
            primary={true}
            icon={<Plus />} />
        </Link>
      </div>
    )
  }
}

const mapStateToProps = ({ currentUser }) => ({
  signedIn: !!currentUser && !!currentUser._id,
})

export default connect(mapStateToProps)(CreateRecipeButton)
