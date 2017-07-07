import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import CreateCookbookButton from './CreateCookbookButton'
import CookbookItem from './CookbookItem'
import fetchCookbooks from '../../actions/cookbooks/fetch'
import subscribeToCookbooksService from '../../actions/cookbooks/subscribe'


export class CookbooksContainer extends PureComponent {
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


  render() {
    if (!this.props.signedIn) return null

    console.log(this.props)
    console.log('hello')

    return(
      <div>
        <h1>Dit zijn jouw kookboeken</h1>
        <div>
          <CreateCookbookButton />
            { this.props.cookbooks.map(this.renderCookbook.bind(this)) }
        </div>
      </div>
    )
  }
}


const mapStateToProps = ({ currentUser, cookbooks }) => ({
  signedIn: !!currentUser && !!currentUser._id,
  cookbooks })

export default connect(mapStateToProps, {
  fetchCookbooks, subscribeToCookbooksService
})(CookbooksContainer)
