// src/recipes/RecipeEditor.js
import React, { PureComponent } from 'react'
import Editor from 'react-medium-editor'
import toMarkdown from 'to-markdown'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import FlatButton from 'material-ui/FlatButton'
import Plus from 'material-ui/svg-icons/content/add'
import { connect } from 'react-redux'
import { replace } from 'react-router-redux'
import createRecipe from '../../actions/recipes/create'
import { showError } from '../../actions/loading'
import 'medium-editor/dist/css/medium-editor.css'
import 'medium-editor/dist/css/themes/default.css'
import './RecipeEditor.css'


class IngredientEditor extends PureComponent {
  constructor(props) {
    super()

    const { amount, measure, ingredient } = props
    console.log("ingredetor props", props)
    this.state = {
      amount: "",
      measure: "",
      ingredient: ""
    }
  }

  updateAmount(event) {
    event.preventDefault()
    this.setState({ amount: event.target.value})
  }

  updateMeasure(event) {
    event.preventDefault()
    this.setState({ measure: event.target.value})
  }

  updateIngredient(event) {
    event.preventDefault()
    this.setState({ ingredient: event.target.value})
  }

  render() {
    const { input } = this.state
    console.log("editorstate",this.state)
    return (
      <div>
        <input
          type="number"
          ref="amount"
          className="amount"
          placeholder="Hoeveelheid"
          value={this.state.amount}
          onChange={this.updateAmount.bind(this)} />
        <input
          type="text"
          ref="measure"
          className="measure"
          placeholder="Eenheid (bijv. tl, ml, bosje etc.)"
          onChange={this.updateMeasure.bind(this)}
          value={this.state.measure} />
        <input
          type="text"
          ref="ingredient"
          className="ingredient"
          placeholder="Ingredient"
          onChange={this.updateIngredient.bind(this)}
          value={this.state.ingredient} />
      </div>
    )
  }
}

const mapStateToProps = ({ currentUser }) => ({
  signedIn: !!currentUser && !!currentUser._id,
})
export default connect(mapStateToProps, { createRecipe, replace, showError })(IngredientEditor)
