// src/index.js
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Router, Route, IndexRoute } from 'react-router'
import store, { history } from './store'
import registerServiceWorker from './registerServiceWorker'
import injectTapEventPlugin from 'react-tap-event-plugin'
import App from './App'
import RecipesContainer from './components/recipes/RecipesContainer'
import RecipePage from './components/recipes/RecipePage'
import CollaborationContainer from './components/collaborations/CollaborationContainer'
import SignUp from './components/users/SignUp'
import SignIn from './components/users/SignIn'
import './index.css'

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={RecipesContainer} />
        <Route path="/recepten/:recipeId" component={RecipePage} />
        <Route path="/recepten/:recipeId/andere-versies" component={CollaborationContainer} />
        <Route path="/inloggen" component={SignIn} />
        <Route path="/registreren" component={SignUp} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
)
registerServiceWorker();
