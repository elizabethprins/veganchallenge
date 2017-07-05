// src/recipes/RecipeEditor.js
import React, { PureComponent } from 'react'
import Editor from 'react-medium-editor'
import toMarkdown from 'to-markdown'
import { connect } from 'react-redux'
import { replace } from 'react-router-redux'
import createRecipe from '../actions/recipes/create'
import { showError } from '../actions/loading'
import 'medium-editor/dist/css/medium-editor.css'
import 'medium-editor/dist/css/themes/default.css'
import './RecipeEditor.css'

const TYPES = [
  'vegan',
  'vegetarian',
  'pescatarian'
]

class RecipeEditor extends PureComponent {
  constructor(props) {
    super()

    const { title, summary, vegan, vegetarian, pescatarian, photo } = props

    this.state = {
      title,
      summary,
      vegan,
      vegetarian,
      pescatarian,
      photo,
      errors: {},
    }
  }

  componentWillReceiveProps(newProps) {
    const { replace, signedIn, showError } = newProps
    if (!signedIn) {
      showError('You need to be signed up to create recipes!')
      replace('/sign-up')
    }
  }

  updateTitle(event) {
    if (event.keyCode === 13) {
      event.preventDefault()
      this.refs.summary.medium.elements[0].focus()
    }
    this.setState({
      title: this.refs.title.value
    })
  }

  updatePhoto(event) {
    this.setState({
      photo: this.refs.photo.value
    })
  }

  updateIntro(text, medium) {
    this.setState({
      summary: text
    })
  }


  setType(event) {
    this.setState({
      vegan: event.target.value === 'vegan',
      vegetarian: event.target.value === 'vegetarian',
      pescatarian: event.target.value === 'pescatarian'
    })
  }

  validate(recipe) {
    const { title, photo } = recipe

    let errors = {}

    if (!title || title === '') errors.title = 'We need a title..!'
    if (!photo || photo === '') errors.photo = 'We need a photo, cmon!'

    this.setState({
      errors,
    })

    return Object.keys(errors).length === 0
  }

  saveRecipe() {
    const {
      title,
      summary,
      vegetarian,
      vegan,
      pescatarian,
      photo,
    } = this.state

    const recipe = {
      title,
      summary: toMarkdown(summary || ''),
      vegetarian,
      vegan,
      pescatarian,
      liked: false,
      photo,
    }

    if (this.validate(recipe)) {
      this.props.createRecipe(recipe)
    }
  }

  render() {
    const { errors } = this.state

    return (
      <div className="editor">
        <input
          type="text"
          ref="title"
          className="title"
          placeholder="Title"
          defaultValue={this.state.title}
          onChange={this.updateTitle.bind(this)}
          onKeyDown={this.updateTitle.bind(this)} />

        { errors.title && <p className="error">{ errors.title }</p> }

        <Editor
          ref="summary"
          options={{
            placeholder: {text: 'Write an Introduction...'}
          }}
          onChange={this.updateIntro.bind(this)}
          text={this.state.summary} />

        <input
          type="text"
          ref="photo"
          className="photo"
          placeholder="Photo URL"
          defaultValue={this.state.photo}
          onChange={this.updatePhoto.bind(this)}
          onKeyDown={this.updatePhoto.bind(this)} />

        { errors.photo && <p className="error">{ errors.photo }</p> }

        {TYPES.map((type) => {
          return <label key={type} htmlFor={type}>
            <input id={type} type="radio" name="type" value={type} onChange={this.setType.bind(this)} />
            {type}
          </label>
        })}

        <div className="actions">
          <button className="primary" onClick={this.saveRecipe.bind(this)}>Save</button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ currentUser }) => ({
  signedIn: !!currentUser && !!currentUser._id,
})
export default connect(mapStateToProps, { createRecipe, replace, showError })(RecipeEditor)
