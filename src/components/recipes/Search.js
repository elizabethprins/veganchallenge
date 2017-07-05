import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import TextField from 'material-ui/TextField'
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import { RadioButtonGroup, RadioButton } from 'material-ui/RadioButton'
import searchRecipes from '../../actions/recipes/fetch'
import updateQuery from '../../actions/recipes/search'

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
    const type = values
    this.props.updateQuery({ type, query })
  }

  state = {
    values: [],
  };

  render() {
    const { type } = this.props.searchQuery
    const { values } = this.state
    return (
      <div className="search">
        <div className="searchBar">
          <TextField
            type="search"
            onChange={this.textSearch}
            onKeyDown={this.textSearch}
            hintText="Zoek recepten"
            fullWidth={false} />
        </div> </div>

        // <div className="DropDowns">
        //   <SelectField multiple={true} hintText="Menugang" value={values} onChange={this.typeSearch}>
        //     <MenuItem insetChildren={true} checked={values && values.indexOf('breakfast') > -1} value={'breakfast'} primaryText={'Ontbijt'} />
        //     <MenuItem insetChildren={true} checked={values && values.indexOf('brunch') > -1} value={'brunch'} primaryText={'Brunch'} />
        //     <MenuItem insetChildren={true} checked={values && values.indexOf('lunch') > -1} value={'lunch'} primaryText={'Lunch'} />
        //     <MenuItem insetChildren={true} checked={values && values.indexOf('snacks') > -1} value={'snacks'} primaryText={'Tussendoortje'} />
        //     <MenuItem insetChildren={true} checked={values && values.indexOf('appetizer') > -1} value={'appetizer'} primaryText={'Voorgerecht'} />
        //     <MenuItem insetChildren={true} checked={values && values.indexOf('dinner') > -1} value={'dinner'} primaryText={'Hoofdgerecht'} />
        //     <MenuItem insetChildren={true} checked={values && values.indexOf('dessert') > -1} value={'dessert'} primaryText={'Nagerecht'} />
        //     <MenuItem insetChildren={true} checked={values && values.indexOf('drink') > -1} value={'drink'} primaryText={'Drankje'} />
        //   </SelectField>
        //
        //   <SelectField multiple={true} hintText="Keuken" value={values} onChange={this.typeSearch}>
        //     <MenuItem insetChildren={true} checked={values && values.indexOf('chinese') > -1} value={'chinese'} primaryText={'Chinees'} />
        //     <MenuItem insetChildren={true} checked={values && values.indexOf('french') > -1} value={'french'} primaryText={'Frans'} />
        //     <MenuItem insetChildren={true} checked={values && values.indexOf('greek') > -1} value={'greek'} primaryText={'Grieks'} />
        //     <MenuItem insetChildren={true} checked={values && values.indexOf('indian') > -1} value={'indian'} primaryText={'Indisch'} />
        //     <MenuItem insetChildren={true} checked={values && values.indexOf('indonesian') > -1} value={'indonesian'} primaryText={'Indonesisch'} />
        //     <MenuItem insetChildren={true} checked={values && values.indexOf('italian') > -1} value={'italian'} primaryText={'Italiaans'} />
        //     <MenuItem insetChildren={true} checked={values && values.indexOf('libanese') > -1} value={'libanese'} primaryText={'Libanees'} />
        //     <MenuItem insetChildren={true} checked={values && values.indexOf('maroccan') > -1} value={'maroccan'} primaryText={'Marokkaans'} />
        //     <MenuItem insetChildren={true} checked={values && values.indexOf('mexican') > -1} value={'mexican'} primaryText={'Mexicaans'} />
        //     <MenuItem insetChildren={true} checked={values && values.indexOf('spanish') > -1} value={'spanish'} primaryText={'Spaans'} />
        //     <MenuItem insetChildren={true} checked={values && values.indexOf('thai') > -1} value={'thai'} primaryText={'Thais'} />
        //     <MenuItem insetChildren={true} checked={values && values.indexOf('vietnamese') > -1} value={'vietnamese'} primaryText={'Vietnamees'} />
        //     <MenuItem insetChildren={true} checked={values && values.indexOf('westAfrican') > -1} value={'westAfrican'} primaryText={'West-Afrikaans'} />
        //   </SelectField>
        //
        //   <SelectField multiple={true} hintText="Gelegenheid" value={values} onChange={this.typeSearch}>
        //     <MenuItem insetChildren={true} checked={values && values.indexOf('birthday') > -1} value={'birthday'} primaryText={'Verjaardag'} />
        //     <MenuItem insetChildren={true} checked={values && values.indexOf('highTea') > -1} value={'highTea'} primaryText={'High Tea'} />
        //     <MenuItem insetChildren={true} checked={values && values.indexOf('bbq') > -1} value={'bbq'} primaryText={'BBQ'} />
        //     <MenuItem insetChildren={true} checked={values && values.indexOf('valentine') > -1} value={'valentine'} primaryText={'Valentijn'} />
        //     <MenuItem insetChildren={true} checked={values && values.indexOf('easter') > -1} value={'easter'} primaryText={'Pasen'} />
        //     <MenuItem insetChildren={true} checked={values && values.indexOf('halloween') > -1} value={'halloween'} primaryText={'Halloween'} />
        //     <MenuItem insetChildren={true} checked={values && values.indexOf('sinterklaas') > -1} value={'sinterklaas'} primaryText={'Sinterklaas'} />
        //     <MenuItem insetChildren={true} checked={values && values.indexOf('christmas') > -1} value={'christmas'} primaryText={'Christmas'} />
        //   </SelectField>
        //
        //   <SelectField multiple={true} hintText="Seizoen" value={values} onChange={this.typeSearch}>
        //     <MenuItem insetChildren={true} checked={values && values.indexOf('spring') > -1} value={'spring'} primaryText={'Lente'} />
        //     <MenuItem insetChildren={true} checked={values && values.indexOf('summer') > -1} value={'summer'} primaryText={'Zomer'} />
        //     <MenuItem insetChildren={true} checked={values && values.indexOf('autumn') > -1} value={'autumn'} primaryText={'Herfst'} />
        //     <MenuItem insetChildren={true} checked={values && values.indexOf('winter') > -1} value={'winter'} primaryText={'Winter'} />
        //   </SelectField>
        //
        //   <SelectField multiple={true} hintText="Allergieën" value={values} onChange={this.typeSearch}>
        //     <MenuItem insetChildren={true} checked={values && values.indexOf('nuts') > -1} value={'nuts'} primaryText={'Notenvrij'} />
        //     <MenuItem insetChildren={true} checked={values && values.indexOf('gluten') > -1} value={'gluten'} primaryText={'Glutenvrij'} />
        //     <MenuItem insetChildren={true} checked={values && values.indexOf('sugar') > -1} value={'sugar'} primaryText={'Suikervrij'} />
        //     <MenuItem insetChildren={true} checked={values && values.indexOf('soy') > -1} value={'soy'} primaryText={'Sojavrij'} />
        //     <MenuItem insetChildren={true} checked={values && values.indexOf('raw') > -1} value={'raw'} primaryText={'Raw'} />
        //   </SelectField>
        //
        //   <SelectField multiple={true} hintText="Bereidingstijd" value={values} onChange={this.typeSearch}>
        //     <MenuItem insetChildren={true} checked={values && values.indexOf('lessThanFifteen') > -1} value={'lessThanFifteen'} primaryText={'< 15 min'} />
        //     <MenuItem insetChildren={true} checked={values && values.indexOf('fifteenToThirty') > -1} value={'fifteenToThirty'} primaryText={'15-30 min'} />
        //     <MenuItem insetChildren={true} checked={values && values.indexOf('thirtyToOneHour') > -1} value={'thirtyToOneHour'} primaryText={'30-60 min'} />
        //     <MenuItem insetChildren={true} checked={values && values.indexOf('moreThanOneHour') > -1} value={'moreThanOneHour'} primaryText={'> 1 uur'} />
        //   </SelectField>
        //
        // </div>
      // </div>
    )
  }
}

const mapStateToProps = ({ searchQuery }) => ({ searchQuery })

export default connect(mapStateToProps, { searchRecipes, updateQuery })(Search)
