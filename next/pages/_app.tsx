import { ApolloProvider } from "@apollo/react-hooks";
import { Provider } from "react-redux";
import { useStore } from "../lib/redux";
import { useApollo } from "../lib/apollo";
import React, { ComponentType, useEffect } from "react";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import theme from "../assets/theme";

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
    return (
        <Provider store={store}>
            <ApolloProvider client={apolloClient}>
                <ThemeProvider theme={theme}>
                    {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
                    <CssBaseline />
                    <Component {...pageProps} />
                </ThemeProvider>
            </ApolloProvider>
        </Provider>
    );
}
