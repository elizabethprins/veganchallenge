import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import TextField from 'material-ui/TextField'
import { RadioButtonGroup, RadioButton } from 'material-ui/RadioButton'
import searchRecipes from '../../actions/recipes/fetch'
import updateQuery from '../../actions/recipes/search'
import './Search.css'
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

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

  typeSearch = (event, what) => {
    const { query } = this.props.searchQuery
    const type = event.target.value
    this.props.updateQuery({ type, query })
  }

  render() {
    const { type } = this.props.searchQuery

    return (
      <div className="Search">
        <TextField
          type="search"
          onChange={this.textSearch}
          onKeyUp={this.textSearch}
          hintText="Search recipes..."
          fullWidth={true} />

        <div className="booleans">

        </div>

      </div>
    )
  }
}

const mapStateToProps = ({ searchQuery }) => ({ searchQuery })

export default connect(mapStateToProps, { searchRecipes, updateQuery })(Search)
