import { createMuiTheme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#436EE5',
      main: '#0639BF',
      dark: '#031E65',
      contrastText: '#FFF'
    },
    secondary: {
      main: '#67A361',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#fff',
    },
  },
  typography: {
    fontFamily: [
      '"Inter"',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  }
});

theme.typography.button = {
  ...theme.typography.button,
  fontFamily: [
    '"Roboto"',
    '"Inter"',
    'Arial',
    'sans-serif'
  ].join(','),
  fontSize: 14,
  fontWeight: 500
}

export default theme;