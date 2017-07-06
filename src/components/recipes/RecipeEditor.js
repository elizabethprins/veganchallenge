// src/recipes/RecipeEditor.js
import React, { PureComponent } from 'react'
import Editor from 'react-medium-editor'
import toMarkdown from 'to-markdown'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import { connect } from 'react-redux'
import { replace } from 'react-router-redux'
import createRecipe from '../../actions/recipes/create'
import { showError } from '../../actions/loading'
import 'medium-editor/dist/css/medium-editor.css'
import 'medium-editor/dist/css/themes/default.css'
import './RecipeEditor.css'


class RecipeEditor extends PureComponent {
  constructor(props) {
    super()

    const { title, picture, persons, description, cookingSteps,
    tip, authorId } = props

    this.state = {
      title,
      picture,
      persons,
      description,
      cookingSteps,
      tip,
      authorId,
      values: [],
      errors: {}
    }
  }

  componentWillReceiveProps(newProps) {
    const { replace, signedIn, showError } = newProps
    if (!signedIn) {
      showError('Je moet ingelogd zijn om recepten toe te voegen!')
      replace('/registreren')
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
      description: text
    })
  }

  updateCookingSteps(text, medium) {
    this.setState({
      cookingSteps: text
    })
  }

  updatePersons(number) {
    this.setState({
      persons: this.refs.persons.value
    })
  }

  setType(event, index, values) {
    this.setState({ values })
    const newValues = values.map((value) => (`${value}: true`))
    console.log(newValues)
  }

  validate(recipe) {
    const { title, picture, description, cookingSteps } = recipe

    let errors = {}

     if (!title || title === '') errors.title = 'Je recept moet een titel hebben!'
     if (!picture || picture === '') errors.picture = 'Voeg een leuke foto toe.'
     if (!description || description === '') errors.title = 'Beschrijf hier het gerecht.'
     if (!cookingSteps || cookingSteps === '') errors.title = 'Geef hier de bereidingswijze op.'


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
      description,
      values,
      cookingSteps,
      tip,
      authorId
    } = this.state

    const recipe = {
      title,
      picture,
      persons,
      description: toMarkdown(description || ''),
      cookingSteps: toMarkdown(cookingSteps || ''),
      tip,
      authorId,
      liked: false,
    }

    values.map((i) => {
      recipe[i] = true
    })

    if (this.validate(recipe)) {
      this.props.createRecipe(recipe)
        this.props.router.push('/')
    }
  }


  render() {
    const { errors, values } = this.state

    return (
      <div className="editor">
        <input
          type="text"
          ref="title"
          className="title"
          placeholder="Titel"
          defaultValue={this.state.title}
          onChange={this.updateTitle.bind(this)}
          onKeyDown={this.updateTitle.bind(this)} />

        { errors.title && <p className="error">{ errors.title }</p> }

        <Editor
          ref="description"
          options={{
            placeholder: {text: 'Beschrijf het gerecht...'}
          }}
          onChange={this.updateDescription.bind(this)}
          text={this.state.description} />

        { errors.description && <p className="error">{ errors.description }</p> }

        <Editor
          ref="cookingSteps"
          options={{
            placeholder: {text: 'Beschrijf de bereidingswijze...'}
          }}
          onChange={this.updateCookingSteps.bind(this)}
          text={this.state.cookingSteps} />

        { errors.cookingSteps && <p className="error">{ errors.cookingSteps }</p> }

        <input
          type="text"
          ref="picture"
          className="picture"
          placeholder="Post hier een leuke foto van het gerecht!"
          defaultValue={this.state.picture}
          onChange={this.updatePicture.bind(this)}
          onKeyDown={this.updatePicture.bind(this)} />

          { errors.picture && <p className="error">{ errors.picture }</p> }


          <input
          type="number"
          ref="persons"
          className="persons"
          placeholder="Voor hoeveel personen:"
          defaultValue={this.state.persons}
          onChange={this.updatePersons.bind(this)}
          text={this.state.persons} />



        <div className="DropDowns">
          <SelectField multiple={true} floatingLabelText="Menugang" value={values} onChange={this.setType.bind(this)}>
            <MenuItem insetChildren={true} checked={values && values.indexOf('breakfast') > -1} value={'breakfast'} primaryText={'Ontbijt'} />
            <MenuItem insetChildren={true} checked={values && values.indexOf('brunch') > -1} value={'brunch'} primaryText={'Brunch'} />
            <MenuItem insetChildren={true} checked={values && values.indexOf('lunch') > -1} value={'lunch'} primaryText={'Lunch'} />
            <MenuItem insetChildren={true} checked={values && values.indexOf('snacks') > -1} value={'snacks'} primaryText={'Tussendoortje'} />
            <MenuItem insetChildren={true} checked={values && values.indexOf('appetizer') > -1} value={'appetizer'} primaryText={'Voorgerecht'} />
            <MenuItem insetChildren={true} checked={values && values.indexOf('dinner') > -1} value={'dinner'} primaryText={'Hoofdgerecht'} />
            <MenuItem insetChildren={true} checked={values && values.indexOf('dessert') > -1} value={'dessert'} primaryText={'Nagerecht'} />
            <MenuItem insetChildren={true} checked={values && values.indexOf('drink') > -1} value={'drink'} primaryText={'Drankje'} />
          </SelectField>

          <SelectField multiple={true} floatingLabelText="Keuken" value={values} onChange={this.setType.bind(this)}>
            <MenuItem insetChildren={true} checked={values && values.indexOf('chinese') > -1} value={'chinese'} primaryText={'Chinees'} />
            <MenuItem insetChildren={true} checked={values && values.indexOf('french') > -1} value={'french'} primaryText={'Frans'} />
            <MenuItem insetChildren={true} checked={values && values.indexOf('greek') > -1} value={'greek'} primaryText={'Grieks'} />
            <MenuItem insetChildren={true} checked={values && values.indexOf('indian') > -1} value={'indian'} primaryText={'Indisch'} />
            <MenuItem insetChildren={true} checked={values && values.indexOf('indonesian') > -1} value={'indonesian'} primaryText={'Indonesisch'} />
            <MenuItem insetChildren={true} checked={values && values.indexOf('italian') > -1} value={'italian'} primaryText={'Italiaans'} />
            <MenuItem insetChildren={true} checked={values && values.indexOf('libanese') > -1} value={'libanese'} primaryText={'Libanees'} />
            <MenuItem insetChildren={true} checked={values && values.indexOf('maroccan') > -1} value={'maroccan'} primaryText={'Marokkaans'} />
            <MenuItem insetChildren={true} checked={values && values.indexOf('mexican') > -1} value={'mexican'} primaryText={'Mexicaans'} />
            <MenuItem insetChildren={true} checked={values && values.indexOf('spanish') > -1} value={'spanish'} primaryText={'Spaans'} />
            <MenuItem insetChildren={true} checked={values && values.indexOf('thai') > -1} value={'thai'} primaryText={'Thais'} />
            <MenuItem insetChildren={true} checked={values && values.indexOf('vietnamese') > -1} value={'vietnamese'} primaryText={'Vietnamees'} />
            <MenuItem insetChildren={true} checked={values && values.indexOf('westAfrican') > -1} value={'westAfrican'} primaryText={'West-Afrikaans'} />
          </SelectField>

          <SelectField multiple={true} floatingLabelText="Gelegenheid" value={values} onChange={this.setType.bind(this)}>
            <MenuItem insetChildren={true} checked={values && values.indexOf('birthday') > -1} value={'birthday'} primaryText={'Verjaardag'} />
            <MenuItem insetChildren={true} checked={values && values.indexOf('highTea') > -1} value={'highTea'} primaryText={'High Tea'} />
            <MenuItem insetChildren={true} checked={values && values.indexOf('bbq') > -1} value={'bbq'} primaryText={'BBQ'} />
            <MenuItem insetChildren={true} checked={values && values.indexOf('valentine') > -1} value={'valentine'} primaryText={'Valentijn'} />
            <MenuItem insetChildren={true} checked={values && values.indexOf('easter') > -1} value={'easter'} primaryText={'Pasen'} />
            <MenuItem insetChildren={true} checked={values && values.indexOf('halloween') > -1} value={'halloween'} primaryText={'Halloween'} />
            <MenuItem insetChildren={true} checked={values && values.indexOf('sinterklaas') > -1} value={'sinterklaas'} primaryText={'Sinterklaas'} />
            <MenuItem insetChildren={true} checked={values && values.indexOf('christmas') > -1} value={'christmas'} primaryText={'Christmas'} />
          </SelectField>

          <SelectField multiple={true} floatingLabelText="Seizoen" value={values} onChange={this.setType.bind(this)}>
            <MenuItem insetChildren={true} checked={values && values.indexOf('spring') > -1} value={'spring'} primaryText={'Lente'} />
            <MenuItem insetChildren={true} checked={values && values.indexOf('summer') > -1} value={'summer'} primaryText={'Zomer'} />
            <MenuItem insetChildren={true} checked={values && values.indexOf('autumn') > -1} value={'autumn'} primaryText={'Herfst'} />
            <MenuItem insetChildren={true} checked={values && values.indexOf('winter') > -1} value={'winter'} primaryText={'Winter'} />
          </SelectField>

          <SelectField multiple={true} floatingLabelText="Allergieën" value={values} onChange={this.setType.bind(this)}>
            <MenuItem insetChildren={true} checked={values && values.indexOf('nuts') > -1} value={'nuts'} primaryText={'Notenvrij'} />
            <MenuItem insetChildren={true} checked={values && values.indexOf('gluten') > -1} value={'gluten'} primaryText={'Glutenvrij'} />
            <MenuItem insetChildren={true} checked={values && values.indexOf('sugar') > -1} value={'sugar'} primaryText={'Suikervrij'} />
            <MenuItem insetChildren={true} checked={values && values.indexOf('soy') > -1} value={'soy'} primaryText={'Sojavrij'} />
            <MenuItem insetChildren={true} checked={values && values.indexOf('raw') > -1} value={'raw'} primaryText={'Raw'} />
          </SelectField>

          <SelectField multiple={true} floatingLabelText="Bereidingstijd" value={values} onChange={this.setType.bind(this)}>
            <MenuItem insetChildren={true} checked={values && values.indexOf('lessThanFifteen') > -1} value={'lessThanFifteen'} primaryText={'< 15 min'} />
            <MenuItem insetChildren={true} checked={values && values.indexOf('fifteenToThirty') > -1} value={'fifteenToThirty'} primaryText={'15-30 min'} />
            <MenuItem insetChildren={true} checked={values && values.indexOf('thirtyToOneHour') > -1} value={'thirtyToOneHour'} primaryText={'30-60 min'} />
            <MenuItem insetChildren={true} checked={values && values.indexOf('moreThanOneHour') > -1} value={'moreThanOneHour'} primaryText={'> 1 uur'} />
          </SelectField>

        </div>

        <div className="actions">
          <button className="primary" onClick={this.saveRecipe.bind(this)}>Opslaan</button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ currentUser }) => ({
  signedIn: !!currentUser && !!currentUser._id,
})
export default connect(mapStateToProps, { createRecipe, replace, showError })(RecipeEditor)
