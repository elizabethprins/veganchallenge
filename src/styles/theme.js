// src/assets/styles/theme.js
import getMuiTheme from 'material-ui/styles/getMuiTheme'

// Colors
export const deepgreen    = '#68805D'
export const mintygreen   = '#A1C5A1'
export const orange       = '#DE742A'
export const freshgreen   = '#D2E76F'
export const red          = '#B30000'
export const yellow       = '#FFDB4D'
export const sand         = '#D5C48E'
export const white        = '#ffffff'
export const black        = '#343434'
export const darkGrey     = '#757575'
export const grey         = '#F8F9FB'
export const grey50       = 'rgba(222, 222, 222, 0.5)'
export const grey30      = 'rgba(222, 222, 222, 0.3)'
export const grey70      = 'rgba(222, 222, 222, 0.7)'

// Palette
export const palette = {
  primary1Color: white,
  primary2Color: grey,
  primary3Color: darkGrey,
  accent1Color: grey70,
  textColor: black,
  alternateTextColor: black,
  canvasColor: white,
  borderColor: black,
  disabledColor: black
}

export default getMuiTheme({ palette })
