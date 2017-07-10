import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import MyRecipeItem from './MyRecipeItem'
import './RecipesContainer.css'
import fetchRecipes from '../../actions/recipes/fetch'
import subscribeToRecipesService from '../../actions/recipes/subscribe'
import Search from './Search'
import DropDowns from './DropDowns'
import CreateRecipeButton from './CreateRecipeButton'
import Title from '../Title'
import RaisedButton from 'material-ui/RaisedButton'
import Plus from 'material-ui/svg-icons/content/add'
import RecipeEditor from './RecipeEditor'
import Dialog from 'material-ui/Dialog'
import './RecipeEditor.css'

export class MyRecipes extends PureComponent {
  constructor(props) {
    super()

    this.state = { addRecipe: false }

    this.handleAddRecipeClose = this.handleAddRecipeClose.bind(this)
  }

  static propTypes = {
    recipes: PropTypes.array.isRequired,
    fetchRecipes: PropTypes.func.isRequired,
  }

  componentWillMount() {
    this.props.fetchRecipes()
    this.props.subscribeToRecipesService()
  }

  renderMyRecipes(recipe, index) {
    return <MyRecipeItem key={index} { ...recipe } />
  }

  handleAddRecipeOpen() {
    this.setState({ addRecipe: true })
  }

  handleAddRecipeClose() {
    this.setState({ addRecipe: false })
  }

render() {
  const {recipes} = this.props
  const myRecipes = recipes.filter((recipe) => recipe.authorId === this.props.params.currentUserId)

  return(
      <div className="recipes wrapper">
        <header className="header">
          <div className="title">
            <Title content="Jouw Recepten" level={2} />
          </div>
          <div className="search">
            <Search />
          </div>
        </header>

        <div className="dropdowns">
          <DropDowns />
        </div>

        <div>
          <RaisedButton label="Nieuw recept" primary={true}
          icon={<Plus />} onTouchTap={this.handleAddRecipeOpen.bind(this)} />
            <Dialog
              title="Maak een nieuw recept"
              modal={false}
              open={this.state.addRecipe}
              onRequestClose={this.handleAddRecipeClose.bind(this)}
            >
              <RecipeEditor handleAddRecipeClose={this.handleAddRecipeClose}/>
            </Dialog>
        </div>

        <main>
          <div className="recipes">
            { myRecipes.map(this.renderMyRecipes.bind(this)) }
          </div>
        </main>
      </div>
    )
  }
}

const mapStateToProps = ({ recipes }) => ({ recipes })

export default connect(mapStateToProps, {
  fetchRecipes, subscribeToRecipesService
})(MyRecipes)
