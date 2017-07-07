import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Loading from './components/Loading'
import LoadErrorMessage from './components/LoadErrorMessage'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import muiTheme from './styles/theme'
import Navigation from './components/Navigation'
import injectTapEventPlugin from 'react-tap-event-plugin'
import './App.css'

injectTapEventPlugin();

class App extends Component {
  static childContextTypes = {
    muiTheme: PropTypes.object.isRequired,
  }

  getChildContext() {
    return { muiTheme }
  }

  render() {
    const { currentUser } = this.props
    console.log(this.props)
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div className="App">
          <Loading />
          <Navigation props={this.props.currentUser}/>
          { this.props.children }
          <LoadErrorMessage />
        </div>
      </MuiThemeProvider>
    )
  }
}

export default App
