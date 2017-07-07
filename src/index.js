// src/index.js
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Router, Route, IndexRoute } from 'react-router'
import store, { history } from './store'
import registerServiceWorker from './registerServiceWorker'
import App from './App'
import RecipesContainer from './components/recipes/RecipesContainer'
import RecipePage from './components/recipes/RecipePage'
import CookbooksContainer from './components/cookbooks/CookbooksContainer'
import SignUp from './components/users/SignUp'
import SignIn from './components/users/SignIn'
import RecipeEditor from './components/recipes/RecipeEditor'
import CookbookEditor from './components/cookbooks/CookbookEditor'
import './index.css'

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={RecipesContainer} />
        <Route path="/recepten/:recipeId" component={RecipePage} />
        <Route path="/cookBook" />
        <Route path="/nieuw-recept" component={RecipeEditor} />
        <Route path="/kookboeken" component={CookbooksContainer} />
        <Route path="/nieuw-kookboek" component={CookbookEditor} />
        <Route path="/inloggen" component={SignIn} />
        <Route path="/registreren" component={SignUp} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
)
registerServiceWorker();
