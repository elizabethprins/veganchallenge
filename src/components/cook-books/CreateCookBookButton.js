import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import RaisedButton from 'material-ui/RaisedButton'
import Icon from 'material-ui/svg-icons/communication/import-contacts'

class CreateCookBookButton extends PureComponent {
  static propTypes = {
    signedIn: PropTypes.bool,
  }

  render() {
    if (!this.props.signedIn) return null

    return (
      <div className="CreateCookBookButton">
        <Link to="/nieuw-kookboek">
          <RaisedButton
            label="Maak nieuw kookboek"
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

export default connect(mapStateToProps)(CreateCookBookButton)
