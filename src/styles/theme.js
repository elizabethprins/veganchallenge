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
export const grey30       = '#68805D'

// Palette
export const palette = {
  primary1Color: deepgreen,
  primary2Color: mintygreen,
  primary3Color: mintygreen,
  accent1Color: freshgreen,
  textColor: black,
  alternateTextColor: white,
  canvasColor: white,
  borderColor: red,
  disabledColor: grey30
}

export default getMuiTheme({ palette })
