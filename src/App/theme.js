import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
	props: {
		MuiInputLabel: {
			shrink: true,
		}
	},
  palette: {
    primary: {
			main: '#008ab7'
		},
		secondary: {
			main: '#4c2a74',
			light: '#d2cadc',
		},
		gold: {
			main: '#ffc432',
			light: '#ffe9b2'
		},
		background: {
			default: '#fff',
		},
	},
	typography: {
		fontFamily: `"Lato", "Roboto", "Helvetica", "Arial", sans-serif`,
		h4: {
			textTransform: 'uppercase',
		},
		h5: {
			fontWeight: 600,
			fontSize: '1.5rem',
			letterSpacing: '0em',
			lineHeight: 1,
		},
		h6: {
			fontWeight: 400,
			fontSize: "1.25rem",
			lineHeight: 1,
			letterSpacing: "0em",
		},
		body1Next: {
			fontWeight: 400,
			fontSize: '1rem',
			letterSpacing: '0em',
			lineHeight: 1,
		},
		body1: {
			fontWeight: 400,
			fontSize: '1rem',
			letterSpacing: '0em',
			lineHeight: 1,
		},
		useNextVariants: true,
	},
	shape: {
		borderRadius: 2,
	},
});

export default theme;