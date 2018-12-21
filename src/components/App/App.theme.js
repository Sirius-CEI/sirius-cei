import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    teal: {
			main: '#008ab7'
		},
		purple: {
			main: '#4c2a74',
			light: '#D2CADC',
		},
		gold: {
			main: '#ffc432'
		}
	},
	typography: {
		useNextVariants: true,
	},
});

export default theme;