import { ApolloProvider } from "@apollo/react-hooks";
import { Provider } from "react-redux";
import { useStore } from "../lib/redux";
import { useApollo } from "../lib/apollo";
import React, { ComponentType } from "react";

export default function App({ Component, pageProps }: { Component: ComponentType; pageProps: any }) {
    const store = useStore(pageProps.initialReduxState);
    const apolloClient = useApollo(pageProps.initialApolloState);

    return (
        <Provider store={store}>
            <ApolloProvider client={apolloClient}>
                <Component {...pageProps} />
            </ApolloProvider>
        </Provider>
    );
}
