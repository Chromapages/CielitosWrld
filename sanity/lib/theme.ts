import {buildLegacyTheme} from 'sanity'

// Brand colors from Cielitos Wrld website
const colors = {
  // Primary brand color (Orange)
  orange: {
    50: '#fef6f0',
    100: '#fdeadd',
    200: '#fad1bb',
    300: '#f5b08e',
    400: '#ed855f',
    500: '#e6653a',
    600: '#d74d21',
    700: '#b33a16',
    800: '#96320f',
    900: '#822c01', // Primary brand
  },
  // Sage (secondary)
  sage: {
    50: '#f8f9f6',
    100: '#f0f2ea',
    200: '#dde2d1',
    300: '#c4ccb0',
    400: '#a6b088',
    500: '#8b9669',
    600: '#6f7d50',
    700: '#5a6441',
    800: '#484f37',
    900: '#33361c',
  },
  // Moss (dark backgrounds)
  moss: {
    50: '#f7f8f6',
    100: '#eef0ec',
    200: '#dae0d5',
    300: '#bdc8b5',
    400: '#9aab8f',
    500: '#7c9070',
    600: '#647558',
    700: '#515e47',
    800: '#424c3b',
    900: '#2c3325',
  },
  // Mud (text)
  mud: {
    50: '#f9f6f4',
    100: '#f2ebe6',
    200: '#e3d3c9',
    300: '#d0b5a4',
    400: '#b8927b',
    500: '#a47458',
    600: '#925e41',
    700: '#794d36',
    800: '#5d3c2a',
    900: '#371d13',
  },
}

export const cielitosTheme = buildLegacyTheme({
  /* Base theme colors */
  '--black': colors.mud[900],
  '--white': '#fff',

  '--gray': colors.sage[400],
  '--gray-base': colors.sage[400],

  '--component-bg': colors.sage[50],
  '--component-text-color': colors.mud[900],

  /* Brand colors */
  '--brand-primary': colors.orange[900],

  /* Default button */
  '--default-button-color': colors.mud[700],
  '--default-button-primary-color': colors.orange[900],
  '--default-button-success-color': colors.sage[600],
  '--default-button-warning-color': colors.orange[600],
  '--default-button-danger-color': '#e03131',

  /* State colors */
  '--state-info-color': colors.sage[600],
  '--state-success-color': colors.sage[700],
  '--state-warning-color': colors.orange[600],
  '--state-danger-color': '#e03131',

  /* Navbar */
  '--main-navigation-color': colors.moss[900],
  '--main-navigation-color--inverted': '#fff',

  /* Focus */
  '--focus-color': colors.orange[900],

  /* Typography */
  '--font-family-sans-serif': "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  '--font-family-monospace': "'Fira Code', 'Courier New', monospace",

  /* Shadows - Material Design elevation */
  '--shadow-outline': `0 0 0 3px ${colors.orange[200]}`,
  '--shadow-elevation-low': '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
  '--shadow-elevation-medium': '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
  '--shadow-elevation-high': '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)',

  /* Borders */
  '--border-color': colors.sage[200],
  '--border-color-focus': colors.orange[900],

  /* Buttons & Inputs */
  '--input-bg': '#fff',
  '--input-fg': colors.mud[900],
  '--input-border-color': colors.sage[300],
  '--input-border-color-focus': colors.orange[900],

  /* Cards */
  '--card-bg-color': '#fff',
  '--card-border-color': colors.sage[200],
  '--card-shadow-outline-color': colors.orange[100],

  /* Code */
  '--code-bg-color': colors.sage[100],
  '--code-fg-color': colors.mud[800],

  /* Selected */
  '--selected-bg-color': colors.orange[50],
  '--selected-fg-color': colors.orange[900],

  /* Link colors */
  '--link-fg-color': colors.orange[900],
})

export default cielitosTheme
