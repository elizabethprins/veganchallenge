import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import signOut from '../actions/user/sign-out'
import AppBar from 'material-ui/AppBar'
import IconButton from 'material-ui/IconButton'
import FlatButton from 'material-ui/FlatButton'

import Book from 'material-ui/svg-icons/communication/import-contacts'

import PaprikaFull from '../images/paprika_full.svg'
import GoToMyRecipesButton from './mykitchen/GoToMyRecipesButton'

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

  cookbooks = () => {
    this.props.push('/kookboeken')
  }

  myRecipes = () => {
    this.props.push('/')
  }

  createRecipe = () => {
    this.props.push('/nieuw-recept')
  }

  goHome = () => {
    this.props.push('/')
  }

  myRecipes = () => {
    const { currentUser } = this.props
    this.props.push(`/mijn-recepten/${currentUser._id}`)
  }

  render() {
    const { signedIn, signOut } = this.props

    var customTabs = (
            <customTabs label="Categorieen" />
      )

    return (
      <AppBar
        title="veganisme.org"
        iconElementLeft={<IconButton onClick={this.goHome}><img className="heart" alt="liked" src={ PaprikaFull } /></IconButton>}
        iconElementRight={signedIn ?
          <div>
          <GoToMyRecipesButton />
          <FlatButton primary={false} icon={<Book/>} label="Kookboeken" onClick={this.cookbooks} />
          <FlatButton label="Uitloggen" onClick={signOut} />
          </div>
          :
          <div>
          <FlatButton primary={false} icon={<Book/>} label="Kookboeken" onClick={this.cookbooks} />
          <FlatButton label="Registreren" onClick={this.signUp} />
          <FlatButton label="Inloggen" onClick={this.signIn} />
          </div>
        }
      />
    )
  }
}

const mapStateToProps = ({ currentUser }) => ({
  signedIn: !!currentUser && !!currentUser._id,
})

export default connect(mapStateToProps, { push, signOut })(Navigation)
