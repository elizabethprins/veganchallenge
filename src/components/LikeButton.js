// src/components/LikeButton.js
import React, { PureComponent } from 'react'
import HeartGrey from '../images/paprika.svg'
import HeartRed from '../images/paprika_full.svg'
import './LikeButton.css'

class LikeButton extends PureComponent {
  classNames() {
    const { liked } = this.props
    const classes = 'LikeButton'

    if (liked) return classes + ' liked'

    return classes
  }

  likeStatus() {
    const { liked, likes } = this.props
    const likesOtherThanYours = (likes || 0) - 1

    if (liked && likesOtherThanYours > 0) {
      return `You and ${likesOtherThanYours} others like this`
    }

    if (liked) return 'You like this'

    if (likes > 0) return `${likes} other${likes > 1 ? 's' : ''} like${likes > 1 ? '' : 's'} this`

    return null
  }

  render() {
    const { liked, onChange } = this.props

    return (
      <p className={ this.classNames() }>
        <button onClick={ onChange }>
          <img className="heart" alt="liked" src={ liked ? HeartRed : HeartGrey } />
          <span className="copy">
            <img className="heart" alt="not liked" src={ liked ? HeartRed : HeartGrey } />
          </span>
        </button>
        <span className="likes">{this.likeStatus()}</span>
      </p>
    )
  }
}

export default LikeButton
