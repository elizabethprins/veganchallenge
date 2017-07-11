import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import CookbookItem from './CookbookItem'
import fetchCookbooks from '../../actions/cookbooks/fetch'
import fetchRecipes from '../../actions/recipes/fetch'
import subscribeToCookbooksService from '../../actions/cookbooks/subscribe'
import './CookbooksContainer.css'
import Title from '../Title'

export class CookbooksContainer extends PureComponent {
  constructor(props) {
    super()

    this.state = { addCookbook: false }

    this.handleAddCookbookClose = this.handleAddCookbookClose.bind(this)
  }

  static propTypes = {
    cookbooks: PropTypes.array.isRequired,
    fetchCookbooks: PropTypes.func.isRequired,
  }

  componentWillMount() {
    this.props.fetchCookbooks()
    this.props.fetchRecipes()
    this.props.subscribeToCookbooksService()
  }

  renderCookbook(cookbook, index) {
    return <CookbookItem recipes={this.props.recipes} key={index} { ...cookbook }  />
  }

  handleAddCookbookOpen() {
    this.setState({ addCookbook: true })
  }

  handleAddCookbookClose() {
    this.setState({ addCookbook: false })
  }

  render() {
    return(
        <div className="cookbooks wrapper">
          <header className="header">
            <div className="title">
              <Title content="Kookboeken" level={2} />
            </div>
          </header>

          <main>
            <div>
            </div>
            <div className="cookbooks">
              { this.props.cookbooks.map(this.renderCookbook.bind(this)) }
            </div>
          </main>
      </div>
    )
  }
}

const mapStateToProps = ({ recipes, cookbooks }) => ({ recipes, cookbooks })

export default connect(mapStateToProps, {
  fetchCookbooks, fetchRecipes, subscribeToCookbooksService
})(CookbooksContainer)
