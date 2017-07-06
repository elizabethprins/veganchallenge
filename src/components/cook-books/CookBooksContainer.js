import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import CreateCookBookButton from './CreateCookBookButton'

export class CookBooksContainer extends PureComponent {

  render() {
    return(
      <div className="CookBooks">
        <h1>Dit zijn jouw kookboeken</h1>
        <div>
          <CreateCookBookButton />
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ currentUser }) => ({
  signedIn: !!currentUser && !!currentUser._id,
})

export default connect(mapStateToProps)(CookBooksContainer)
