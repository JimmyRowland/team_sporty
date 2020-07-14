import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';
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
  __typename?: 'Comment';
  _id: Scalars['ID'];
  content: Scalars['String'];
  user: User;
};


export type Event = {
  __typename?: 'Event';
  _id: Scalars['ID'];
  startDate: Scalars['DateTime'];
  endDate?: Maybe<Scalars['DateTime']>;
  description: Scalars['String'];
  name: Scalars['String'];
  eventType: EventTypeEnum;
  isPrivate: Scalars['Boolean'];
};

/** Type of event */
export enum EventTypeEnum {
  Match = 'match',
  Training = 'training'
}

export type LoginResponse = {
  __typename?: 'LoginResponse';
  accessToken: Scalars['String'];
  user: User;
};

export type Mutation = {
  __typename?: 'Mutation';
  logout: Scalars['Boolean'];
  revokeRefreshTokensForUser: Scalars['Boolean'];
  login: LoginResponse;
  register: Scalars['Boolean'];
  updateTeam: Scalars['Boolean'];
  addMember: Scalars['Boolean'];
  removeMember: Scalars['Boolean'];
  removeCoach: Scalars['Boolean'];
  addCoach: Scalars['Boolean'];
  newTeam: Scalars['Boolean'];
  pinPost: Scalars['Boolean'];
  setPostPrivate: Scalars['Boolean'];
  likePost: Scalars['Boolean'];
  addPost: Scalars['Boolean'];
  deletePost: Scalars['Boolean'];
  editPost: Scalars['Boolean'];
  addEvent: Scalars['Boolean'];
  editEvent: Scalars['Boolean'];
};


export type MutationRevokeRefreshTokensForUserArgs = {
  _id: Scalars['Int'];
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  email: Scalars['String'];
};


export type MutationRegisterArgs = {
  input: RegisterInput;
};


export type MutationUpdateTeamArgs = {
  name: Scalars['String'];
  sport: Scalars['String'];
  teamID: Scalars['String'];
};


export type MutationAddMemberArgs = {
  teamID: Scalars['String'];
  userID: Scalars['String'];
};


export type MutationRemoveMemberArgs = {
  teamID: Scalars['String'];
  userID: Scalars['String'];
};


export type MutationRemoveCoachArgs = {
  teamID: Scalars['String'];
  userID: Scalars['String'];
};


export type MutationAddCoachArgs = {
  teamID: Scalars['String'];
  userID: Scalars['String'];
};


export type MutationNewTeamArgs = {
  name: Scalars['String'];
};


export type MutationPinPostArgs = {
  isPined: Scalars['Boolean'];
  postID: Scalars['String'];
  teamID: Scalars['String'];
};


export type MutationSetPostPrivateArgs = {
  isPrivate: Scalars['Boolean'];
  postID: Scalars['String'];
  teamID: Scalars['String'];
};


export type MutationLikePostArgs = {
  postID: Scalars['String'];
};


export type MutationAddPostArgs = {
  imgUrls?: Maybe<Array<Scalars['String']>>;
  isPrivate?: Maybe<Scalars['Boolean']>;
  content: Scalars['String'];
  teamID: Scalars['String'];
};


export type MutationDeletePostArgs = {
  postID: Scalars['String'];
  teamID: Scalars['String'];
};


export type MutationEditPostArgs = {
  content: Scalars['String'];
  postID: Scalars['String'];
  teamID: Scalars['String'];
};


export type MutationAddEventArgs = {
  endDate: Scalars['DateTime'];
  isPrivate: Scalars['Boolean'];
  startDate: Scalars['DateTime'];
  eventType: Scalars['String'];
  name: Scalars['String'];
  description: Scalars['String'];
  teamID: Scalars['String'];
};


export type MutationEditEventArgs = {
  endDate?: Maybe<Scalars['DateTime']>;
  isPrivate: Scalars['Boolean'];
  startDate: Scalars['DateTime'];
  eventType: Scalars['String'];
  name: Scalars['String'];
  description: Scalars['String'];
  teamID: Scalars['String'];
  eventID: Scalars['String'];
};

export type Post = {
  __typename?: 'Post';
  _id: Scalars['ID'];
  content: Scalars['String'];
  user: User;
  isPined: Scalars['Boolean'];
  comments: Array<Comment>;
  isPrivate: Scalars['Boolean'];
  imgUrls: Array<Scalars['String']>;
  numberOfLikes: Scalars['Int'];
};

export type Query = {
  __typename?: 'Query';
  users: Array<User>;
  me?: Maybe<User>;
  getTeams: Array<Team>;
  getMembers: Array<User>;
  getCoaches: Array<User>;
  getTeam: Team;
};


export type QueryGetMembersArgs = {
  teamID: Scalars['String'];
};


export type QueryGetCoachesArgs = {
  teamID: Scalars['String'];
};


export type QueryGetTeamArgs = {
  teamID: Scalars['String'];
};

export type RegisterInput = {
  email: Scalars['String'];
  password: Scalars['String'];
  name: Scalars['String'];
};

/** Types of sports */
export enum Sport {
  Football = 'football',
  Cricket = 'cricket',
  Basketball = 'basketball',
  Unspecified = 'unspecified'
}

export type Team = {
  __typename?: 'Team';
  _id: Scalars['ID'];
  name: Scalars['String'];
  posts?: Maybe<Array<Post>>;
  events?: Maybe<Array<Event>>;
  sport: Sport;
  imgUrl?: Maybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  _id: Scalars['ID'];
  lastLoginDate: Scalars['DateTime'];
  name: Scalars['String'];
  email: Scalars['String'];
  tokenVersion: Scalars['Int'];
  ip: Array<Scalars['String']>;
  sport: Array<Sport>;
  bannerUrls: Scalars['String'];
  avatarUrl: Scalars['String'];
};

export type AddEventMutationVariables = Exact<{
  description: Scalars['String'];
  name: Scalars['String'];
  startDate: Scalars['DateTime'];
  endDate: Scalars['DateTime'];
  isPrivate: Scalars['Boolean'];
  eventType: Scalars['String'];
  teamID: Scalars['String'];
}>;


export type AddEventMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'addEvent'>
);

export type AddMemberMutationVariables = Exact<{
  teamID: Scalars['String'];
  userID: Scalars['String'];
}>;


export type AddMemberMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'addMember'>
);

export type RemoveCoachMutationVariables = Exact<{
  teamID: Scalars['String'];
  userID: Scalars['String'];
}>;


export type RemoveCoachMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'removeCoach'>
);

export type RemoveMemberMutationVariables = Exact<{
  teamID: Scalars['String'];
  userID: Scalars['String'];
}>;


export type RemoveMemberMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'removeMember'>
);

export type UpdateTeamMutationVariables = Exact<{
  sport: Scalars['String'];
  teamID: Scalars['String'];
  name: Scalars['String'];
}>;


export type UpdateTeamMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'updateTeam'>
);

export type GetCoachesQueryVariables = Exact<{
  teamID: Scalars['String'];
}>;


export type GetCoachesQuery = (
  { __typename?: 'Query' }
  & { getCoaches: Array<(
    { __typename?: 'User' }
    & Pick<User, 'name' | '_id' | 'sport' | 'avatarUrl'>
  )> }
);

export type GetMembersQueryVariables = Exact<{
  teamID: Scalars['String'];
}>;


export type GetMembersQuery = (
  { __typename?: 'Query' }
  & { getMembers: Array<(
    { __typename?: 'User' }
    & Pick<User, 'name' | '_id' | 'sport' | 'avatarUrl'>
  )> }
);

export type GetTeamPageQueryVariables = Exact<{
  teamID: Scalars['String'];
}>;


export type GetTeamPageQuery = (
  { __typename?: 'Query' }
  & { getTeam: (
    { __typename?: 'Team' }
    & Pick<Team, 'name' | '_id' | 'imgUrl'>
    & { posts?: Maybe<Array<(
      { __typename?: 'Post' }
      & Pick<Post, 'content' | '_id' | 'isPined' | 'imgUrls' | 'numberOfLikes'>
      & { user: (
        { __typename?: 'User' }
        & Pick<User, 'name' | 'avatarUrl'>
      ) }
    )>> }
  ) }
);

export type GetTeamsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetTeamsQuery = (
  { __typename?: 'Query' }
  & { getTeams: Array<(
    { __typename?: 'Team' }
    & Pick<Team, 'name' | '_id' | 'sport' | 'imgUrl'>
  )> }
);

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'LoginResponse' }
    & Pick<LoginResponse, 'accessToken'>
    & { user: (
      { __typename?: 'User' }
      & Pick<User, '_id' | 'email' | 'name'>
    ) }
  ) }
);

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logout'>
);

export type RegisterMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
  name: Scalars['String'];
}>;


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'register'>
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, '_id' | 'email' | 'name'>
  )> }
);


export const AddEventDocument = gql`
    mutation AddEvent($description: String!, $name: String!, $startDate: DateTime!, $endDate: DateTime!, $isPrivate: Boolean!, $eventType: String!, $teamID: String!) {
  addEvent(description: $description, name: $name, startDate: $startDate, endDate: $endDate, isPrivate: false, eventType: $eventType, teamID: $teamID)
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
export function useAddEventMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<AddEventMutation, AddEventMutationVariables>) {
        return ApolloReactHooks.useMutation<AddEventMutation, AddEventMutationVariables>(AddEventDocument, baseOptions);
      }
export type AddEventMutationHookResult = ReturnType<typeof useAddEventMutation>;
export type AddEventMutationResult = ApolloReactCommon.MutationResult<AddEventMutation>;
export type AddEventMutationOptions = ApolloReactCommon.BaseMutationOptions<AddEventMutation, AddEventMutationVariables>;
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
export function useAddMemberMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<AddMemberMutation, AddMemberMutationVariables>) {
        return ApolloReactHooks.useMutation<AddMemberMutation, AddMemberMutationVariables>(AddMemberDocument, baseOptions);
      }
export type AddMemberMutationHookResult = ReturnType<typeof useAddMemberMutation>;
export type AddMemberMutationResult = ApolloReactCommon.MutationResult<AddMemberMutation>;
export type AddMemberMutationOptions = ApolloReactCommon.BaseMutationOptions<AddMemberMutation, AddMemberMutationVariables>;
export const RemoveCoachDocument = gql`
    mutation RemoveCoach($teamID: String!, $userID: String!) {
  removeCoach(teamID: $teamID, userID: $userID)
}
    `;
export type RemoveCoachMutationFn = ApolloReactCommon.MutationFunction<RemoveCoachMutation, RemoveCoachMutationVariables>;

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
export function useRemoveCoachMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<RemoveCoachMutation, RemoveCoachMutationVariables>) {
        return ApolloReactHooks.useMutation<RemoveCoachMutation, RemoveCoachMutationVariables>(RemoveCoachDocument, baseOptions);
      }
export type RemoveCoachMutationHookResult = ReturnType<typeof useRemoveCoachMutation>;
export type RemoveCoachMutationResult = ApolloReactCommon.MutationResult<RemoveCoachMutation>;
export type RemoveCoachMutationOptions = ApolloReactCommon.BaseMutationOptions<RemoveCoachMutation, RemoveCoachMutationVariables>;
export const RemoveMemberDocument = gql`
    mutation RemoveMember($teamID: String!, $userID: String!) {
  removeMember(teamID: $teamID, userID: $userID)
}
    `;
export type RemoveMemberMutationFn = ApolloReactCommon.MutationFunction<RemoveMemberMutation, RemoveMemberMutationVariables>;

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
export function useRemoveMemberMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<RemoveMemberMutation, RemoveMemberMutationVariables>) {
        return ApolloReactHooks.useMutation<RemoveMemberMutation, RemoveMemberMutationVariables>(RemoveMemberDocument, baseOptions);
      }
export type RemoveMemberMutationHookResult = ReturnType<typeof useRemoveMemberMutation>;
export type RemoveMemberMutationResult = ApolloReactCommon.MutationResult<RemoveMemberMutation>;
export type RemoveMemberMutationOptions = ApolloReactCommon.BaseMutationOptions<RemoveMemberMutation, RemoveMemberMutationVariables>;
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
export function useUpdateTeamMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateTeamMutation, UpdateTeamMutationVariables>) {
        return ApolloReactHooks.useMutation<UpdateTeamMutation, UpdateTeamMutationVariables>(UpdateTeamDocument, baseOptions);
      }
export type UpdateTeamMutationHookResult = ReturnType<typeof useUpdateTeamMutation>;
export type UpdateTeamMutationResult = ApolloReactCommon.MutationResult<UpdateTeamMutation>;
export type UpdateTeamMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateTeamMutation, UpdateTeamMutationVariables>;
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
export function useGetCoachesQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetCoachesQuery, GetCoachesQueryVariables>) {
        return ApolloReactHooks.useQuery<GetCoachesQuery, GetCoachesQueryVariables>(GetCoachesDocument, baseOptions);
      }
export function useGetCoachesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetCoachesQuery, GetCoachesQueryVariables>) {
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
export function useGetMembersQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetMembersQuery, GetMembersQueryVariables>) {
        return ApolloReactHooks.useQuery<GetMembersQuery, GetMembersQueryVariables>(GetMembersDocument, baseOptions);
      }
export function useGetMembersLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetMembersQuery, GetMembersQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetMembersQuery, GetMembersQueryVariables>(GetMembersDocument, baseOptions);
        }
export type GetMembersQueryHookResult = ReturnType<typeof useGetMembersQuery>;
export type GetMembersLazyQueryHookResult = ReturnType<typeof useGetMembersLazyQuery>;
export type GetMembersQueryResult = ApolloReactCommon.QueryResult<GetMembersQuery, GetMembersQueryVariables>;
export const GetTeamPageDocument = gql`
    query GetTeamPage($teamID: String!) {
  getTeam(teamID: $teamID) {
    name
    _id
    imgUrl
    posts {
      content
      _id
      isPined
      imgUrls
      numberOfLikes
      user {
        name
        avatarUrl
      }
    }
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
export function useGetTeamPageQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetTeamPageQuery, GetTeamPageQueryVariables>) {
        return ApolloReactHooks.useQuery<GetTeamPageQuery, GetTeamPageQueryVariables>(GetTeamPageDocument, baseOptions);
      }
export function useGetTeamPageLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetTeamPageQuery, GetTeamPageQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetTeamPageQuery, GetTeamPageQueryVariables>(GetTeamPageDocument, baseOptions);
        }
export type GetTeamPageQueryHookResult = ReturnType<typeof useGetTeamPageQuery>;
export type GetTeamPageLazyQueryHookResult = ReturnType<typeof useGetTeamPageLazyQuery>;
export type GetTeamPageQueryResult = ApolloReactCommon.QueryResult<GetTeamPageQuery, GetTeamPageQueryVariables>;
export const GetTeamsDocument = gql`
    query GetTeams {
  getTeams {
    name
    _id
    sport
    imgUrl
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
export function useGetTeamsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetTeamsQuery, GetTeamsQueryVariables>) {
        return ApolloReactHooks.useQuery<GetTeamsQuery, GetTeamsQueryVariables>(GetTeamsDocument, baseOptions);
      }
export function useGetTeamsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetTeamsQuery, GetTeamsQueryVariables>) {
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
export function useLoginMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
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
export function useLogoutMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        return ApolloReactHooks.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, baseOptions);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = ApolloReactCommon.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = ApolloReactCommon.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const RegisterDocument = gql`
    mutation Register($email: String!, $password: String!, $name: String!) {
  register(input: {email: $email, password: $password, name: $name})
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
export function useRegisterMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        return ApolloReactHooks.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, baseOptions);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = ApolloReactCommon.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = ApolloReactCommon.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
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