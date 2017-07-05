import React, { PureComponent } from 'react'
import { Link } from 'react-router'
import RaisedButton from 'material-ui/RaisedButton'
import Icon from 'material-ui/svg-icons/action/receipt'

class OtherVersionsButton extends PureComponent {

  render() {
    const { recipeId } = this.props.params

    return (
      <div className="OtherVersionsButton">
        <Link to={`/recepten/${recipeId}/andere-versies`}>
          <RaisedButton
            label="Klik hier om meerdere versies van dit recept te zien"
            primary={true}
            icon={<Icon />} />
        </Link>
      </div>
    )
  }
}

export default OtherVersionsButton
