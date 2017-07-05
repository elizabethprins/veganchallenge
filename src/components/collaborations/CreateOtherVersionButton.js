import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import RaisedButton from 'material-ui/RaisedButton'
import Icon from 'material-ui/svg-icons/content/add'

class CreateOtherVersionButton extends PureComponent {
  static propTypes = {
    signedIn: PropTypes.bool,
  }

  render() {
    const { recipeId } = this.props.params

    if (!this.props.signedIn) return null

    return (
      <div className="CreateOtherVersionButton">
        <Link to={`/recepten/${recipeId}/nieuwe-versie`}>
          <RaisedButton
            label="Voeg een nieuwe versie toe"
            primary={true}
            icon={<Icon />} />
        </Link>
      </div>
    )
  }
}

const mapStateToProps = ({ currentUser }) => ({
  signedIn: !!currentUser && !!currentUser._id,
})

export default connect(mapStateToProps)(CreateOtherVersionButton)
