import { useMemo } from "react";
import { ApolloClient } from "apollo-client";
import { InMemoryCache, NormalizedCacheObject } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import { TokenRefreshLink } from "apollo-link-token-refresh";
import { ApolloLink, Observable } from "apollo-link";
import { getAccessToken, setAccessToken } from "./accessToken";
import jwtDecode from "jwt-decode";
import { onError } from "apollo-link-error";
import { HEROKU, LOCALSERVER } from "./serveruri";

let apolloClient: ApolloClient<NormalizedCacheObject>;

const requestLink = new ApolloLink(
    (operation, forward) =>
        new Observable((observer) => {
            let handle: any;
            Promise.resolve(operation)
                .then((operation) => {
                    const accessToken = getAccessToken();
                    if (accessToken) {
                        operation.setContext({
                            headers: {
                                authorization: `bearer ${accessToken}`,
                            },
                        });
                    }
                })
                .then(() => {
                    handle = forward(operation).subscribe({
                        next: observer.next.bind(observer),
                        error: observer.error.bind(observer),
                        complete: observer.complete.bind(observer),
                    });
                })
                .catch(observer.error.bind(observer));

            return () => {
                if (handle) handle.unsubscribe();
            };
        }),
);

const URI = process.env.NODE_ENV === "production" ? HEROKU : LOCALSERVER;
function createApolloClient() {
    return new ApolloClient({
        ssrMode: typeof window === "undefined",
        link: ApolloLink.from([
            new TokenRefreshLink({
                accessTokenField: "accessToken",
                isTokenValidOrUndefined: () => {
                    const token = getAccessToken();

                    if (!token) {
                        return true;
                    }

                    try {
                        const { exp } = jwtDecode(token);
                        if (Date.now() >= exp * 1000) {
                            return false;
                        } else {
                            return true;
                        }
                    } catch {
                        return false;
                    }
                },
                fetchAccessToken: () => {
                    return fetch(`${URI}/refresh_token`, {
                        method: "POST",
                        credentials: "include",
                    });
                },
                handleFetch: (accessToken) => {
                    setAccessToken(accessToken);
                },
                handleError: (err) => {
                    console.warn("Your refresh token is invalid. Try to relogin");
                    console.error(err);
                },
            }),
            onError(({ graphQLErrors, networkError }) => {
                console.log(graphQLErrors);
                console.log(networkError);
            }),
            requestLink,
            new HttpLink({
                uri: `${URI}/graphql`,
                credentials: "include",
            }),
        ]),
        cache: new InMemoryCache(),
    });
}

export function initializeApollo(initialState: NormalizedCacheObject | null = null) {
    const _apolloClient = apolloClient ?? createApolloClient();
    //TODO Client still does not load from cache after cache has been restored.

    // If your page has Next.js data fetching methods that use Apollo Client, the initial state
    // get hydrated here
    if (initialState) {
        if (apolloClient) {
            _apolloClient.cache.restore({ ...initialState, ...apolloClient.cache.extract() });
        } else {
            _apolloClient.cache.restore(initialState);
        }
    }
    // For SSG and SSR always create a new Apollo Client
    if (typeof window === "undefined") return _apolloClient;
    // Create the Apollo Client once in the client
    if (!apolloClient) apolloClient = _apolloClient;

    return apolloClient;
}

export function useApollo(initialState: NormalizedCacheObject | null) {
    const store = useMemo(() => initializeApollo(initialState), [initialState]);
    return store;
}
