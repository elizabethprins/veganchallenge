import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import TextField from 'material-ui/TextField'
import searchRecipes from '../../actions/recipes/fetch'
import updateQuery from '../../actions/recipes/search'
import SearchIcon from 'material-ui/svg-icons/action/search'

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

  render() {
    return (
      <div className="searchBar">
        <TextField
          type="search"
          onChange={this.textSearch}
          onKeyDown={this.textSearch}
          fullWidth={false}
          hintText={< SearchIcon />}
          />
      </div>
    )
  }
}

const mapStateToProps = ({ searchQuery }) => ({ searchQuery })

export default connect(mapStateToProps, { searchRecipes, updateQuery })(Search)
