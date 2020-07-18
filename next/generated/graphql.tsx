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
    lastModifyDate: Scalars["DateTime"];
    content: Scalars["String"];
    user: User;
};

export type Event = {
    __typename?: "Event";
    _id: Scalars["ID"];
    lastModifyDate: Scalars["DateTime"];
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

export type GetTeamResponse = {
    __typename?: "GetTeamResponse";
    isCoach: Scalars["Boolean"];
    team: Team;
};

export type GetTeamsResponse = {
    __typename?: "GetTeamsResponse";
    isMember: Scalars["Boolean"];
    isCoach: Scalars["Boolean"];
    team: Team;
};

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
    applyTeam: Scalars["Boolean"];
    inviteMember: Scalars["Boolean"];
    acceptInvitation: Scalars["Boolean"];
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
    setGoing: Scalars["Boolean"];
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

export type MutationApplyTeamArgs = {
    teamID: Scalars["String"];
};

export type MutationInviteMemberArgs = {
    userID: Scalars["String"];
    teamID: Scalars["String"];
};

export type MutationAcceptInvitationArgs = {
    teamID: Scalars["String"];
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
    sport?: Maybe<Scalars["String"]>;
    imgUrl?: Maybe<Scalars["String"]>;
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

export type MutationSetGoingArgs = {
    isGoing: Scalars["Float"];
    eventID: Scalars["String"];
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
    lastModifyDate: Scalars["DateTime"];
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
    getTeams: Array<GetTeamsResponse>;
    getMembers: Array<User>;
    getCoaches: Array<User>;
    getMyTeams: Array<Team>;
    getTeam: GetTeamResponse;
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
    firstName: Scalars["String"];
    lastName: Scalars["String"];
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
    lastModifyDate: Scalars["DateTime"];
    name: Scalars["String"];
    description: Scalars["String"];
    posts?: Maybe<Array<Post>>;
    events?: Maybe<Array<Event>>;
    sport: Sport;
    imgUrl?: Maybe<Scalars["String"]>;
    numberMembers: Scalars["Int"];
};

export type User = {
    __typename?: "User";
    _id: Scalars["ID"];
    lastModifyDate: Scalars["DateTime"];
    lastLoginDate: Scalars["DateTime"];
    firstName: Scalars["String"];
    lastName: Scalars["String"];
    name: Scalars["String"];
    email: Scalars["String"];
    tokenVersion: Scalars["Int"];
    ip: Array<Scalars["String"]>;
    sport: Array<Sport>;
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

export type EditEventMutationVariables = Exact<{
    description: Scalars["String"];
    name: Scalars["String"];
    startDate: Scalars["DateTime"];
    endDate: Scalars["DateTime"];
    isPrivate: Scalars["Boolean"];
    eventType: Scalars["String"];
    teamID: Scalars["String"];
    eventID: Scalars["String"];
}>;

export type EditEventMutation = { __typename?: "Mutation" } & Pick<Mutation, "editEvent">;

export type GetEventsQueryVariables = Exact<{
    teamID: Scalars["String"];
}>;

export type GetEventsQuery = { __typename?: "Query" } & {
    getTeam: { __typename?: "GetTeamResponse" } & Pick<GetTeamResponse, "isCoach"> & {
            team: { __typename?: "Team" } & Pick<Team, "name" | "_id"> & {
                    events?: Maybe<
                        Array<
                            { __typename?: "Event" } & Pick<
                                Event,
                                "_id" | "startDate" | "endDate" | "description" | "name" | "eventType"
                            >
                        >
                    >;
                };
        };
};

export type AddPostMutationVariables = Exact<{
    imgUrls?: Maybe<Array<Scalars["String"]>>;
    isPrivate?: Maybe<Scalars["Boolean"]>;
    content: Scalars["String"];
    teamID: Scalars["String"];
}>;

export type AddPostMutation = { __typename?: "Mutation" } & Pick<Mutation, "addPost">;

export type DeletePostMutationVariables = Exact<{
    postID: Scalars["String"];
    teamID: Scalars["String"];
}>;

export type DeletePostMutation = { __typename?: "Mutation" } & Pick<Mutation, "deletePost">;

export type EditPostMutationVariables = Exact<{
    postID: Scalars["String"];
    content: Scalars["String"];
    teamID: Scalars["String"];
}>;

export type EditPostMutation = { __typename?: "Mutation" } & Pick<Mutation, "editPost">;

export type LikePostMutationVariables = Exact<{
    postID: Scalars["String"];
}>;

export type LikePostMutation = { __typename?: "Mutation" } & Pick<Mutation, "likePost">;

export type PinPostMutationVariables = Exact<{
    isPined: Scalars["Boolean"];
    postID: Scalars["String"];
    teamID: Scalars["String"];
}>;

export type PinPostMutation = { __typename?: "Mutation" } & Pick<Mutation, "pinPost">;

export type SetPostPrivateMutationVariables = Exact<{
    isPrivate: Scalars["Boolean"];
    postID: Scalars["String"];
    teamID: Scalars["String"];
}>;

export type SetPostPrivateMutation = { __typename?: "Mutation" } & Pick<Mutation, "setPostPrivate">;

export type AddCoachMutationVariables = Exact<{
    teamID: Scalars["String"];
    userID: Scalars["String"];
}>;

export type AddCoachMutation = { __typename?: "Mutation" } & Pick<Mutation, "addCoach">;

export type AddMemberMutationVariables = Exact<{
    teamID: Scalars["String"];
    userID: Scalars["String"];
}>;

export type AddMemberMutation = { __typename?: "Mutation" } & Pick<Mutation, "addMember">;

export type ApplyTeamMutationVariables = Exact<{
    teamID: Scalars["String"];
}>;

export type ApplyTeamMutation = { __typename?: "Mutation" } & Pick<Mutation, "applyTeam">;

export type NewTeamMutationVariables = Exact<{
    sport?: Maybe<Scalars["String"]>;
    imgUrl?: Maybe<Scalars["String"]>;
    name: Scalars["String"];
}>;

export type NewTeamMutation = { __typename?: "Mutation" } & Pick<Mutation, "newTeam">;

export type RemoveCoachMutationVariables = Exact<{
    teamID: Scalars["String"];
    userID: Scalars["String"];
}>;

export type RemoveCoachMutation = { __typename?: "Mutation" } & Pick<Mutation, "removeCoach">;

export type RemoveMemberMutationVariables = Exact<{
    teamID: Scalars["String"];
    userID: Scalars["String"];
}>;

export type RemoveMemberMutation = { __typename?: "Mutation" } & Pick<Mutation, "removeMember">;

export type UpdateTeamMutationVariables = Exact<{
    sport: Scalars["String"];
    teamID: Scalars["String"];
    name: Scalars["String"];
}>;

export type UpdateTeamMutation = { __typename?: "Mutation" } & Pick<Mutation, "updateTeam">;

export type GetCoachesQueryVariables = Exact<{
    teamID: Scalars["String"];
}>;

export type GetCoachesQuery = { __typename?: "Query" } & {
    getCoaches: Array<{ __typename?: "User" } & Pick<User, "name" | "_id" | "sport" | "avatarUrl">>;
};

export type GetMembersQueryVariables = Exact<{
    teamID: Scalars["String"];
}>;

export type GetMembersQuery = { __typename?: "Query" } & {
    getMembers: Array<{ __typename?: "User" } & Pick<User, "name" | "_id" | "sport" | "avatarUrl">>;
};

export type GetTeamPageQueryVariables = Exact<{
    teamID: Scalars["String"];
}>;

export type GetTeamPageQuery = { __typename?: "Query" } & {
    getTeam: { __typename?: "GetTeamResponse" } & Pick<GetTeamResponse, "isCoach"> & {
            team: { __typename?: "Team" } & Pick<Team, "name" | "_id" | "imgUrl"> & {
                    posts?: Maybe<
                        Array<
                            { __typename?: "Post" } & Pick<
                                Post,
                                "content" | "_id" | "isPined" | "imgUrls" | "numberOfLikes" | "lastModifyDate"
                            > & { user: { __typename?: "User" } & Pick<User, "name" | "avatarUrl"> }
                        >
                    >;
                };
        };
};

export type GetTeamIDsQueryVariables = Exact<{ [key: string]: never }>;

export type GetTeamIDsQuery = { __typename?: "Query" } & {
    getTeams: Array<{ __typename?: "GetTeamsResponse" } & { team: { __typename?: "Team" } & Pick<Team, "_id"> }>;
};

export type GetTeamListQueryVariables = Exact<{ [key: string]: never }>;

export type GetTeamListQuery = { __typename?: "Query" } & {
    getMyTeams: Array<{ __typename?: "Team" } & Pick<Team, "name" | "_id" | "imgUrl">>;
};

export type GetTeamsQueryVariables = Exact<{ [key: string]: never }>;

export type GetTeamsQuery = { __typename?: "Query" } & {
    getTeams: Array<
        { __typename?: "GetTeamsResponse" } & Pick<GetTeamsResponse, "isMember"> & {
                team: { __typename?: "Team" } & Pick<
                    Team,
                    "name" | "_id" | "sport" | "imgUrl" | "numberMembers" | "description"
                >;
            }
    >;
};

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
    firstName: Scalars["String"];
    lastName: Scalars["String"];
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
export const EditEventDocument = gql`
    mutation EditEvent(
        $description: String!
        $name: String!
        $startDate: DateTime!
        $endDate: DateTime!
        $isPrivate: Boolean!
        $eventType: String!
        $teamID: String!
        $eventID: String!
    ) {
        editEvent(
            description: $description
            name: $name
            startDate: $startDate
            endDate: $endDate
            isPrivate: false
            eventType: $eventType
            teamID: $teamID
            eventID: $eventID
        )
    }
`;
export type EditEventMutationFn = ApolloReactCommon.MutationFunction<EditEventMutation, EditEventMutationVariables>;

/**
 * __useEditEventMutation__
 *
 * To run a mutation, you first call `useEditEventMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditEventMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editEventMutation, { data, loading, error }] = useEditEventMutation({
 *   variables: {
 *      description: // value for 'description'
 *      name: // value for 'name'
 *      startDate: // value for 'startDate'
 *      endDate: // value for 'endDate'
 *      isPrivate: // value for 'isPrivate'
 *      eventType: // value for 'eventType'
 *      teamID: // value for 'teamID'
 *      eventID: // value for 'eventID'
 *   },
 * });
 */
export function useEditEventMutation(
    baseOptions?: ApolloReactHooks.MutationHookOptions<EditEventMutation, EditEventMutationVariables>,
) {
    return ApolloReactHooks.useMutation<EditEventMutation, EditEventMutationVariables>(EditEventDocument, baseOptions);
}
export type EditEventMutationHookResult = ReturnType<typeof useEditEventMutation>;
export type EditEventMutationResult = ApolloReactCommon.MutationResult<EditEventMutation>;
export type EditEventMutationOptions = ApolloReactCommon.BaseMutationOptions<
    EditEventMutation,
    EditEventMutationVariables
>;
export const GetEventsDocument = gql`
    query GetEvents($teamID: String!) {
        getTeam(teamID: $teamID) {
            team {
                name
                _id
                events {
                    _id
                    startDate
                    endDate
                    description
                    name
                    eventType
                }
            }
            isCoach
        }
    }
`;

/**
 * __useGetEventsQuery__
 *
 * To run a query within a React component, call `useGetEventsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetEventsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetEventsQuery({
 *   variables: {
 *      teamID: // value for 'teamID'
 *   },
 * });
 */
export function useGetEventsQuery(
    baseOptions?: ApolloReactHooks.QueryHookOptions<GetEventsQuery, GetEventsQueryVariables>,
) {
    return ApolloReactHooks.useQuery<GetEventsQuery, GetEventsQueryVariables>(GetEventsDocument, baseOptions);
}
export function useGetEventsLazyQuery(
    baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetEventsQuery, GetEventsQueryVariables>,
) {
    return ApolloReactHooks.useLazyQuery<GetEventsQuery, GetEventsQueryVariables>(GetEventsDocument, baseOptions);
}
export type GetEventsQueryHookResult = ReturnType<typeof useGetEventsQuery>;
export type GetEventsLazyQueryHookResult = ReturnType<typeof useGetEventsLazyQuery>;
export type GetEventsQueryResult = ApolloReactCommon.QueryResult<GetEventsQuery, GetEventsQueryVariables>;
export const AddPostDocument = gql`
    mutation AddPost($imgUrls: [String!], $isPrivate: Boolean, $content: String!, $teamID: String!) {
        addPost(content: $content, imgUrls: $imgUrls, isPrivate: $isPrivate, teamID: $teamID)
    }
`;
export type AddPostMutationFn = ApolloReactCommon.MutationFunction<AddPostMutation, AddPostMutationVariables>;

/**
 * __useAddPostMutation__
 *
 * To run a mutation, you first call `useAddPostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddPostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addPostMutation, { data, loading, error }] = useAddPostMutation({
 *   variables: {
 *      imgUrls: // value for 'imgUrls'
 *      isPrivate: // value for 'isPrivate'
 *      content: // value for 'content'
 *      teamID: // value for 'teamID'
 *   },
 * });
 */
export function useAddPostMutation(
    baseOptions?: ApolloReactHooks.MutationHookOptions<AddPostMutation, AddPostMutationVariables>,
) {
    return ApolloReactHooks.useMutation<AddPostMutation, AddPostMutationVariables>(AddPostDocument, baseOptions);
}
export type AddPostMutationHookResult = ReturnType<typeof useAddPostMutation>;
export type AddPostMutationResult = ApolloReactCommon.MutationResult<AddPostMutation>;
export type AddPostMutationOptions = ApolloReactCommon.BaseMutationOptions<AddPostMutation, AddPostMutationVariables>;
export const DeletePostDocument = gql`
    mutation DeletePost($postID: String!, $teamID: String!) {
        deletePost(postID: $postID, teamID: $teamID)
    }
`;
export type DeletePostMutationFn = ApolloReactCommon.MutationFunction<DeletePostMutation, DeletePostMutationVariables>;

/**
 * __useDeletePostMutation__
 *
 * To run a mutation, you first call `useDeletePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeletePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deletePostMutation, { data, loading, error }] = useDeletePostMutation({
 *   variables: {
 *      postID: // value for 'postID'
 *      teamID: // value for 'teamID'
 *   },
 * });
 */
export function useDeletePostMutation(
    baseOptions?: ApolloReactHooks.MutationHookOptions<DeletePostMutation, DeletePostMutationVariables>,
) {
    return ApolloReactHooks.useMutation<DeletePostMutation, DeletePostMutationVariables>(
        DeletePostDocument,
        baseOptions,
    );
}
export type DeletePostMutationHookResult = ReturnType<typeof useDeletePostMutation>;
export type DeletePostMutationResult = ApolloReactCommon.MutationResult<DeletePostMutation>;
export type DeletePostMutationOptions = ApolloReactCommon.BaseMutationOptions<
    DeletePostMutation,
    DeletePostMutationVariables
>;
export const EditPostDocument = gql`
    mutation EditPost($postID: String!, $content: String!, $teamID: String!) {
        editPost(content: $content, postID: $postID, teamID: $teamID)
    }
`;
export type EditPostMutationFn = ApolloReactCommon.MutationFunction<EditPostMutation, EditPostMutationVariables>;

/**
 * __useEditPostMutation__
 *
 * To run a mutation, you first call `useEditPostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditPostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editPostMutation, { data, loading, error }] = useEditPostMutation({
 *   variables: {
 *      postID: // value for 'postID'
 *      content: // value for 'content'
 *      teamID: // value for 'teamID'
 *   },
 * });
 */
export function useEditPostMutation(
    baseOptions?: ApolloReactHooks.MutationHookOptions<EditPostMutation, EditPostMutationVariables>,
) {
    return ApolloReactHooks.useMutation<EditPostMutation, EditPostMutationVariables>(EditPostDocument, baseOptions);
}
export type EditPostMutationHookResult = ReturnType<typeof useEditPostMutation>;
export type EditPostMutationResult = ApolloReactCommon.MutationResult<EditPostMutation>;
export type EditPostMutationOptions = ApolloReactCommon.BaseMutationOptions<
    EditPostMutation,
    EditPostMutationVariables
>;
export const LikePostDocument = gql`
    mutation LikePost($postID: String!) {
        likePost(postID: $postID)
    }
`;
export type LikePostMutationFn = ApolloReactCommon.MutationFunction<LikePostMutation, LikePostMutationVariables>;

/**
 * __useLikePostMutation__
 *
 * To run a mutation, you first call `useLikePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLikePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [likePostMutation, { data, loading, error }] = useLikePostMutation({
 *   variables: {
 *      postID: // value for 'postID'
 *   },
 * });
 */
export function useLikePostMutation(
    baseOptions?: ApolloReactHooks.MutationHookOptions<LikePostMutation, LikePostMutationVariables>,
) {
    return ApolloReactHooks.useMutation<LikePostMutation, LikePostMutationVariables>(LikePostDocument, baseOptions);
}
export type LikePostMutationHookResult = ReturnType<typeof useLikePostMutation>;
export type LikePostMutationResult = ApolloReactCommon.MutationResult<LikePostMutation>;
export type LikePostMutationOptions = ApolloReactCommon.BaseMutationOptions<
    LikePostMutation,
    LikePostMutationVariables
>;
export const PinPostDocument = gql`
    mutation PinPost($isPined: Boolean!, $postID: String!, $teamID: String!) {
        pinPost(isPined: $isPined, postID: $postID, teamID: $teamID)
    }
`;
export type PinPostMutationFn = ApolloReactCommon.MutationFunction<PinPostMutation, PinPostMutationVariables>;

/**
 * __usePinPostMutation__
 *
 * To run a mutation, you first call `usePinPostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePinPostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [pinPostMutation, { data, loading, error }] = usePinPostMutation({
 *   variables: {
 *      isPined: // value for 'isPined'
 *      postID: // value for 'postID'
 *      teamID: // value for 'teamID'
 *   },
 * });
 */
export function usePinPostMutation(
    baseOptions?: ApolloReactHooks.MutationHookOptions<PinPostMutation, PinPostMutationVariables>,
) {
    return ApolloReactHooks.useMutation<PinPostMutation, PinPostMutationVariables>(PinPostDocument, baseOptions);
}
export type PinPostMutationHookResult = ReturnType<typeof usePinPostMutation>;
export type PinPostMutationResult = ApolloReactCommon.MutationResult<PinPostMutation>;
export type PinPostMutationOptions = ApolloReactCommon.BaseMutationOptions<PinPostMutation, PinPostMutationVariables>;
export const SetPostPrivateDocument = gql`
    mutation SetPostPrivate($isPrivate: Boolean!, $postID: String!, $teamID: String!) {
        setPostPrivate(isPrivate: $isPrivate, postID: $postID, teamID: $teamID)
    }
`;
export type SetPostPrivateMutationFn = ApolloReactCommon.MutationFunction<
    SetPostPrivateMutation,
    SetPostPrivateMutationVariables
>;

/**
 * __useSetPostPrivateMutation__
 *
 * To run a mutation, you first call `useSetPostPrivateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetPostPrivateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setPostPrivateMutation, { data, loading, error }] = useSetPostPrivateMutation({
 *   variables: {
 *      isPrivate: // value for 'isPrivate'
 *      postID: // value for 'postID'
 *      teamID: // value for 'teamID'
 *   },
 * });
 */
export function useSetPostPrivateMutation(
    baseOptions?: ApolloReactHooks.MutationHookOptions<SetPostPrivateMutation, SetPostPrivateMutationVariables>,
) {
    return ApolloReactHooks.useMutation<SetPostPrivateMutation, SetPostPrivateMutationVariables>(
        SetPostPrivateDocument,
        baseOptions,
    );
}
export type SetPostPrivateMutationHookResult = ReturnType<typeof useSetPostPrivateMutation>;
export type SetPostPrivateMutationResult = ApolloReactCommon.MutationResult<SetPostPrivateMutation>;
export type SetPostPrivateMutationOptions = ApolloReactCommon.BaseMutationOptions<
    SetPostPrivateMutation,
    SetPostPrivateMutationVariables
>;
export const AddCoachDocument = gql`
    mutation AddCoach($teamID: String!, $userID: String!) {
        addCoach(teamID: $teamID, userID: $userID)
    }
`;
export type AddCoachMutationFn = ApolloReactCommon.MutationFunction<AddCoachMutation, AddCoachMutationVariables>;

/**
 * __useAddCoachMutation__
 *
 * To run a mutation, you first call `useAddCoachMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddCoachMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addCoachMutation, { data, loading, error }] = useAddCoachMutation({
 *   variables: {
 *      teamID: // value for 'teamID'
 *      userID: // value for 'userID'
 *   },
 * });
 */
export function useAddCoachMutation(
    baseOptions?: ApolloReactHooks.MutationHookOptions<AddCoachMutation, AddCoachMutationVariables>,
) {
    return ApolloReactHooks.useMutation<AddCoachMutation, AddCoachMutationVariables>(AddCoachDocument, baseOptions);
}
export type AddCoachMutationHookResult = ReturnType<typeof useAddCoachMutation>;
export type AddCoachMutationResult = ApolloReactCommon.MutationResult<AddCoachMutation>;
export type AddCoachMutationOptions = ApolloReactCommon.BaseMutationOptions<
    AddCoachMutation,
    AddCoachMutationVariables
>;
export const AddMemberDocument = gql`
    mutation AddMember($teamID: String!, $userID: String!) {
        addMember(teamID: $teamID, userID: $userID)
    }
`;
export type AddMemberMutationFn = ApolloReactCommon.MutationFunction<AddMemberMutation, AddMemberMutationVariables>;

/**
 * __useAddMemberMutation__
 *
 * To run a mutation, you first call `useAddMemberMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddMemberMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addMemberMutation, { data, loading, error }] = useAddMemberMutation({
 *   variables: {
 *      teamID: // value for 'teamID'
 *      userID: // value for 'userID'
 *   },
 * });
 */
export function useAddMemberMutation(
    baseOptions?: ApolloReactHooks.MutationHookOptions<AddMemberMutation, AddMemberMutationVariables>,
) {
    return ApolloReactHooks.useMutation<AddMemberMutation, AddMemberMutationVariables>(AddMemberDocument, baseOptions);
}
export type AddMemberMutationHookResult = ReturnType<typeof useAddMemberMutation>;
export type AddMemberMutationResult = ApolloReactCommon.MutationResult<AddMemberMutation>;
export type AddMemberMutationOptions = ApolloReactCommon.BaseMutationOptions<
    AddMemberMutation,
    AddMemberMutationVariables
>;
export const ApplyTeamDocument = gql`
    mutation ApplyTeam($teamID: String!) {
        applyTeam(teamID: $teamID)
    }
`;
export type ApplyTeamMutationFn = ApolloReactCommon.MutationFunction<ApplyTeamMutation, ApplyTeamMutationVariables>;

/**
 * __useApplyTeamMutation__
 *
 * To run a mutation, you first call `useApplyTeamMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useApplyTeamMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [applyTeamMutation, { data, loading, error }] = useApplyTeamMutation({
 *   variables: {
 *      teamID: // value for 'teamID'
 *   },
 * });
 */
export function useApplyTeamMutation(
    baseOptions?: ApolloReactHooks.MutationHookOptions<ApplyTeamMutation, ApplyTeamMutationVariables>,
) {
    return ApolloReactHooks.useMutation<ApplyTeamMutation, ApplyTeamMutationVariables>(ApplyTeamDocument, baseOptions);
}
export type ApplyTeamMutationHookResult = ReturnType<typeof useApplyTeamMutation>;
export type ApplyTeamMutationResult = ApolloReactCommon.MutationResult<ApplyTeamMutation>;
export type ApplyTeamMutationOptions = ApolloReactCommon.BaseMutationOptions<
    ApplyTeamMutation,
    ApplyTeamMutationVariables
>;
export const NewTeamDocument = gql`
    mutation NewTeam($sport: String, $imgUrl: String, $name: String!) {
        newTeam(sport: $sport, imgUrl: $imgUrl, name: $name)
    }
`;
export type NewTeamMutationFn = ApolloReactCommon.MutationFunction<NewTeamMutation, NewTeamMutationVariables>;

/**
 * __useNewTeamMutation__
 *
 * To run a mutation, you first call `useNewTeamMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useNewTeamMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [newTeamMutation, { data, loading, error }] = useNewTeamMutation({
 *   variables: {
 *      sport: // value for 'sport'
 *      imgUrl: // value for 'imgUrl'
 *      name: // value for 'name'
 *   },
 * });
 */
export function useNewTeamMutation(
    baseOptions?: ApolloReactHooks.MutationHookOptions<NewTeamMutation, NewTeamMutationVariables>,
) {
    return ApolloReactHooks.useMutation<NewTeamMutation, NewTeamMutationVariables>(NewTeamDocument, baseOptions);
}
export type NewTeamMutationHookResult = ReturnType<typeof useNewTeamMutation>;
export type NewTeamMutationResult = ApolloReactCommon.MutationResult<NewTeamMutation>;
export type NewTeamMutationOptions = ApolloReactCommon.BaseMutationOptions<NewTeamMutation, NewTeamMutationVariables>;
export const RemoveCoachDocument = gql`
    mutation RemoveCoach($teamID: String!, $userID: String!) {
        removeCoach(teamID: $teamID, userID: $userID)
    }
`;
export type RemoveCoachMutationFn = ApolloReactCommon.MutationFunction<
    RemoveCoachMutation,
    RemoveCoachMutationVariables
>;

/**
 * __useRemoveCoachMutation__
 *
 * To run a mutation, you first call `useRemoveCoachMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveCoachMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeCoachMutation, { data, loading, error }] = useRemoveCoachMutation({
 *   variables: {
 *      teamID: // value for 'teamID'
 *      userID: // value for 'userID'
 *   },
 * });
 */
export function useRemoveCoachMutation(
    baseOptions?: ApolloReactHooks.MutationHookOptions<RemoveCoachMutation, RemoveCoachMutationVariables>,
) {
    return ApolloReactHooks.useMutation<RemoveCoachMutation, RemoveCoachMutationVariables>(
        RemoveCoachDocument,
        baseOptions,
    );
}
export type RemoveCoachMutationHookResult = ReturnType<typeof useRemoveCoachMutation>;
export type RemoveCoachMutationResult = ApolloReactCommon.MutationResult<RemoveCoachMutation>;
export type RemoveCoachMutationOptions = ApolloReactCommon.BaseMutationOptions<
    RemoveCoachMutation,
    RemoveCoachMutationVariables
>;
export const RemoveMemberDocument = gql`
    mutation RemoveMember($teamID: String!, $userID: String!) {
        removeMember(teamID: $teamID, userID: $userID)
    }
`;
export type RemoveMemberMutationFn = ApolloReactCommon.MutationFunction<
    RemoveMemberMutation,
    RemoveMemberMutationVariables
>;

/**
 * __useRemoveMemberMutation__
 *
 * To run a mutation, you first call `useRemoveMemberMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveMemberMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeMemberMutation, { data, loading, error }] = useRemoveMemberMutation({
 *   variables: {
 *      teamID: // value for 'teamID'
 *      userID: // value for 'userID'
 *   },
 * });
 */
export function useRemoveMemberMutation(
    baseOptions?: ApolloReactHooks.MutationHookOptions<RemoveMemberMutation, RemoveMemberMutationVariables>,
) {
    return ApolloReactHooks.useMutation<RemoveMemberMutation, RemoveMemberMutationVariables>(
        RemoveMemberDocument,
        baseOptions,
    );
}
export type RemoveMemberMutationHookResult = ReturnType<typeof useRemoveMemberMutation>;
export type RemoveMemberMutationResult = ApolloReactCommon.MutationResult<RemoveMemberMutation>;
export type RemoveMemberMutationOptions = ApolloReactCommon.BaseMutationOptions<
    RemoveMemberMutation,
    RemoveMemberMutationVariables
>;
export const UpdateTeamDocument = gql`
    mutation UpdateTeam($sport: String!, $teamID: String!, $name: String!) {
        updateTeam(sport: $sport, teamID: $teamID, name: $name)
    }
`;
export type UpdateTeamMutationFn = ApolloReactCommon.MutationFunction<UpdateTeamMutation, UpdateTeamMutationVariables>;

/**
 * __useUpdateTeamMutation__
 *
 * To run a mutation, you first call `useUpdateTeamMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTeamMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTeamMutation, { data, loading, error }] = useUpdateTeamMutation({
 *   variables: {
 *      sport: // value for 'sport'
 *      teamID: // value for 'teamID'
 *      name: // value for 'name'
 *   },
 * });
 */
export function useUpdateTeamMutation(
    baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateTeamMutation, UpdateTeamMutationVariables>,
) {
    return ApolloReactHooks.useMutation<UpdateTeamMutation, UpdateTeamMutationVariables>(
        UpdateTeamDocument,
        baseOptions,
    );
}
export type UpdateTeamMutationHookResult = ReturnType<typeof useUpdateTeamMutation>;
export type UpdateTeamMutationResult = ApolloReactCommon.MutationResult<UpdateTeamMutation>;
export type UpdateTeamMutationOptions = ApolloReactCommon.BaseMutationOptions<
    UpdateTeamMutation,
    UpdateTeamMutationVariables
>;
export const GetCoachesDocument = gql`
    query GetCoaches($teamID: String!) {
        getCoaches(teamID: $teamID) {
            name
            _id
            sport
            avatarUrl
        }
    }
`;

/**
 * __useGetCoachesQuery__
 *
 * To run a query within a React component, call `useGetCoachesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCoachesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCoachesQuery({
 *   variables: {
 *      teamID: // value for 'teamID'
 *   },
 * });
 */
export function useGetCoachesQuery(
    baseOptions?: ApolloReactHooks.QueryHookOptions<GetCoachesQuery, GetCoachesQueryVariables>,
) {
    return ApolloReactHooks.useQuery<GetCoachesQuery, GetCoachesQueryVariables>(GetCoachesDocument, baseOptions);
}
export function useGetCoachesLazyQuery(
    baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetCoachesQuery, GetCoachesQueryVariables>,
) {
    return ApolloReactHooks.useLazyQuery<GetCoachesQuery, GetCoachesQueryVariables>(GetCoachesDocument, baseOptions);
}
export type GetCoachesQueryHookResult = ReturnType<typeof useGetCoachesQuery>;
export type GetCoachesLazyQueryHookResult = ReturnType<typeof useGetCoachesLazyQuery>;
export type GetCoachesQueryResult = ApolloReactCommon.QueryResult<GetCoachesQuery, GetCoachesQueryVariables>;
export const GetMembersDocument = gql`
    query GetMembers($teamID: String!) {
        getMembers(teamID: $teamID) {
            name
            _id
            sport
            avatarUrl
        }
    }
`;

/**
 * __useGetMembersQuery__
 *
 * To run a query within a React component, call `useGetMembersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMembersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMembersQuery({
 *   variables: {
 *      teamID: // value for 'teamID'
 *   },
 * });
 */
export function useGetMembersQuery(
    baseOptions?: ApolloReactHooks.QueryHookOptions<GetMembersQuery, GetMembersQueryVariables>,
) {
    return ApolloReactHooks.useQuery<GetMembersQuery, GetMembersQueryVariables>(GetMembersDocument, baseOptions);
}
export function useGetMembersLazyQuery(
    baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetMembersQuery, GetMembersQueryVariables>,
) {
    return ApolloReactHooks.useLazyQuery<GetMembersQuery, GetMembersQueryVariables>(GetMembersDocument, baseOptions);
}
export type GetMembersQueryHookResult = ReturnType<typeof useGetMembersQuery>;
export type GetMembersLazyQueryHookResult = ReturnType<typeof useGetMembersLazyQuery>;
export type GetMembersQueryResult = ApolloReactCommon.QueryResult<GetMembersQuery, GetMembersQueryVariables>;
export const GetTeamPageDocument = gql`
    query GetTeamPage($teamID: String!) {
        getTeam(teamID: $teamID) {
            team {
                name
                _id
                imgUrl
                posts {
                    content
                    _id
                    isPined
                    imgUrls
                    numberOfLikes
                    lastModifyDate
                    user {
                        name
                        avatarUrl
                    }
                }
            }
            isCoach
        }
    }
`;

/**
 * __useGetTeamPageQuery__
 *
 * To run a query within a React component, call `useGetTeamPageQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTeamPageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTeamPageQuery({
 *   variables: {
 *      teamID: // value for 'teamID'
 *   },
 * });
 */
export function useGetTeamPageQuery(
    baseOptions?: ApolloReactHooks.QueryHookOptions<GetTeamPageQuery, GetTeamPageQueryVariables>,
) {
    return ApolloReactHooks.useQuery<GetTeamPageQuery, GetTeamPageQueryVariables>(GetTeamPageDocument, baseOptions);
}
export function useGetTeamPageLazyQuery(
    baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetTeamPageQuery, GetTeamPageQueryVariables>,
) {
    return ApolloReactHooks.useLazyQuery<GetTeamPageQuery, GetTeamPageQueryVariables>(GetTeamPageDocument, baseOptions);
}
export type GetTeamPageQueryHookResult = ReturnType<typeof useGetTeamPageQuery>;
export type GetTeamPageLazyQueryHookResult = ReturnType<typeof useGetTeamPageLazyQuery>;
export type GetTeamPageQueryResult = ApolloReactCommon.QueryResult<GetTeamPageQuery, GetTeamPageQueryVariables>;
export const GetTeamIDsDocument = gql`
    query GetTeamIDs {
        getTeams {
            team {
                _id
            }
        }
    }
`;

/**
 * __useGetTeamIDsQuery__
 *
 * To run a query within a React component, call `useGetTeamIDsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTeamIDsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTeamIDsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetTeamIDsQuery(
    baseOptions?: ApolloReactHooks.QueryHookOptions<GetTeamIDsQuery, GetTeamIDsQueryVariables>,
) {
    return ApolloReactHooks.useQuery<GetTeamIDsQuery, GetTeamIDsQueryVariables>(GetTeamIDsDocument, baseOptions);
}
export function useGetTeamIDsLazyQuery(
    baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetTeamIDsQuery, GetTeamIDsQueryVariables>,
) {
    return ApolloReactHooks.useLazyQuery<GetTeamIDsQuery, GetTeamIDsQueryVariables>(GetTeamIDsDocument, baseOptions);
}
export type GetTeamIDsQueryHookResult = ReturnType<typeof useGetTeamIDsQuery>;
export type GetTeamIDsLazyQueryHookResult = ReturnType<typeof useGetTeamIDsLazyQuery>;
export type GetTeamIDsQueryResult = ApolloReactCommon.QueryResult<GetTeamIDsQuery, GetTeamIDsQueryVariables>;
export const GetTeamListDocument = gql`
    query GetTeamList {
        getMyTeams {
            name
            _id
            imgUrl
        }
    }
`;

/**
 * __useGetTeamListQuery__
 *
 * To run a query within a React component, call `useGetTeamListQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTeamListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTeamListQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetTeamListQuery(
    baseOptions?: ApolloReactHooks.QueryHookOptions<GetTeamListQuery, GetTeamListQueryVariables>,
) {
    return ApolloReactHooks.useQuery<GetTeamListQuery, GetTeamListQueryVariables>(GetTeamListDocument, baseOptions);
}
export function useGetTeamListLazyQuery(
    baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetTeamListQuery, GetTeamListQueryVariables>,
) {
    return ApolloReactHooks.useLazyQuery<GetTeamListQuery, GetTeamListQueryVariables>(GetTeamListDocument, baseOptions);
}
export type GetTeamListQueryHookResult = ReturnType<typeof useGetTeamListQuery>;
export type GetTeamListLazyQueryHookResult = ReturnType<typeof useGetTeamListLazyQuery>;
export type GetTeamListQueryResult = ApolloReactCommon.QueryResult<GetTeamListQuery, GetTeamListQueryVariables>;
export const GetTeamsDocument = gql`
    query GetTeams {
        getTeams {
            team {
                name
                _id
                sport
                imgUrl
                numberMembers
                description
            }
            isMember
        }
    }
`;

/**
 * __useGetTeamsQuery__
 *
 * To run a query within a React component, call `useGetTeamsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTeamsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTeamsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetTeamsQuery(
    baseOptions?: ApolloReactHooks.QueryHookOptions<GetTeamsQuery, GetTeamsQueryVariables>,
) {
    return ApolloReactHooks.useQuery<GetTeamsQuery, GetTeamsQueryVariables>(GetTeamsDocument, baseOptions);
}
export function useGetTeamsLazyQuery(
    baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetTeamsQuery, GetTeamsQueryVariables>,
) {
    return ApolloReactHooks.useLazyQuery<GetTeamsQuery, GetTeamsQueryVariables>(GetTeamsDocument, baseOptions);
}
export type GetTeamsQueryHookResult = ReturnType<typeof useGetTeamsQuery>;
export type GetTeamsLazyQueryHookResult = ReturnType<typeof useGetTeamsLazyQuery>;
export type GetTeamsQueryResult = ApolloReactCommon.QueryResult<GetTeamsQuery, GetTeamsQueryVariables>;
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
    mutation Register($email: String!, $password: String!, $firstName: String!, $lastName: String!) {
        register(input: { email: $email, password: $password, firstName: $firstName, lastName: $lastName })
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
 *      firstName: // value for 'firstName'
 *      lastName: // value for 'lastName'
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
