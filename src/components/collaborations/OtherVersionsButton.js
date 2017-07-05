import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import RaisedButton from 'material-ui/RaisedButton'
import Icon from 'material-ui/svg-icons/action/receipt'

class OtherVersionsButton extends PureComponent {
  static propTypes = {
    signedIn: PropTypes.bool,
  }

  render() {
    const { _id } = this.props
    console.log(this.props)
    if (!this.props.signedIn) return null

    return (
      <div className="CreateRecipeButton">
        <Link to={`/recepten/${_id}/andere-versies`}>
          <RaisedButton
            label="Klik hier om meerdere versies van dit recept te zien"
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

export default connect(mapStateToProps)(OtherVersionsButton)
