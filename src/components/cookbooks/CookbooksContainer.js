import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import RaisedButton from 'material-ui/RaisedButton'
import CookbookItem from './CookbookItem'
import fetchCookbooks from '../../actions/cookbooks/fetch'
import subscribeToCookbooksService from '../../actions/cookbooks/subscribe'
import Dialog from 'material-ui/Dialog'
import CookbookEditor from './CookbookEditor'
import Plus from 'material-ui/svg-icons/content/add'
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
    this.props.subscribeToCookbooksService()
  }

  renderCookbook(cookbook, index) {
    return <CookbookItem key={index} { ...cookbook }  />
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

const mapStateToProps = ({ cookbooks }) => ({ cookbooks })

export default connect(mapStateToProps, {
  fetchCookbooks, subscribeToCookbooksService
})(CookbooksContainer)
