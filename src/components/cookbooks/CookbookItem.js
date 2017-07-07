import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import './CookbookItem.css'

class CookbookItem extends PureComponent {
  static propTypes = {
    _id: PropTypes.string.isRequired,
    bookTitle: PropTypes.string.isRequired,
    summary: PropTypes.string.isRequired,
  }

  render() {
    const { _id, bookTitle, summary } = this.props;

    return(
      <main>
        <h1> {bookTitle} </h1>
        <h2> {summary} </h2>
      </main>
    )
  }
}


const mapStateToProps = ({ currentUser }) => ({
  signedIn: !!currentUser && !!currentUser._id })

export default connect(mapStateToProps)(CookbookItem)
