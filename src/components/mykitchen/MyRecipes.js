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
import DropDowns from '../recipes/DropDowns'
import CreateRecipeButton from './CreateRecipeButton'
import CreateCookbookButton from './CreateCookbookButton'
import Dialog from 'material-ui/Dialog'
import CookbookEditor from '../cookbooks/CookbookEditor'
import Plus from 'material-ui/svg-icons/content/add'
import RaisedButton from 'material-ui/RaisedButton'
import Title from '../Title'
import './MyRecipes.css'


export class MyKitchen extends PureComponent {
  constructor(props) {
    super()

    this.state = { addCookbook: false }

    this.handleAddCookbookClose = this.handleAddCookbookClose.bind(this)
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
    return <CookbookItem key={index} { ...cookbook } />
  }

  handleAddCookbookOpen() {
    this.setState({ addCookbook: true })
  }

  handleAddCookbookClose() {
    this.setState({ addCookbook: false })
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
          <Title content="Jouw Keuken" />
          </div>
          <div className="search">
            <Search />
          </div>
        </header>

        <div className="dropdowns">
          <DropDowns />
        </div>

        <div className="create-buttons">
          <CreateRecipeButton />
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

        <main>
          <div className="recipes">
          <Title content="Jouw Recepten" />
            { myRecipes.map(this.renderMyRecipes.bind(this)) }
          </div>

          <hr />

          <div className="recipes">
          <Title content="Jouw Kookboeken" />
            { myCookbooks.map(this.renderMyCookbooks.bind(this)) }
          </div>

          <hr />

          <div className="recipes">
          <Title content="Jouw Favorieten" />
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
