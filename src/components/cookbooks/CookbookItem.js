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
        <article className="cookbook">
          <Link to={`/kookboeken/${_id}`}>
          <div className="cover"
          style={{ backgroundImage: `url(http://www.iconsdb.com/icons/preview/black/book-xxl.png)` }} />
          </Link>
          <h3> {bookTitle} </h3>
          <p> {summary} </p>
        </article>
      </main>
    )
  }
}


const mapStateToProps = ({ currentUser }) => ({
  signedIn: !!currentUser && !!currentUser._id })

export default connect(mapStateToProps)(CookbookItem)
