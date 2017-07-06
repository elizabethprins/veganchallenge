// src/components/Navigation.js
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import signOut from '../actions/user/sign-out'
import AppBar from 'material-ui/AppBar'
import IconButton from 'material-ui/IconButton'
import LocalDining from 'material-ui/svg-icons/maps/local-dining'
import FlatButton from 'material-ui/FlatButton'
import HeartRed from '../images/paprika_full.svg'

class Navigation extends PureComponent {
  static propTypes = {
    signedIn: PropTypes.bool,
    push: PropTypes.func.isRequired,
    signOut: PropTypes.func.isRequired,
  }

  signUp = () => {
    this.props.push('/registreren')
  }

  signIn = () => {
    this.props.push('/inloggen')
  }

  goHome = () => {
    this.props.push('/')
  }

  render() {
    const { signedIn, signOut } = this.props
    return (
      <AppBar
        title="Vegan Recepten"
        iconElementLeft={<IconButton onClick={this.goHome}><img className="heart" alt="liked" src={ HeartRed } /></IconButton>}
        iconElementRight={signedIn ?
          <FlatButton label="Uitloggen" onClick={signOut} /> :
          <div><FlatButton label="Registreren" onClick={this.signUp} />
          <FlatButton label="Inloggen" onClick={this.signIn} /></div>
        }
      />
    )
  }
}

const mapStateToProps = ({ currentUser }) => ({
  signedIn: !!currentUser && !!currentUser._id,
})

export default connect(mapStateToProps, { push, signOut })(Navigation)
