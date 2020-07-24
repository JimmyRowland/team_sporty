import { ApolloProvider } from "@apollo/react-hooks";
import { Provider } from "react-redux";
import { useStore } from "../lib/redux";
import { useApollo } from "../lib/apollo";
import React, { ComponentType, useEffect, useState, Fragment } from "react";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import theme from "../assets/theme";
import { setAccessToken } from "../lib/accessToken";

export default function App({ Component, pageProps }: { Component: ComponentType; pageProps: any }) {
    const store = useStore(pageProps.initialReduxState);
    const apolloClient = useApollo(pageProps.initialApolloState);
    useEffect(() => {
        // Remove the server-side injected CSS.
        const jssStyles = document.querySelector("#jss-server-side");
        if (jssStyles) {
            jssStyles.parentElement!.removeChild(jssStyles);
        }
    }, []);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("http://localhost:4000/refresh_token", {
            method: "POST",
            credentials: "include",
        }).then(async (x) => {
            const { accessToken } = await x.json();
            setAccessToken(accessToken);

            setLoading(false);
        });
    }, []);

    return (
        <Provider store={store}>
            <ApolloProvider client={apolloClient}>
                <ThemeProvider theme={theme}>
                    {loading ? (
                        "loading"
                    ) : (
                        <Fragment>
                            <CssBaseline />
                            <Component {...pageProps} />
                        </Fragment>
                    )}
                </ThemeProvider>
            </ApolloProvider>
        </Provider>
    );
}
