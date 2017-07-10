import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import RaisedButton from 'material-ui/RaisedButton'
import Plus from 'material-ui/svg-icons/content/add'
import './CreateRecipeButton.css'

class CreateCookbookButton extends PureComponent {
  static propTypes = {
    signedIn: PropTypes.bool,
  }

  render() {
    if (!this.props.signedIn) return null

    return (
      <div className="CreateCookbookButton">
        <Link to="/nieuw-kookboek">
          <RaisedButton
            label="Nieuw Kookboek"
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

export default connect(mapStateToProps)(CreateCookbookButton)
