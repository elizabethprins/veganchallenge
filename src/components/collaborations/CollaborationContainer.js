import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Title from '../../components/Title'
import fetchRecipes from '../../actions/recipes/fetch'
import subscribeToRecipesService from '../../actions/recipes/subscribe'

export class CollaborationContainer extends PureComponent {
  static propTypes = {
    recipes: PropTypes.array.isRequired,
    fetchRecipes: PropTypes.func.isRequired,
  }

  componentWillMount() {
    this.props.fetchRecipes()
    this.props.subscribeToRecipesService()
  }

  renderRecipe(recipe, index) {
    return ""
  }

render() {
  return(
      <div className="recipes wrapper">
        <header>

        </header>

        <main>
          <div className="recipes">
            { this.props.recipes.map(this.renderRecipe.bind(this)) }
          </div>
        </main>
      </div>
    )
  }
}

const mapStateToProps = ({ recipes }) => ({ recipes })

export default connect(mapStateToProps, {
  fetchRecipes, subscribeToRecipesService
})(CollaborationContainer)