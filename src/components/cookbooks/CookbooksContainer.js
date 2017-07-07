import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import RaisedButton from 'material-ui/RaisedButton'
import Icon from 'material-ui/svg-icons/communication/import-contacts'
import CookbookItem from './CookbookItem'
import fetchCookbooks from '../../actions/cookbooks/fetch'
import subscribeToCookbooksService from '../../actions/cookbooks/subscribe'
import Dialog from 'material-ui/Dialog'
import CookbookEditor from './CookbookEditor'
import Plus from 'material-ui/svg-icons/content/add'
import './CookbooksContainer.css'

export class CookbooksContainer extends PureComponent {
  constructor(props) {
    super()

    this.state = { addCookBook: false }

    this.handleAddCookBookClose = this.handleAddCookBookClose.bind(this)
  }

  static propTypes = {
    cookbooks: PropTypes.array.isRequired,
    fetchCookbooks: PropTypes.func.isRequired,
  }

  componentWillMount() {
    this.props.fetchCookbooks()
    this.props.subscribeToCookbooksService()
  }

  componentDidMount(){
    if (!this.props.signedIn){
      this.props.router.push('/sign-in')
    }
  }

  renderCookbook(cookbook, index) {
    return <CookbookItem key={index} { ...cookbook }  />
  }

  handleAddCookBookOpen() {
    this.setState({ addCookBook: true })
  }

  handleAddCookBookClose() {
    this.setState({ addCookBook: false })
  }

  render() {
    return(
      <div className="cookbooks wrapper">
        <header className="header">
          <RaisedButton label="Nieuw kookboek" primary={true}
          icon={<Plus />} onTouchTap={this.handleAddCookBookOpen.bind(this)} />
            <Dialog
              title="Maak een nieuw kookboek"
              modal={false}
              open={this.state.addCookBook}
              onRequestClose={this.handleAddCookBookClose.bind(this)}
            >
              <CookbookEditor handleAddCookBookClose={this.handleAddCookBookClose}/>
            </Dialog>
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
