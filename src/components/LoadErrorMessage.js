import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Snackbar from 'material-ui/Snackbar'
import clearError from '../actions/loading'
import './LoadErrorMessage.css'

class LoadErrorMessage extends Component {
  static propTypes = {
    error: PropTypes.bool,
    message: PropTypes.string.isRequired,
  }

  state = { open: false }

  handleRequestClose = () => {
    this.setState({
      open: false,
    })
    this.props.clearError()
  }

  componentWillMount() {
    if (this.props.error) {
      this.setState({ open: true })
    }
  }

  componentWillReceiveProps(nextProps) {
    const { error } = nextProps

    this.setState({
      open: error,
    })
  }

  render() {
    const { error, message } = this.props
    const { open } = this.state

    if (!error) return null

    return (
      <Snackbar
        open={open}
        message={message}
        autoHideDuration={4000}
        action="OK"
        onRequestClose={this.handleRequestClose} />
    )
  }
}

const mapStateToProps = ({ loadError }) => ({
  error: !!loadError,
  message: loadError || '',
})

export default connect(mapStateToProps, { clearError })(LoadErrorMessage)
