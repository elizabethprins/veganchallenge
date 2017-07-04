import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import TextField from 'material-ui/TextField'
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import { RadioButtonGroup, RadioButton } from 'material-ui/RadioButton'
import searchRecipes from '../actions/recipes/fetch'
import updateQuery from '../actions/recipes/search'

const names = [
  'soy',
  'french',
  'summer',
  'dessert',
  'westAfrican'
];

class Search extends PureComponent {
  static propTypes = {
    updateQuery: PropTypes.func.isRequired,
    searchRecipes: PropTypes.func.isRequired,
  }

  componentWillUpdate(nextProps) {
    const { query, type } = nextProps.searchQuery
    const oldQuery = this.props.query
    const oldType = this.props.type

    if (type !== oldType || query !== oldQuery) {
      this.props.searchRecipes({ query, type })
    }
  }

  textSearch = (event) => {
    const { type } = this.props.searchQuery
    const query = event.target.value
    if (query.length > 0 && query.length < 3) return
    this.props.updateQuery({ query, type })
  }

  typeSearch = (event, index, values) => {
    this.setState({values})
    const { query } = this.props.searchQuery
    console.log(this.props.searchQuery)
    const type = values
    console.log(type)
    this.props.updateQuery({ type, query })
  }

  state = {
    values: [],
  };

  menuItems(values) {
    return names.map((name) => (
      <MenuItem
        key={name}
        insetChildren={true}
        checked={values && values.indexOf(name) > -1}
        value={name}
        primaryText={name}
      />
    ));
  }

  render() {
    const { type } = this.props.searchQuery
    const { values } = this.state
    return (
      <div className="Search">
        <TextField
          type="search"
          onChange={this.textSearch}
          onKeyUp={this.textSearch}
          hintText="Search recipes..."
          fullWidth={true} />

        <div className="booleans">
        <SelectField
          multiple={true}
          hintText="Select a name"
          value={values}
          onChange={this.typeSearch}
        >
          {this.menuItems(values)}
        </SelectField>

        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ searchQuery }) => ({ searchQuery })

export default connect(mapStateToProps, { searchRecipes, updateQuery })(Search)
