import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import MyRecipeItem from './MyRecipeItem'
import fetchRecipes from '../../actions/recipes/fetch'
import subscribeToRecipesService from '../../actions/recipes/subscribe'
import CookbookItem from '../cookbooks/CookbookItem'
import fetchCookbooks from '../../actions/cookbooks/fetch'
import subscribeToCookbooksService from '../../actions/cookbooks/subscribe'
import Search from '../recipes/Search'
import Dialog from 'material-ui/Dialog'
import CookbookEditor from '../cookbooks/CookbookEditor'
import RecipeEditor from '../recipes/RecipeEditor'
import Plus from 'material-ui/svg-icons/content/add'
import RaisedButton from 'material-ui/RaisedButton'
import Title from '../Title'
import './MyRecipes.css'


export class MyKitchen extends PureComponent {
  constructor(props) {
    super()

    this.state = { addCookbook: false, addRecipe: false }

    this.handleAddCookbookClose = this.handleAddCookbookClose.bind(this)
    this.handleAddRecipeClose = this.handleAddRecipeClose.bind(this)
  }

  static propTypes = {
    recipes: PropTypes.array.isRequired,
    fetchRecipes: PropTypes.func.isRequired,
    cookbooks: PropTypes.array.isRequired,
    fetchCookbooks: PropTypes.func.isRequired,
  }

  componentWillMount() {
    this.props.fetchRecipes()
    this.props.subscribeToRecipesService()
    this.props.fetchCookbooks()
    this.props.subscribeToCookbooksService()
  }

  renderMyRecipes(recipe, index) {
    return <MyRecipeItem key={index} { ...recipe } />
  }

  renderMyCookbooks(cookbook, index) {
    return <CookbookItem recipes={this.props.recipes} key={index} { ...cookbook } />
  }

  handleAddCookbookOpen() {
    this.setState({ addCookbook: true })
  }

  handleAddCookbookClose() {
    this.setState({ addCookbook: false })
  }

  handleAddRecipeOpen() {
    this.setState({ addRecipe: true })
  }

  handleAddRecipeClose() {
    this.setState({ addRecipe: false })
  }


render() {
  const { recipes } = this.props
  const { cookbooks } = this.props
  const me = this.props.params.currentUserId
  const myRecipes = recipes.filter((recipe) => recipe.authorId === me )
  const myFavorites = recipes.filter((recipe) => recipe.likedBy.includes(me))
  const myCookbooks = cookbooks.filter((cookbook) => cookbook.creatorId === me )

  return(
      <div className="recipes wrapper">
        <header className="header">
        <div className="title">
          <Title content="Mijn Keuken" level={2} />
          </div>
        </header>

        <main>
        <div className="search">
          <Search />
        </div>

        <div className="create-buttons">
          <RaisedButton label="Nieuw recept" primary={true}
          icon={<Plus />} onTouchTap={this.handleAddRecipeOpen.bind(this)} />
            <Dialog
              title="Maak een nieuw recept"
              modal={false}
              open={this.state.addRecipe}
              onRequestClose={this.handleAddRecipeClose.bind(this)}
              autoScrollBodyContent={true}
            >
              <RecipeEditor handleAddRecipeClose={this.handleAddRecipeClose}/>
            </Dialog>

          <RaisedButton label="Nieuw kookboek" primary={true}
          icon={<Plus />} onTouchTap={this.handleAddCookbookOpen.bind(this)} />
            <Dialog
              title="Maak een nieuw kookboek"
              modal={false}
              open={this.state.addCookbook}
              onRequestClose={this.handleAddCookbookClose.bind(this)}
            >
              <CookbookEditor handleAddCookbookClose={this.handleAddCookbookClose}/>
            </Dialog>
        </div>

          <div className="title">
          <Title content="Mijn Recepten" level={2} />
          </div>
          <div className="recipes">
            { myRecipes.map(this.renderMyRecipes.bind(this)) }
          </div>

          <hr />

          <div className="title">
          <Title content="Mijn Kookboeken" level={2} />
          </div>
          <div className="recipes">
            { myCookbooks.map(this.renderMyCookbooks.bind(this)) }
          </div>

          <hr />
          <div className="title">
          <Title content="Favorieten" level={2} />
          </div>
          <div className="recipes">
            { myFavorites.map(this.renderMyRecipes.bind(this)) }
          </div>

        </main>
      </div>
    )
  }
}

const mapStateToProps = ({ recipes, cookbooks }) => ({ recipes, cookbooks })

export default connect(mapStateToProps, {
  fetchRecipes, subscribeToRecipesService, fetchCookbooks, subscribeToCookbooksService
})( MyKitchen )
