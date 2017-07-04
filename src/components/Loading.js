import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import LinearProgress from 'material-ui/LinearProgress'

class Loading extends PureComponent {
  static propTypes = {
    ready: PropTypes.bool,
  }

  render() {
    if (this.props.ready) return null

    return (
      <LinearProgress mode="indeterminate" />
    )
  }
}

const mapStateToProps = ({ loading }) => ({ ready: !loading })

export default connect(mapStateToProps)(Loading)
