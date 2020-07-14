import gql from "graphql-tag";
import * as ApolloReactCommon from "@apollo/react-common";
import * as ApolloReactHooks from "@apollo/react-hooks";
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: any }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
    ID: string;
    String: string;
    Boolean: boolean;
    Int: number;
    Float: number;
    /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
    DateTime: any;
};

export type Comment = {
    __typename?: "Comment";
    _id: Scalars["ID"];
    content: Scalars["String"];
    user: User;
};

export type Event = {
    __typename?: "Event";
    _id: Scalars["ID"];
    startDate: Scalars["DateTime"];
    endDate?: Maybe<Scalars["DateTime"]>;
    description: Scalars["String"];
    name: Scalars["String"];
    eventType: EventTypeEnum;
    isPrivate: Scalars["Boolean"];
};

/** Type of event */
export enum EventTypeEnum {
    Match = "match",
    Training = "training",
}

export type LoginResponse = {
    __typename?: "LoginResponse";
    accessToken: Scalars["String"];
    user: User;
};

export type Mutation = {
    __typename?: "Mutation";
    logout: Scalars["Boolean"];
    revokeRefreshTokensForUser: Scalars["Boolean"];
    login: LoginResponse;
    register: Scalars["Boolean"];
    updateTeam: Scalars["Boolean"];
    addMember: Scalars["Boolean"];
    removeMember: Scalars["Boolean"];
    removeCoach: Scalars["Boolean"];
    addCoach: Scalars["Boolean"];
    newTeam: Scalars["Boolean"];
    pinPost: Scalars["Boolean"];
    setPostPrivate: Scalars["Boolean"];
    likePost: Scalars["Boolean"];
    addPost: Scalars["Boolean"];
    deletePost: Scalars["Boolean"];
    editPost: Scalars["Boolean"];
    addEvent: Scalars["Boolean"];
    editEvent: Scalars["Boolean"];
};

export type MutationRevokeRefreshTokensForUserArgs = {
    _id: Scalars["Int"];
};

export type MutationLoginArgs = {
    password: Scalars["String"];
    email: Scalars["String"];
};

export type MutationRegisterArgs = {
    input: RegisterInput;
};

export type MutationUpdateTeamArgs = {
    name: Scalars["String"];
    sport: Scalars["String"];
    teamID: Scalars["String"];
};

export type MutationAddMemberArgs = {
    teamID: Scalars["String"];
    userID: Scalars["String"];
};

export type MutationRemoveMemberArgs = {
    teamID: Scalars["String"];
    userID: Scalars["String"];
};

export type MutationRemoveCoachArgs = {
    teamID: Scalars["String"];
    userID: Scalars["String"];
};

export type MutationAddCoachArgs = {
    teamID: Scalars["String"];
    userID: Scalars["String"];
};

export type MutationNewTeamArgs = {
    name: Scalars["String"];
};

export type MutationPinPostArgs = {
    isPined: Scalars["Boolean"];
    postID: Scalars["String"];
    teamID: Scalars["String"];
};

export type MutationSetPostPrivateArgs = {
    isPrivate: Scalars["Boolean"];
    postID: Scalars["String"];
    teamID: Scalars["String"];
};

export type MutationLikePostArgs = {
    postID: Scalars["String"];
};

export type MutationAddPostArgs = {
    imgUrls?: Maybe<Array<Scalars["String"]>>;
    isPrivate?: Maybe<Scalars["Boolean"]>;
    content: Scalars["String"];
    teamID: Scalars["String"];
};

export type MutationDeletePostArgs = {
    postID: Scalars["String"];
    teamID: Scalars["String"];
};

export type MutationEditPostArgs = {
    content: Scalars["String"];
    postID: Scalars["String"];
    teamID: Scalars["String"];
};

export type MutationAddEventArgs = {
    endDate: Scalars["DateTime"];
    isPrivate: Scalars["Boolean"];
    startDate: Scalars["DateTime"];
    eventType: Scalars["String"];
    name: Scalars["String"];
    description: Scalars["String"];
    teamID: Scalars["String"];
};

export type MutationEditEventArgs = {
    endDate?: Maybe<Scalars["DateTime"]>;
    isPrivate: Scalars["Boolean"];
    startDate: Scalars["DateTime"];
    eventType: Scalars["String"];
    name: Scalars["String"];
    description: Scalars["String"];
    teamID: Scalars["String"];
    eventID: Scalars["String"];
};

export type Post = {
    __typename?: "Post";
    _id: Scalars["ID"];
    content: Scalars["String"];
    user: User;
    isPined: Scalars["Boolean"];
    comments: Array<Comment>;
    isPrivate: Scalars["Boolean"];
    imgUrls: Array<Scalars["String"]>;
    numberOfLikes: Scalars["Int"];
};

export type Query = {
    __typename?: "Query";
    users: Array<User>;
    me?: Maybe<User>;
    getTeams: Array<Team>;
    getMembers: Array<User>;
    getCoaches: Array<User>;
    getTeam: Team;
};

export type QueryGetMembersArgs = {
    teamID: Scalars["String"];
};

export type QueryGetCoachesArgs = {
    teamID: Scalars["String"];
};

export type QueryGetTeamArgs = {
    teamID: Scalars["String"];
};

export type RegisterInput = {
    email: Scalars["String"];
    password: Scalars["String"];
    name: Scalars["String"];
};

/** Types of sports */
export enum Sport {
    Football = "football",
    Cricket = "cricket",
    Basketball = "basketball",
    Unspecified = "unspecified",
}

export type Team = {
    __typename?: "Team";
    _id: Scalars["ID"];
    name: Scalars["String"];
    posts?: Maybe<Array<Post>>;
    events?: Maybe<Array<Event>>;
    sport: Sport;
    imgUrl?: Maybe<Scalars["String"]>;
};

export type User = {
    __typename?: "User";
    _id: Scalars["ID"];
    lastLoginDate: Scalars["DateTime"];
    name: Scalars["String"];
    email: Scalars["String"];
    teamID: Array<Scalars["String"]>;
    tokenVersion: Scalars["Int"];
    ip: Array<Scalars["String"]>;
    bannerUrls: Scalars["String"];
    avatarUrl: Scalars["String"];
};

export type AddEventMutationVariables = Exact<{
    description: Scalars["String"];
    name: Scalars["String"];
    startDate: Scalars["DateTime"];
    endDate: Scalars["DateTime"];
    isPrivate: Scalars["Boolean"];
    eventType: Scalars["String"];
    teamID: Scalars["String"];
}>;

export type AddEventMutation = { __typename?: "Mutation" } & Pick<Mutation, "addEvent">;

export type LoginMutationVariables = Exact<{
    email: Scalars["String"];
    password: Scalars["String"];
}>;

export type LoginMutation = { __typename?: "Mutation" } & {
    login: { __typename?: "LoginResponse" } & Pick<LoginResponse, "accessToken"> & {
            user: { __typename?: "User" } & Pick<User, "_id" | "email" | "name">;
        };
};

export type LogoutMutationVariables = Exact<{ [key: string]: never }>;

export type LogoutMutation = { __typename?: "Mutation" } & Pick<Mutation, "logout">;

export type RegisterMutationVariables = Exact<{
    email: Scalars["String"];
    password: Scalars["String"];
    name: Scalars["String"];
}>;

export type RegisterMutation = { __typename?: "Mutation" } & Pick<Mutation, "register">;

export type MeQueryVariables = Exact<{ [key: string]: never }>;

export type MeQuery = { __typename?: "Query" } & {
    me?: Maybe<{ __typename?: "User" } & Pick<User, "_id" | "email" | "name">>;
};

export const AddEventDocument = gql`
    mutation AddEvent(
        $description: String!
        $name: String!
        $startDate: DateTime!
        $endDate: DateTime!
        $isPrivate: Boolean!
        $eventType: String!
        $teamID: String!
    ) {
        addEvent(
            description: $description
            name: $name
            startDate: $startDate
            endDate: $endDate
            isPrivate: false
            eventType: $eventType
            teamID: $teamID
        )
    }
`;
export type AddEventMutationFn = ApolloReactCommon.MutationFunction<AddEventMutation, AddEventMutationVariables>;

/**
 * __useAddEventMutation__
 *
 * To run a mutation, you first call `useAddEventMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddEventMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addEventMutation, { data, loading, error }] = useAddEventMutation({
 *   variables: {
 *      description: // value for 'description'
 *      name: // value for 'name'
 *      startDate: // value for 'startDate'
 *      endDate: // value for 'endDate'
 *      isPrivate: // value for 'isPrivate'
 *      eventType: // value for 'eventType'
 *      teamID: // value for 'teamID'
 *   },
 * });
 */
export function useAddEventMutation(
    baseOptions?: ApolloReactHooks.MutationHookOptions<AddEventMutation, AddEventMutationVariables>,
) {
    return ApolloReactHooks.useMutation<AddEventMutation, AddEventMutationVariables>(AddEventDocument, baseOptions);
}
export type AddEventMutationHookResult = ReturnType<typeof useAddEventMutation>;
export type AddEventMutationResult = ApolloReactCommon.MutationResult<AddEventMutation>;
export type AddEventMutationOptions = ApolloReactCommon.BaseMutationOptions<
    AddEventMutation,
    AddEventMutationVariables
>;
export const LoginDocument = gql`
    mutation Login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            user {
                _id
                email
                name
            }
            accessToken
        }
    }
`;
export type LoginMutationFn = ApolloReactCommon.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(
    baseOptions?: ApolloReactHooks.MutationHookOptions<LoginMutation, LoginMutationVariables>,
) {
    return ApolloReactHooks.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, baseOptions);
}
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = ApolloReactCommon.MutationResult<LoginMutation>;
export type LoginMutationOptions = ApolloReactCommon.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
        logout
    }
`;
export type LogoutMutationFn = ApolloReactCommon.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(
    baseOptions?: ApolloReactHooks.MutationHookOptions<LogoutMutation, LogoutMutationVariables>,
) {
    return ApolloReactHooks.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, baseOptions);
}
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = ApolloReactCommon.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = ApolloReactCommon.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const RegisterDocument = gql`
    mutation Register($email: String!, $password: String!, $name: String!) {
        register(input: { email: $email, password: $password, name: $name })
    }
`;
export type RegisterMutationFn = ApolloReactCommon.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *      name: // value for 'name'
 *   },
 * });
 */
export function useRegisterMutation(
    baseOptions?: ApolloReactHooks.MutationHookOptions<RegisterMutation, RegisterMutationVariables>,
) {
    return ApolloReactHooks.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, baseOptions);
}
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = ApolloReactCommon.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = ApolloReactCommon.BaseMutationOptions<
    RegisterMutation,
    RegisterMutationVariables
>;
export const MeDocument = gql`
    query Me {
        me {
            _id
            email
            name
        }
    }
`;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<MeQuery, MeQueryVariables>) {
    return ApolloReactHooks.useQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
}
export function useMeLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
    return ApolloReactHooks.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
}
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = ApolloReactCommon.QueryResult<MeQuery, MeQueryVariables>;
