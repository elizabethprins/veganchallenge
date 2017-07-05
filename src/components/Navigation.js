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
import TextField from 'material-ui/TextField'
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Search from './recipes/Search.js'


class Navigation extends PureComponent {
  static propTypes = {
    signedIn: PropTypes.bool,
    push: PropTypes.func.isRequired,
    signOut: PropTypes.func.isRequired,
  }

  signUp = () => {
    this.props.push('/inloggen')
  }

  goHome = () => {
    this.props.push('/')
  }

  render() {
    const { signedIn, signOut } = this.props

    var customTabs = (
            <customTabs label="Categorieen" />
      )

    return (
      <AppBar
        title="Recepten"
        // iconElementLeft={<IconButton onClick={this.goHome}><LocalDining /></IconButton>}
        iconElementLeft={<Search />}
        iconElementRight={signedIn ?
          <FlatButton label="Sign out" onClick={signOut} /> :
          <FlatButton label="Sign up" onClick={this.signUp} />}
      />
    )
  }
}

const mapStateToProps = ({ currentUser }) => ({
  signedIn: !!currentUser && !!currentUser._id,
})

export default connect(mapStateToProps, { push, signOut })(Navigation)
