// src/recipes/RecipeEditor.js
import React, { PureComponent } from 'react'
import toMarkdown from 'to-markdown'
import FlatButton from 'material-ui/FlatButton'
import { connect } from 'react-redux'
import { replace } from 'react-router-redux'
import createCookbook from '../../actions/cookbooks/create'
import { showError } from '../../actions/loading'
import 'medium-editor/dist/css/medium-editor.css'
import 'medium-editor/dist/css/themes/default.css'
import './CookbookEditor.css'


class CookbookEditor extends PureComponent {
  constructor(props) {
    super()

    const { bookTitle, summary, creatorId } = props

    this.state = {
      bookTitle,
      summary,
      creatorId,
      errors: {}
    }
  }

  componentWillReceiveProps(newProps) {
    const { replace, signedIn, showError } = newProps
    if (!signedIn) {
      showError('Je moet ingelogd zijn om kookboeken toe te voegen!')
      replace('/registreren')
    }
  }

  updateBooktitle(event) {
    if (event.keyCode === 13) {
      event.preventDefault()
      this.refs.description.medium.elements[0].focus()
    }
    this.setState({
      bookTitle: this.refs.bookTitle.value
    })
  }

  updateSummary(event) {
    this.setState({
      summary: this.refs.summary.value
    })
  }

  validate(cookbook) {
    const { bookTitle, summary} = cookbook

    let errors = {}

     if (!bookTitle || bookTitle === '') errors.bookTitle = 'Je kookboek moet een titel hebben!'
     if (!summary || summary === '') errors.summary = 'Beschrijf hier het gerecht.'

    this.setState({
      errors,
    })

    return Object.keys(errors).length === 0
  }

  handleSaveCookBook = () => {
    this.saveCookbook()
  }

  saveCookbook() {
    const {
      bookTitle,
      summary,
      authorId
    } = this.state

    const cookbook = {
      bookTitle,
      summary: toMarkdown(summary|| ''),
      authorId,
    }

    if (this.validate(cookbook)) {
      this.props.createCookbook(cookbook)
    }
    this.props.handleAddCookBookClose()
  }


  render() {
    const { errors } = this.state

    return (
      <div className="editor">
        <input
          type="text"
          ref="bookTitle"
          className="bookTitle"
          placeholder="Titel"
          defaultValue={this.state.bookTitle}
          onChange={this.updateBooktitle.bind(this)}
          onKeyDown={this.updateBooktitle.bind(this)} />

        { errors.bookTitle && <p className="error">{ errors.bookTitle }</p> }

        <input
          type="text"
          ref="summary"
          className="summary"
          placeholder="Beschrijving"
          defaultValue={this.state.summary}
          onChange={this.updateSummary.bind(this)}
          onKeyDown={this.updateSummary.bind(this)} />

        { errors.summary && <p className="error">{ errors.summary }</p> }

        <div className="actions">
          <FlatButton className="primary" label="Opslaan" onTouchTap={this.handleSaveCookBook} />
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ currentUser }) => ({
  signedIn: !!currentUser && !!currentUser._id,
})
export default connect(mapStateToProps, { createCookbook, replace, showError })(CookbookEditor)
