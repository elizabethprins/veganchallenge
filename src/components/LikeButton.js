// src/components/LikeButton.js
import React, { PureComponent } from 'react'
import PaprikaEmpty from '../images/paprika.svg'
import PaprikaFull from '../images/paprika_full.svg'
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
      return `Jij en ${likesOtherThanYours} ander${likes > 2 ? 'en' : ' persoon'} vinden dit lekker`
    }

    if (liked) return 'Dit vind je lekker'

    if (likes > 0) return `${likes} ander${likes > 1 ? 'en' : ' persoon'} vind${likes > 1 ? 'en' : 't'} dit lekker`

    return null
  }

  render() {
    const { liked, onChange } = this.props

    return (
      <p className={ this.classNames() }>
        <button onClick={ onChange }>
          <img className="paprika" alt="liked" src={ liked ? PaprikaFull : PaprikaEmpty } />
          <span className="copy">
            <img className="paprika" alt="not liked" src={ liked ? PaprikaFull : PaprikaEmpty } />
          </span>
        </button>
        <span className="likes">{this.likeStatus()}</span>
      </p>
    )
  }
}

export default LikeButton
