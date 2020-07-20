import { createMuiTheme } from "@material-ui/core/styles";
import { blueGrey, grey } from "@material-ui/core/colors";

// Create a theme instance.
const theme = createMuiTheme({
    palette: {
        // primary: {
        //     main: "#556cd6",
        // },
        // secondary: {
        //     main: "#19857b",
        // },
        // error: {
        //     main: red.A400,
        // },
        background: {
            default: "#000",
            paper: grey["900"],
        },
        type: "dark",
    },
});

export default theme;
