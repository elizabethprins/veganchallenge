// src/recipes/RecipeEditor.js
import React, { PureComponent } from 'react'
import Editor from 'react-medium-editor'
import toMarkdown from 'to-markdown'
import { connect } from 'react-redux'
import { replace } from 'react-router-redux'
import createRecipe from '../../actions/recipes/create'
import { showError } from '../../actions/loading'
import 'medium-editor/dist/css/medium-editor.css'
import 'medium-editor/dist/css/themes/default.css'
import './RecipeEditor.css'

const TYPES = [
  'breakfast',
  'brunch',
  'lunch',
  'snacks',
  'appetizer',
  'dinner',
  'dessert',
  'drink',
  'chinese',
  'indian',
  'mexican',
  'thai',
  'vietnamese',
  'indonesian',
  'greek',
  'italian',
  'spanish',
  'libanese',
  'maroccan',
  'westAfrican',
  'french',
  'bbq',
  'valentine',
  'birthday',
  'highTea',
  'easter',
  'halloween',
  'sinterklaas',
  'christmas',
  'spring',
  'summer',
  'autumn',
  'winter',
  'nuts',
  'gluten',
  'sugar',
  'soy',
  'raw',
  'lessThanFifteen',
  'fifteenToThirty',
  'thirtyToOneHour',
  'moreThanOneHour'
]

class RecipeEditor extends PureComponent {
  constructor(props) {
    super()

    const { title, picture, persons, breakfast, brunch, lunch, snacks,
    appetizer, dinner, dessert, drink, chinese, indian, mexican, thai, vietnamese,
    indonesian, greek, italian, spanish, libanese, maroccan, westAfrican, french,
    bbq, valentine, birthday, highTea, easter, halloween, sinterklaas, christmas,
    spring, summer, autumn, winter, nuts, gluten, sugar, soy, raw, lessThanFifteen,
    fifteenToThirty, thirtyToOneHour, moreThanOneHour,description, cookingSteps,
    tip, authorId } = props

    this.state = {
      title,
      picture,
      persons,
      breakfast,
      brunch,
      lunch,
      snacks,
      appetizer,
      dinner,
      dessert,
      drink,
      chinese,
      indian,
      mexican,
      thai,
      vietnamese,
      indonesian,
      greek,
      italian,
      spanish,
      libanese,
      maroccan,
      westAfrican,
      french,
      bbq,
      valentine,
      birthday,
      highTea,
      easter,
      halloween,
      sinterklaas,
      christmas,
      spring,
      summer,
      autumn,
      winter,
      nuts,
      gluten,
      sugar,
      soy,
      raw,
      lessThanFifteen,
      fifteenToThirty,
      thirtyToOneHour,
      moreThanOneHour,
      description,
      cookingSteps,
      tip,
      authorId,
      errors: {}
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
      this.refs.description.medium.elements[0].focus()
    }
    this.setState({
      title: this.refs.title.value
    })
  }

  updatePicture(event) {
    this.setState({
      picture: this.refs.picture.value
    })
  }

  updateDescription(text, medium) {
    this.setState({
      description: this.refs.description.value
    })
  }

  updatecookingSteps(text, medium) {
    this.setState({
      cookingSteps: this.refs.cookingSteps.value
    })
  }

  updatepersons(number) {
    this.setState({
      persons: this.refs.persons.value
    })
  }

  setType(event) {
    this.setState({
      breakfast: event.target.value === 'breakfast',
      brunch: event.target.value === 'brunch',
      lunch: event.target.value === 'lunch',
      snacks: event.target.value ==='snacks',
      appetizer: event.target.value ==='appetizer',
      dinner: event.target.value ==='dinner',
      dessert: event.target.value ==='dessert',
      drink: event.target.value ==='drink',
      chinese: event.target.value ==='chinese',
      indian: event.target.value ==='indian',
      mexican: event.target.value ==='mexican',
      thai: event.target.value ==='thai',
      vietnamese: event.target.value ==='vietnamese',
      indonesian: event.target.value ==='indonesian',
      greek: event.target.value ==='greek',
      italian: event.target.value ==='italian',
      spanish: event.target.value ==='spanish',
      libanese: event.target.value ==='libanese',
      maroccan: event.target.value ==='maroccan',
      westAfrican: event.target.value ==='westAfrican',
      french: event.target.value ==='french',
      bbq: event.target.value ==='bbq',
      valentine: event.target.value ==='valentine',
      birthday: event.target.value ==='birthday',
      highTea: event.target.value ==='highTea',
      easter: event.target.value ==='easter',
      halloween: event.target.value ==='halloween',
      sinterklaas: event.target.value ==='sinterklaas',
      christmas: event.target.value ==='christmas',
      spring: event.target.value ==='spring',
      summer: event.target.value ==='summer',
      autumn: event.target.value ==='autumn',
      winter: event.target.value ==='winter',
      nuts: event.target.value ==='nuts',
      gluten: event.target.value ==='gluten',
      sugar: event.target.value ==='sugar',
      soy: event.target.value ==='soy',
      raw: event.target.value ==='raw',
      lessThanFifteen: event.target.value ==='lessThanFifteen',
      fifteenToThirty: event.target.value ==='fifteenToThirty',
      thirtyToOneHour: event.target.value ==='thirtyToOneHour',
      moreThanOneHour: event.target.value ==='moreThanOneHour',
    })
  }

  validate(recipe) {
    const { title } = recipe

    let errors = {}

     if (!title || title === '') errors.title = 'A title is essential!'
    //  if (!picture || picture === '') errors.picture = 'Picture is needed!'
    //  if (!tip || tip === '') errors.tip = "Please leave a tip(max 20%, please)"

    this.setState({
      errors,
    })

    return Object.keys(errors).length === 0
  }

  saveRecipe() {
    const {
      title,
      picture,
      persons,
      breakfast,
      brunch,
      lunch,
      snacks,
      appetizer,
      dinner,
      dessert,
      drink,
      chinese,
      indian,
      mexican,
      thai,
      vietnamese,
      indonesian,
      greek,
      italian,
      spanish,
      libanese,
      maroccan,
      westAfrican,
      french,
      bbq,
      valentine,
      birthday,
      highTea,
      easter,
      halloween,
      sinterklaas,
      christmas,
      spring,
      summer,
      autumn,
      winter,
      nuts,
      gluten,
      sugar,
      soy,
      raw,
      lessThanFifteen,
      fifteenToThirty,
      thirtyToOneHour,
      moreThanOneHour,
      description,
      cookingSteps,
      tip,
      authorId
    } = this.state

    const recipe = {
      title,
      picture,
      persons,
      breakfast,
      brunch,
      lunch,
      snacks,
      appetizer,
      dinner,
      dessert,
      drink,
      chinese,
      indian,
      mexican,
      thai,
      vietnamese,
      indonesian,
      greek,
      italian,
      spanish,
      libanese,
      maroccan,
      westAfrican,
      french,
      bbq,
      valentine,
      birthday,
      highTea,
      easter,
      halloween,
      sinterklaas,
      christmas,
      spring,
      summer,
      autumn,
      winter,
      nuts,
      gluten,
      sugar,
      soy,
      raw,
      lessThanFifteen,
      fifteenToThirty,
      thirtyToOneHour,
      moreThanOneHour,
      description,
      cookingSteps,
      tip,
      authorId,
      liked: false,
    }

    if (this.validate(recipe)) {
      this.props.createRecipe(recipe)
        this.props.router.push('/')
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

        <input
          type="text"
          ref="description"
          placeholder='Write a description...'
          onChange={this.updateDescription.bind(this)}
          text={this.state.description} />

        <input
          type="text"
          ref="picture"
          className="picture"
          placeholder="Photo URL"
          defaultValue={this.state.picture}
          onChange={this.updatePicture.bind(this)}
          onKeyDown={this.updatePicture.bind(this)} />

          { errors.picture && <p className="error">{ errors.picture }</p> }

          <input
          type="text"
          ref="cookingSteps"
          placeholder='Some Steps to be followes'
          defaultValue={this.state.cookingSteps}
          onChange={this.updatecookingSteps.bind(this)}
          text={this.state.cookingSteps} />

          <input
          type="number"
          ref="persons"
          className="persons"
          placeholder="Number of persons"
          defaultValue={this.state.persons}
          onChange={this.updatepersons.bind(this)}
          text={this.state.persons} />


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
