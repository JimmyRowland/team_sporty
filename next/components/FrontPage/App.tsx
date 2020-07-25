import React from "react";
import { makeStyles, createStyles, createMuiTheme, Theme, ThemeProvider } from "@material-ui/core/styles";
import SportsSoccerIcon from "@material-ui/icons/SportsSoccer";
import SportsBasketballIcon from "@material-ui/icons/SportsBasketball";
import SportsBaseballIcon from "@material-ui/icons/SportsBaseball";
import SportsFootballIcon from "@material-ui/icons/SportsFootball";
import SportsCricketIcon from "@material-ui/icons/SportsCricket";
import Button from "@material-ui/core/Button";
import { NoSsr } from "@material-ui/core";
import { green } from "@material-ui/core/colors";
import classNames from "classnames";
import Router from "next/router";

const theme = createMuiTheme({
    palette: {
        primary: green,
    },
});

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        margin: {
            margin: theme.spacing(1),
        },
        body: {
            width: "100%",
            height: "100vh",
            backgroundColor: "rgb(32, 35, 48)",
        },
        logo: {
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            animation: "$fill 1.5s ease forwards 3s",
        },
        brand: {
            position: "absolute",
            top: "30%",
            left: "50%",
            transform: "translate(-50%, -50%)",
        },
        sportIcon: { fontSize: 100, fill: "rgb(32, 35, 48)" },
        soccer: {
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-250%, +75%)",
            animation: "$fill 1.5s ease forwards 3.5s",
        },
        basketball: {
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-155%, +75%)",
            animation: "$fill 1.5s ease forwards 3.5s",
        },
        baseball: {
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-60%, +75%)",
            animation: "$fill 1.5s ease forwards 3.5s",
        },
        football: {
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(+35%, +75%)",
            animation: "$fill 1.5s ease forwards 3.5s",
        },
        cricket: {
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(+130%, +75%)",
            animation: "$fill 1.5s ease forwards 3.5s",
        },
        buttons: {
            top: "50%",
            left: "50%",
            transform: "translate(0%, +410%)",
            animation: "$fill 0.5s ease forwards 3s",
        },
        logo_path_nth_child_1: {
            strokeDasharray: "493px",
            strokeDashoffset: "493px",
            animation: "$line-anim 2s ease forwards",
        },
        logo_path_nth_child_2: {
            strokeDasharray: "310px",
            strokeDashoffset: "310px",
            animation: "$line-anim 2s ease forwards 0.3s",
        },
        logo_path_nth_child_3: {
            strokeDasharray: "322px",
            strokeDashoffset: "322px",
            animation: "$line-anim 2s ease forwards 0.6s",
        },
        logo_path_nth_child_4: {
            strokeDasharray: "408px",
            strokeDashoffset: "408px",
            animation: "$line-anim 2s ease forwards 0.9s",
        },
        logo_path_nth_child_5: {
            strokeDasharray: "337px",
            strokeDashoffset: "337px",
            animation: "$line-anim 2s ease forwards 1.2s",
        },
        logo_path_nth_child_6: {
            strokeDasharray: "373px",
            strokeDashoffset: "373px",
            animation: "$line-anim 2s ease forwards 1.5s",
        },

        "@keyframes line-anim": {
            to: {
                strokeDashoffset: 0,
            },
        },

        "@keyframes fill": {
            to: {
                fill: "white",
            },
        },
    }),
);

function CalendarPage() {
    const classes = useStyles();

    return (
        <NoSsr>
            <div className={classes.body}>
                <div className={classes.brand}>
                    <svg
                        className={classes.logo}
                        width="521"
                        height="104"
                        viewBox="0 0 521 104"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            className={classes.logo_path_nth_child_1}
                            d="M35.0526 103.008C28.4286 103.008 22.4766 101.856 17.1966 99.552C12.0126 97.152 7.93263 93.888 4.95663 89.76C1.98063 85.536 0.444633 80.688 0.348633 75.216H14.3166C14.7966 79.92 16.7166 83.904 20.0766 87.168C23.5326 90.336 28.5246 91.92 35.0526 91.92C41.2926 91.92 46.1886 90.384 49.7406 87.312C53.3886 84.144 55.2126 80.112 55.2126 75.216C55.2126 71.376 54.1566 68.256 52.0446 65.856C49.9326 63.456 47.2926 61.632 44.1246 60.384C40.9566 59.136 36.6846 57.792 31.3086 56.352C24.6846 54.624 19.3566 52.896 15.3246 51.168C11.3886 49.44 7.98063 46.752 5.10063 43.104C2.31663 39.36 0.924633 34.368 0.924633 28.128C0.924633 22.656 2.31663 17.808 5.10063 13.584C7.88463 9.36 11.7726 6.09599 16.7646 3.792C21.8526 1.488 27.6606 0.335999 34.1886 0.335999C43.5966 0.335999 51.2766 2.688 57.2286 7.392C63.2766 12.096 66.6846 18.336 67.4526 26.112H53.0526C52.5726 22.272 50.5566 18.912 47.0046 16.032C43.4526 13.056 38.7486 11.568 32.8926 11.568C27.4206 11.568 22.9566 13.008 19.5006 15.888C16.0446 18.672 14.3166 22.608 14.3166 27.696C14.3166 31.344 15.3246 34.32 17.3406 36.624C19.4526 38.928 21.9966 40.704 24.9726 41.952C28.0446 43.104 32.3166 44.448 37.7886 45.984C44.4126 47.808 49.7406 49.632 53.7726 51.456C57.8046 53.184 61.2606 55.92 64.1406 59.664C67.0206 63.312 68.4606 68.304 68.4606 74.64C68.4606 79.536 67.1646 84.144 64.5726 88.464C61.9806 92.784 58.1406 96.288 53.0526 98.976C47.9646 101.664 41.9646 103.008 35.0526 103.008Z"
                            stroke="white"
                            strokeWidth="5"
                        />
                        <path
                            className={classes.logo_path_nth_child_2}
                            d="M154.848 31.008C154.848 39.36 151.968 46.32 146.208 51.888C140.544 57.36 131.856 60.096 120.144 60.096H100.848V102H87.7443V1.632H120.144C131.472 1.632 140.064 4.368 145.92 9.84C151.872 15.312 154.848 22.368 154.848 31.008ZM120.144 49.296C127.44 49.296 132.816 47.712 136.272 44.544C139.728 41.376 141.456 36.864 141.456 31.008C141.456 18.624 134.352 12.432 120.144 12.432H100.848V49.296H120.144Z"
                            stroke="white"
                            strokeWidth="5"
                        />
                        <path
                            className={classes.logo_path_nth_child_3}
                            d="M216.639 103.008C207.327 103.008 198.831 100.848 191.151 96.528C183.471 92.112 177.375 86.016 172.863 78.24C168.447 70.368 166.239 61.536 166.239 51.744C166.239 41.952 168.447 33.168 172.863 25.392C177.375 17.52 183.471 11.424 191.151 7.104C198.831 2.688 207.327 0.48 216.639 0.48C226.047 0.48 234.591 2.688 242.271 7.104C249.951 11.424 255.999 17.472 260.415 25.248C264.831 33.024 267.039 41.856 267.039 51.744C267.039 61.632 264.831 70.464 260.415 78.24C255.999 86.016 249.951 92.112 242.271 96.528C234.591 100.848 226.047 103.008 216.639 103.008ZM216.639 91.632C223.647 91.632 229.935 90 235.503 86.736C241.167 83.472 245.583 78.816 248.751 72.768C252.015 66.72 253.647 59.712 253.647 51.744C253.647 43.68 252.015 36.672 248.751 30.72C245.583 24.672 241.215 20.016 235.647 16.752C230.079 13.488 223.743 11.856 216.639 11.856C209.535 11.856 203.199 13.488 197.631 16.752C192.063 20.016 187.647 24.672 184.383 30.72C181.215 36.672 179.631 43.68 179.631 51.744C179.631 59.712 181.215 66.72 184.383 72.768C187.647 78.816 192.063 83.472 197.631 86.736C203.295 90 209.631 91.632 216.639 91.632Z"
                            stroke="white"
                            strokeWidth="5"
                        />
                        <path
                            className={classes.logo_path_nth_child_4}
                            d="M337.186 102L313.282 60.96H297.442V102H284.338V1.632H316.738C324.322 1.632 330.706 2.928 335.89 5.52C341.17 8.112 345.106 11.616 347.698 16.032C350.29 20.448 351.586 25.488 351.586 31.152C351.586 38.064 349.57 44.16 345.538 49.44C341.602 54.72 335.65 58.224 327.682 59.952L352.882 102H337.186ZM297.442 50.448H316.738C323.842 50.448 329.17 48.72 332.722 45.264C336.274 41.712 338.05 37.008 338.05 31.152C338.05 25.2 336.274 20.592 332.722 17.328C329.266 14.064 323.938 12.432 316.738 12.432H297.442V50.448Z"
                            stroke="white"
                            strokeWidth="5"
                        />
                        <path
                            className={classes.logo_path_nth_child_5}
                            d="M433.723 1.632V12.288H406.363V102H393.259V12.288H365.755V1.632H433.723Z"
                            stroke="white"
                            strokeWidth="5"
                        />
                        <path
                            className={classes.logo_path_nth_child_6}
                            d="M520.126 1.632L487.438 64.128V102H474.334V64.128L441.502 1.632H456.046L480.814 52.464L505.582 1.632H520.126Z"
                            stroke="white"
                            strokeWidth="5"
                        />
                    </svg>

                    <SportsSoccerIcon className={classNames(classes.sportIcon, classes.soccer)} />
                    <SportsBasketballIcon className={classNames(classes.sportIcon, classes.basketball)} />
                    <SportsBaseballIcon className={classNames(classes.sportIcon, classes.baseball)} />
                    <SportsFootballIcon className={classNames(classes.sportIcon, classes.football)} />
                    <SportsCricketIcon className={classNames(classes.sportIcon, classes.cricket)} />

                    <div className={classes.buttons}>
                        <ThemeProvider theme={theme}>
                            <Button
                                variant="contained"
                                color="primary"
                                className={classNames(classes.margin)}
                                onClick={() => {
                                    Router.push("/login");
                                }}
                            >
                                Login
                            </Button>
                            <Button
                                id="button2"
                                variant="contained"
                                color="secondary"
                                className={classes.margin}
                                onClick={() => {
                                    Router.push("/register");
                                }}
                            >
                                Sign Up
                            </Button>
                        </ThemeProvider>
                    </div>
                </div>
            </div>
        </NoSsr>
    );
}

export default CalendarPage;
