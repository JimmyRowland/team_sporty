import { createMuiTheme } from "@material-ui/core/styles";
import { colors } from "@material-ui/core";
import { grey } from "@material-ui/core/colors";

const white = "#FFFFFF";
const black = "#000000";
// Create a theme instance.
const theme = createMuiTheme({
    palette: {
        type: "dark",
        primary: {
            contrastText: white,
            dark: colors.indigo[900],
            main: colors.indigo[500],
            light: colors.indigo[100],
        },
        secondary: {
            contrastText: white,
            dark: colors.blue[900],
            main: colors.blue["A400"],
            light: colors.blue["A400"],
        },
        success: {
            contrastText: white,
            dark: colors.green[900],
            main: colors.green[600],
            light: colors.green[400],
        },
        info: {
            contrastText: white,
            dark: colors.blue[900],
            main: colors.blue[600],
            light: colors.blue[400],
        },
        warning: {
            contrastText: white,
            dark: colors.orange[900],
            main: colors.orange[600],
            light: colors.orange[400],
        },
        error: {
            contrastText: white,
            dark: colors.red[900],
            main: colors.red[600],
            light: colors.red[400],
        },
        // background: {
        //     default: "#000",
        //     paper: grey["900"],
        // },
    },
});

export default theme;
