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
  lastModifyDate: Scalars['DateTime'];
  content: Scalars['String'];
  user: User;
};


export type Event = {
  __typename?: 'Event';
  _id: Scalars['ID'];
  lastModifyDate: Scalars['DateTime'];
  startDate: Scalars['DateTime'];
  endDate?: Maybe<Scalars['DateTime']>;
  description: Scalars['String'];
  name: Scalars['String'];
  eventType: EventTypeEnum;
  address: Scalars['String'];
  isPrivate: Scalars['Boolean'];
  usersResponse: Array<UsersResponseToEvent>;
  teamID: Scalars['String'];
};

/** Type of event */
export enum EventTypeEnum {
  Match = 'match',
  Training = 'training'
}

/** Going? Not going? No Response */
export enum EventUserResEnum {
  NotGoing = 'notGoing',
  Going = 'going',
  NoResponse = 'noResponse'
}

export type GetMembersResponse = {
  __typename?: 'GetMembersResponse';
  isCoach: Scalars['Boolean'];
  users: Array<User>;
};

export type GetTeamResponse = {
  __typename?: 'GetTeamResponse';
  isCoach: Scalars['Boolean'];
  team: Team;
};

export type GetTeamsResponse = {
  __typename?: 'GetTeamsResponse';
  isMember: Scalars['Boolean'];
  isCoach: Scalars['Boolean'];
  isPending: Scalars['Boolean'];
  team: Team;
};

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
  uploadAvatar: Scalars['Boolean'];
  uploadBanner: Scalars['Boolean'];
  uploadIntro: Scalars['Boolean'];
  updateTeam: Scalars['Boolean'];
  addMember: Scalars['Boolean'];
  addMembers: Scalars['Boolean'];
  rejectMembers: Scalars['Boolean'];
  applyTeam: Scalars['Boolean'];
  inviteMember: Scalars['Boolean'];
  acceptInvitation: Scalars['Boolean'];
  removeMember: Scalars['Boolean'];
  quitTeamAsMember: Scalars['Boolean'];
  removeMembers: Scalars['Boolean'];
  removeCoach: Scalars['Boolean'];
  quitTeamAsCoach: Scalars['Boolean'];
  addCoach: Scalars['Boolean'];
  addCoaches: Scalars['Boolean'];
  newTeam: Scalars['Boolean'];
  pinPost: Scalars['Boolean'];
  setPostPrivate: Scalars['Boolean'];
  likePost: Scalars['Boolean'];
  addPost: Scalars['Boolean'];
  deletePost: Scalars['Boolean'];
  editPost: Scalars['Boolean'];
  addEvent: Scalars['Boolean'];
  setGoing: Scalars['Boolean'];
  editEvent: Scalars['Boolean'];
  allUserApplyTeam: Scalars['Boolean'];
  removeAllEvent: Scalars['Boolean'];
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


export type MutationUploadAvatarArgs = {
  avatarUrl: Scalars['String'];
};


export type MutationUploadBannerArgs = {
  bannerUrl: Scalars['String'];
};


export type MutationUploadIntroArgs = {
  intro: Scalars['String'];
};


export type MutationUpdateTeamArgs = {
  description: Scalars['String'];
  name: Scalars['String'];
  sport: Scalars['String'];
  teamID: Scalars['String'];
};


export type MutationAddMemberArgs = {
  teamID: Scalars['String'];
  userID: Scalars['String'];
};


export type MutationAddMembersArgs = {
  teamID: Scalars['String'];
  userIDs: Array<Scalars['String']>;
};


export type MutationRejectMembersArgs = {
  teamID: Scalars['String'];
  userIDs: Array<Scalars['String']>;
};


export type MutationApplyTeamArgs = {
  teamID: Scalars['String'];
};


export type MutationInviteMemberArgs = {
  userID: Scalars['String'];
  teamID: Scalars['String'];
};


export type MutationAcceptInvitationArgs = {
  teamID: Scalars['String'];
};


export type MutationRemoveMemberArgs = {
  teamID: Scalars['String'];
  userID: Scalars['String'];
};


export type MutationQuitTeamAsMemberArgs = {
  teamID: Scalars['String'];
};


export type MutationRemoveMembersArgs = {
  teamID: Scalars['String'];
  userIDs: Array<Scalars['String']>;
};


export type MutationRemoveCoachArgs = {
  teamID: Scalars['String'];
  userID: Scalars['String'];
};


export type MutationQuitTeamAsCoachArgs = {
  teamID: Scalars['String'];
};


export type MutationAddCoachArgs = {
  teamID: Scalars['String'];
  userID: Scalars['String'];
};


export type MutationAddCoachesArgs = {
  teamID: Scalars['String'];
  userIDs: Array<Scalars['String']>;
};


export type MutationNewTeamArgs = {
  sport?: Maybe<Scalars['String']>;
  imgUrl?: Maybe<Scalars['String']>;
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
  address: Scalars['String'];
  isPrivate: Scalars['Boolean'];
  startDate: Scalars['DateTime'];
  eventType: Scalars['String'];
  name: Scalars['String'];
  description: Scalars['String'];
  teamID: Scalars['String'];
};


export type MutationSetGoingArgs = {
  isGoing: Scalars['Float'];
  eventID: Scalars['String'];
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


export type MutationAllUserApplyTeamArgs = {
  teamID: Scalars['String'];
};

export type Post = {
  __typename?: 'Post';
  _id: Scalars['ID'];
  lastModifyDate: Scalars['DateTime'];
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
  getTeams: Array<GetTeamsResponse>;
  getPendings: Array<User>;
  getCoaches: GetMembersResponse;
  getMembers: GetMembersResponse;
  getMyTeams: Array<Team>;
  getTeamsAsCoach: Array<Team>;
  getTeamsAsMember: Array<Team>;
  getTeamsAsMemberOrCoach: Array<GetTeamResponse>;
  getTeam: GetTeamResponse;
};


export type QueryGetPendingsArgs = {
  teamID: Scalars['String'];
};


export type QueryGetCoachesArgs = {
  teamID: Scalars['String'];
};


export type QueryGetMembersArgs = {
  teamID: Scalars['String'];
};


export type QueryGetTeamArgs = {
  teamID: Scalars['String'];
};

export type RegisterInput = {
  email: Scalars['String'];
  password: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
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
  lastModifyDate: Scalars['DateTime'];
  name: Scalars['String'];
  description: Scalars['String'];
  posts?: Maybe<Array<Post>>;
  events?: Maybe<Array<Event>>;
  sport: Sport;
  imgUrl: Scalars['String'];
  numberMembers: Scalars['Int'];
};

export type User = {
  __typename?: 'User';
  _id: Scalars['ID'];
  lastModifyDate: Scalars['DateTime'];
  lastLoginDate: Scalars['DateTime'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  name: Scalars['String'];
  email: Scalars['String'];
  tokenVersion: Scalars['Int'];
  address: Scalars['String'];
  phone: Scalars['String'];
  introduction: Scalars['String'];
  ip: Array<Scalars['String']>;
  sport: Array<Sport>;
  bannerUrls: Scalars['String'];
  avatarUrl: Scalars['String'];
};

export type UsersResponseToEvent = {
  __typename?: 'UsersResponseToEvent';
  isGoing: EventUserResEnum;
  user: User;
};

export type AddEventMutationVariables = Exact<{
  description: Scalars['String'];
  name: Scalars['String'];
  startDate: Scalars['DateTime'];
  endDate: Scalars['DateTime'];
  isPrivate: Scalars['Boolean'];
  eventType: Scalars['String'];
  teamID: Scalars['String'];
  address: Scalars['String'];
}>;


export type AddEventMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'addEvent'>
);

export type EditEventMutationVariables = Exact<{
  description: Scalars['String'];
  name: Scalars['String'];
  startDate: Scalars['DateTime'];
  endDate: Scalars['DateTime'];
  isPrivate: Scalars['Boolean'];
  eventType: Scalars['String'];
  teamID: Scalars['String'];
  eventID: Scalars['String'];
}>;


export type EditEventMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'editEvent'>
);

export type SetGoingMutationVariables = Exact<{
  isGoing: Scalars['Float'];
  eventID: Scalars['String'];
}>;


export type SetGoingMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'setGoing'>
);

export type GetEventsAsCoachOrMemberQueryVariables = Exact<{ [key: string]: never; }>;


export type GetEventsAsCoachOrMemberQuery = (
  { __typename?: 'Query' }
  & { getTeamsAsMemberOrCoach: Array<(
    { __typename?: 'GetTeamResponse' }
    & Pick<GetTeamResponse, 'isCoach'>
    & { team: (
      { __typename?: 'Team' }
      & Pick<Team, 'name' | '_id'>
      & { events?: Maybe<Array<(
        { __typename?: 'Event' }
        & Pick<Event, '_id' | 'startDate' | 'endDate' | 'description' | 'name' | 'eventType' | 'address'>
        & { usersResponse: Array<(
          { __typename?: 'UsersResponseToEvent' }
          & Pick<UsersResponseToEvent, 'isGoing'>
          & { user: (
            { __typename?: 'User' }
            & Pick<User, 'name' | 'avatarUrl' | '_id'>
          ) }
        )> }
      )>> }
    ) }
  )> }
);

export type GetEventsForOneTeamQueryVariables = Exact<{
  teamID: Scalars['String'];
}>;


export type GetEventsForOneTeamQuery = (
  { __typename?: 'Query' }
  & { getTeam: (
    { __typename?: 'GetTeamResponse' }
    & Pick<GetTeamResponse, 'isCoach'>
    & { team: (
      { __typename?: 'Team' }
      & Pick<Team, 'name' | '_id'>
      & { events?: Maybe<Array<(
        { __typename?: 'Event' }
        & Pick<Event, '_id' | 'startDate' | 'endDate' | 'description' | 'name' | 'eventType'>
      )>> }
    ) }
  ) }
);

export type AddPostMutationVariables = Exact<{
  imgUrls?: Maybe<Array<Scalars['String']>>;
  isPrivate?: Maybe<Scalars['Boolean']>;
  content: Scalars['String'];
  teamID: Scalars['String'];
}>;


export type AddPostMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'addPost'>
);

export type DeletePostMutationVariables = Exact<{
  postID: Scalars['String'];
  teamID: Scalars['String'];
}>;


export type DeletePostMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deletePost'>
);

export type EditPostMutationVariables = Exact<{
  postID: Scalars['String'];
  content: Scalars['String'];
  teamID: Scalars['String'];
}>;


export type EditPostMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'editPost'>
);

export type LikePostMutationVariables = Exact<{
  postID: Scalars['String'];
}>;


export type LikePostMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'likePost'>
);

export type PinPostMutationVariables = Exact<{
  isPined: Scalars['Boolean'];
  postID: Scalars['String'];
  teamID: Scalars['String'];
}>;


export type PinPostMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'pinPost'>
);

export type SetPostPrivateMutationVariables = Exact<{
  isPrivate: Scalars['Boolean'];
  postID: Scalars['String'];
  teamID: Scalars['String'];
}>;


export type SetPostPrivateMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'setPostPrivate'>
);

export type AddCoachMutationVariables = Exact<{
  teamID: Scalars['String'];
  userID: Scalars['String'];
}>;


export type AddCoachMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'addCoach'>
);

export type AddCoachesMutationVariables = Exact<{
  teamID: Scalars['String'];
  userIDs: Array<Scalars['String']>;
}>;


export type AddCoachesMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'addCoaches'>
);

export type AddMemberMutationVariables = Exact<{
  teamID: Scalars['String'];
  userID: Scalars['String'];
}>;


export type AddMemberMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'addMember'>
);

export type AddMembersMutationVariables = Exact<{
  teamID: Scalars['String'];
  userIDs: Array<Scalars['String']>;
}>;


export type AddMembersMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'addMembers'>
);

export type ApplyTeamMutationVariables = Exact<{
  teamID: Scalars['String'];
}>;


export type ApplyTeamMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'applyTeam'>
);

export type NewTeamMutationVariables = Exact<{
  sport?: Maybe<Scalars['String']>;
  imgUrl?: Maybe<Scalars['String']>;
  name: Scalars['String'];
}>;


export type NewTeamMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'newTeam'>
);

export type QuitTeamAsCoachMutationVariables = Exact<{
  teamID: Scalars['String'];
}>;


export type QuitTeamAsCoachMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'quitTeamAsCoach'>
);

export type QuitTeamAsMemberMutationVariables = Exact<{
  teamID: Scalars['String'];
}>;


export type QuitTeamAsMemberMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'quitTeamAsMember'>
);

export type RejectMembersMutationVariables = Exact<{
  teamID: Scalars['String'];
  userIDs: Array<Scalars['String']>;
}>;


export type RejectMembersMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'rejectMembers'>
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

export type RemoveMembersMutationVariables = Exact<{
  teamID: Scalars['String'];
  userIDs: Array<Scalars['String']>;
}>;


export type RemoveMembersMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'removeMembers'>
);

export type UpdateTeamMutationVariables = Exact<{
  sport: Scalars['String'];
  teamID: Scalars['String'];
  name: Scalars['String'];
  description: Scalars['String'];
}>;


export type UpdateTeamMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'updateTeam'>
);

export type GetTeamListAsCoachQueryVariables = Exact<{ [key: string]: never; }>;


export type GetTeamListAsCoachQuery = (
  { __typename?: 'Query' }
  & { getTeamsAsCoach: Array<(
    { __typename?: 'Team' }
    & Pick<Team, 'name' | '_id'>
  )> }
);

export type GetTeamListAsMemberQueryVariables = Exact<{ [key: string]: never; }>;


export type GetTeamListAsMemberQuery = (
  { __typename?: 'Query' }
  & { getTeamsAsMember: Array<(
    { __typename?: 'Team' }
    & Pick<Team, 'name' | '_id'>
  )> }
);

export type GetCoachesQueryVariables = Exact<{
  teamID: Scalars['String'];
}>;


export type GetCoachesQuery = (
  { __typename?: 'Query' }
  & { getCoaches: (
    { __typename?: 'GetMembersResponse' }
    & Pick<GetMembersResponse, 'isCoach'>
    & { users: Array<(
      { __typename?: 'User' }
      & Pick<User, 'name' | '_id' | 'sport' | 'phone' | 'email' | 'address' | 'avatarUrl'>
    )> }
  ) }
);

export type GetMembersQueryVariables = Exact<{
  teamID: Scalars['String'];
}>;


export type GetMembersQuery = (
  { __typename?: 'Query' }
  & { getMembers: (
    { __typename?: 'GetMembersResponse' }
    & Pick<GetMembersResponse, 'isCoach'>
    & { users: Array<(
      { __typename?: 'User' }
      & Pick<User, 'name' | '_id' | 'sport' | 'phone' | 'email' | 'address' | 'avatarUrl'>
    )> }
  ) }
);

export type GetMyTeamIDsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMyTeamIDsQuery = (
  { __typename?: 'Query' }
  & { getMyTeams: Array<(
    { __typename?: 'Team' }
    & Pick<Team, '_id'>
  )> }
);

export type GetPendingsQueryVariables = Exact<{
  teamID: Scalars['String'];
}>;


export type GetPendingsQuery = (
  { __typename?: 'Query' }
  & { getPendings: Array<(
    { __typename?: 'User' }
    & Pick<User, 'name' | '_id' | 'sport' | 'phone' | 'email' | 'address' | 'avatarUrl'>
  )> }
);

export type GetSearchTeamsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetSearchTeamsQuery = (
  { __typename?: 'Query' }
  & { getTeams: Array<(
    { __typename?: 'GetTeamsResponse' }
    & Pick<GetTeamsResponse, 'isMember' | 'isCoach' | 'isPending'>
    & { team: (
      { __typename?: 'Team' }
      & Pick<Team, 'name' | '_id' | 'sport' | 'imgUrl' | 'numberMembers' | 'description'>
    ) }
  )> }
);

export type GetTeamIDsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetTeamIDsQuery = (
  { __typename?: 'Query' }
  & { getTeams: Array<(
    { __typename?: 'GetTeamsResponse' }
    & { team: (
      { __typename?: 'Team' }
      & Pick<Team, '_id'>
    ) }
  )> }
);

export type GetMyTeamListQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMyTeamListQuery = (
  { __typename?: 'Query' }
  & { getMyTeams: Array<(
    { __typename?: 'Team' }
    & Pick<Team, 'name' | '_id' | 'imgUrl'>
  )> }
);

export type GetTeamListAsMemberOrCoachQueryVariables = Exact<{ [key: string]: never; }>;


export type GetTeamListAsMemberOrCoachQuery = (
  { __typename?: 'Query' }
  & { getTeamsAsMemberOrCoach: Array<(
    { __typename?: 'GetTeamResponse' }
    & Pick<GetTeamResponse, 'isCoach'>
    & { team: (
      { __typename?: 'Team' }
      & Pick<Team, '_id' | 'name'>
    ) }
  )> }
);

export type GetTeamPageQueryVariables = Exact<{
  teamID: Scalars['String'];
}>;


export type GetTeamPageQuery = (
  { __typename?: 'Query' }
  & { getTeam: (
    { __typename?: 'GetTeamResponse' }
    & Pick<GetTeamResponse, 'isCoach'>
    & { team: (
      { __typename?: 'Team' }
      & Pick<Team, 'name' | '_id' | 'imgUrl' | 'description'>
      & { posts?: Maybe<Array<(
        { __typename?: 'Post' }
        & Pick<Post, 'content' | '_id' | 'isPined' | 'imgUrls' | 'numberOfLikes' | 'lastModifyDate'>
        & { user: (
          { __typename?: 'User' }
          & Pick<User, 'name' | 'avatarUrl'>
        ) }
      )>> }
    ) }
  ) }
);

export type GetTeamsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetTeamsQuery = (
  { __typename?: 'Query' }
  & { getTeams: Array<(
    { __typename?: 'GetTeamsResponse' }
    & Pick<GetTeamsResponse, 'isMember'>
    & { team: (
      { __typename?: 'Team' }
      & Pick<Team, 'name' | '_id' | 'sport' | 'imgUrl' | 'numberMembers' | 'description'>
    ) }
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
      & Pick<User, '_id' | 'name' | 'avatarUrl' | 'bannerUrls' | 'introduction'>
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
  firstName: Scalars['String'];
  lastName: Scalars['String'];
}>;


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'register'>
);

export type UploadAvatarMutationVariables = Exact<{
  url: Scalars['String'];
}>;


export type UploadAvatarMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'uploadAvatar'>
);

export type UploadBannerMutationVariables = Exact<{
  url: Scalars['String'];
}>;


export type UploadBannerMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'uploadBanner'>
);

export type UploadIntroMutationVariables = Exact<{
  intro: Scalars['String'];
}>;


export type UploadIntroMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'uploadIntro'>
);

export type GetProfilePageQueryVariables = Exact<{ [key: string]: never; }>;


export type GetProfilePageQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, '_id' | 'name' | 'avatarUrl' | 'bannerUrls'>
  )> }
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, '_id' | 'name' | 'avatarUrl' | 'bannerUrls' | 'introduction'>
  )> }
);


export const AddEventDocument = gql`
    mutation AddEvent($description: String!, $name: String!, $startDate: DateTime!, $endDate: DateTime!, $isPrivate: Boolean!, $eventType: String!, $teamID: String!, $address: String!) {
  addEvent(description: $description, name: $name, startDate: $startDate, endDate: $endDate, isPrivate: $isPrivate, eventType: $eventType, teamID: $teamID, address: $address)
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
 *      address: // value for 'address'
 *   },
 * });
 */
export function useAddEventMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<AddEventMutation, AddEventMutationVariables>) {
        return ApolloReactHooks.useMutation<AddEventMutation, AddEventMutationVariables>(AddEventDocument, baseOptions);
      }
export type AddEventMutationHookResult = ReturnType<typeof useAddEventMutation>;
export type AddEventMutationResult = ApolloReactCommon.MutationResult<AddEventMutation>;
export type AddEventMutationOptions = ApolloReactCommon.BaseMutationOptions<AddEventMutation, AddEventMutationVariables>;
export const EditEventDocument = gql`
    mutation EditEvent($description: String!, $name: String!, $startDate: DateTime!, $endDate: DateTime!, $isPrivate: Boolean!, $eventType: String!, $teamID: String!, $eventID: String!) {
  editEvent(description: $description, name: $name, startDate: $startDate, endDate: $endDate, isPrivate: false, eventType: $eventType, teamID: $teamID, eventID: $eventID)
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
export function useEditEventMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<EditEventMutation, EditEventMutationVariables>) {
        return ApolloReactHooks.useMutation<EditEventMutation, EditEventMutationVariables>(EditEventDocument, baseOptions);
      }
export type EditEventMutationHookResult = ReturnType<typeof useEditEventMutation>;
export type EditEventMutationResult = ApolloReactCommon.MutationResult<EditEventMutation>;
export type EditEventMutationOptions = ApolloReactCommon.BaseMutationOptions<EditEventMutation, EditEventMutationVariables>;
export const SetGoingDocument = gql`
    mutation SetGoing($isGoing: Float!, $eventID: String!) {
  setGoing(isGoing: $isGoing, eventID: $eventID)
}
    `;
export type SetGoingMutationFn = ApolloReactCommon.MutationFunction<SetGoingMutation, SetGoingMutationVariables>;

/**
 * __useSetGoingMutation__
 *
 * To run a mutation, you first call `useSetGoingMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetGoingMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setGoingMutation, { data, loading, error }] = useSetGoingMutation({
 *   variables: {
 *      isGoing: // value for 'isGoing'
 *      eventID: // value for 'eventID'
 *   },
 * });
 */
export function useSetGoingMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SetGoingMutation, SetGoingMutationVariables>) {
        return ApolloReactHooks.useMutation<SetGoingMutation, SetGoingMutationVariables>(SetGoingDocument, baseOptions);
      }
export type SetGoingMutationHookResult = ReturnType<typeof useSetGoingMutation>;
export type SetGoingMutationResult = ApolloReactCommon.MutationResult<SetGoingMutation>;
export type SetGoingMutationOptions = ApolloReactCommon.BaseMutationOptions<SetGoingMutation, SetGoingMutationVariables>;
export const GetEventsAsCoachOrMemberDocument = gql`
    query GetEventsAsCoachOrMember {
  getTeamsAsMemberOrCoach {
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
        address
        usersResponse {
          isGoing
          user {
            name
            avatarUrl
            _id
          }
        }
      }
    }
    isCoach
  }
}
    `;

/**
 * __useGetEventsAsCoachOrMemberQuery__
 *
 * To run a query within a React component, call `useGetEventsAsCoachOrMemberQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetEventsAsCoachOrMemberQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetEventsAsCoachOrMemberQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetEventsAsCoachOrMemberQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetEventsAsCoachOrMemberQuery, GetEventsAsCoachOrMemberQueryVariables>) {
        return ApolloReactHooks.useQuery<GetEventsAsCoachOrMemberQuery, GetEventsAsCoachOrMemberQueryVariables>(GetEventsAsCoachOrMemberDocument, baseOptions);
      }
export function useGetEventsAsCoachOrMemberLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetEventsAsCoachOrMemberQuery, GetEventsAsCoachOrMemberQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetEventsAsCoachOrMemberQuery, GetEventsAsCoachOrMemberQueryVariables>(GetEventsAsCoachOrMemberDocument, baseOptions);
        }
export type GetEventsAsCoachOrMemberQueryHookResult = ReturnType<typeof useGetEventsAsCoachOrMemberQuery>;
export type GetEventsAsCoachOrMemberLazyQueryHookResult = ReturnType<typeof useGetEventsAsCoachOrMemberLazyQuery>;
export type GetEventsAsCoachOrMemberQueryResult = ApolloReactCommon.QueryResult<GetEventsAsCoachOrMemberQuery, GetEventsAsCoachOrMemberQueryVariables>;
export const GetEventsForOneTeamDocument = gql`
    query GetEventsForOneTeam($teamID: String!) {
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
 * __useGetEventsForOneTeamQuery__
 *
 * To run a query within a React component, call `useGetEventsForOneTeamQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetEventsForOneTeamQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetEventsForOneTeamQuery({
 *   variables: {
 *      teamID: // value for 'teamID'
 *   },
 * });
 */
export function useGetEventsForOneTeamQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetEventsForOneTeamQuery, GetEventsForOneTeamQueryVariables>) {
        return ApolloReactHooks.useQuery<GetEventsForOneTeamQuery, GetEventsForOneTeamQueryVariables>(GetEventsForOneTeamDocument, baseOptions);
      }
export function useGetEventsForOneTeamLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetEventsForOneTeamQuery, GetEventsForOneTeamQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetEventsForOneTeamQuery, GetEventsForOneTeamQueryVariables>(GetEventsForOneTeamDocument, baseOptions);
        }
export type GetEventsForOneTeamQueryHookResult = ReturnType<typeof useGetEventsForOneTeamQuery>;
export type GetEventsForOneTeamLazyQueryHookResult = ReturnType<typeof useGetEventsForOneTeamLazyQuery>;
export type GetEventsForOneTeamQueryResult = ApolloReactCommon.QueryResult<GetEventsForOneTeamQuery, GetEventsForOneTeamQueryVariables>;
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
export function useAddPostMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<AddPostMutation, AddPostMutationVariables>) {
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
export function useDeletePostMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeletePostMutation, DeletePostMutationVariables>) {
        return ApolloReactHooks.useMutation<DeletePostMutation, DeletePostMutationVariables>(DeletePostDocument, baseOptions);
      }
export type DeletePostMutationHookResult = ReturnType<typeof useDeletePostMutation>;
export type DeletePostMutationResult = ApolloReactCommon.MutationResult<DeletePostMutation>;
export type DeletePostMutationOptions = ApolloReactCommon.BaseMutationOptions<DeletePostMutation, DeletePostMutationVariables>;
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
export function useEditPostMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<EditPostMutation, EditPostMutationVariables>) {
        return ApolloReactHooks.useMutation<EditPostMutation, EditPostMutationVariables>(EditPostDocument, baseOptions);
      }
export type EditPostMutationHookResult = ReturnType<typeof useEditPostMutation>;
export type EditPostMutationResult = ApolloReactCommon.MutationResult<EditPostMutation>;
export type EditPostMutationOptions = ApolloReactCommon.BaseMutationOptions<EditPostMutation, EditPostMutationVariables>;
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
export function useLikePostMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<LikePostMutation, LikePostMutationVariables>) {
        return ApolloReactHooks.useMutation<LikePostMutation, LikePostMutationVariables>(LikePostDocument, baseOptions);
      }
export type LikePostMutationHookResult = ReturnType<typeof useLikePostMutation>;
export type LikePostMutationResult = ApolloReactCommon.MutationResult<LikePostMutation>;
export type LikePostMutationOptions = ApolloReactCommon.BaseMutationOptions<LikePostMutation, LikePostMutationVariables>;
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
export function usePinPostMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<PinPostMutation, PinPostMutationVariables>) {
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
export type SetPostPrivateMutationFn = ApolloReactCommon.MutationFunction<SetPostPrivateMutation, SetPostPrivateMutationVariables>;

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
export function useSetPostPrivateMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SetPostPrivateMutation, SetPostPrivateMutationVariables>) {
        return ApolloReactHooks.useMutation<SetPostPrivateMutation, SetPostPrivateMutationVariables>(SetPostPrivateDocument, baseOptions);
      }
export type SetPostPrivateMutationHookResult = ReturnType<typeof useSetPostPrivateMutation>;
export type SetPostPrivateMutationResult = ApolloReactCommon.MutationResult<SetPostPrivateMutation>;
export type SetPostPrivateMutationOptions = ApolloReactCommon.BaseMutationOptions<SetPostPrivateMutation, SetPostPrivateMutationVariables>;
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
export function useAddCoachMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<AddCoachMutation, AddCoachMutationVariables>) {
        return ApolloReactHooks.useMutation<AddCoachMutation, AddCoachMutationVariables>(AddCoachDocument, baseOptions);
      }
export type AddCoachMutationHookResult = ReturnType<typeof useAddCoachMutation>;
export type AddCoachMutationResult = ApolloReactCommon.MutationResult<AddCoachMutation>;
export type AddCoachMutationOptions = ApolloReactCommon.BaseMutationOptions<AddCoachMutation, AddCoachMutationVariables>;
export const AddCoachesDocument = gql`
    mutation AddCoaches($teamID: String!, $userIDs: [String!]!) {
  addCoaches(teamID: $teamID, userIDs: $userIDs)
}
    `;
export type AddCoachesMutationFn = ApolloReactCommon.MutationFunction<AddCoachesMutation, AddCoachesMutationVariables>;

/**
 * __useAddCoachesMutation__
 *
 * To run a mutation, you first call `useAddCoachesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddCoachesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addCoachesMutation, { data, loading, error }] = useAddCoachesMutation({
 *   variables: {
 *      teamID: // value for 'teamID'
 *      userIDs: // value for 'userIDs'
 *   },
 * });
 */
export function useAddCoachesMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<AddCoachesMutation, AddCoachesMutationVariables>) {
        return ApolloReactHooks.useMutation<AddCoachesMutation, AddCoachesMutationVariables>(AddCoachesDocument, baseOptions);
      }
export type AddCoachesMutationHookResult = ReturnType<typeof useAddCoachesMutation>;
export type AddCoachesMutationResult = ApolloReactCommon.MutationResult<AddCoachesMutation>;
export type AddCoachesMutationOptions = ApolloReactCommon.BaseMutationOptions<AddCoachesMutation, AddCoachesMutationVariables>;
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
export const AddMembersDocument = gql`
    mutation AddMembers($teamID: String!, $userIDs: [String!]!) {
  addMembers(teamID: $teamID, userIDs: $userIDs)
}
    `;
export type AddMembersMutationFn = ApolloReactCommon.MutationFunction<AddMembersMutation, AddMembersMutationVariables>;

/**
 * __useAddMembersMutation__
 *
 * To run a mutation, you first call `useAddMembersMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddMembersMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addMembersMutation, { data, loading, error }] = useAddMembersMutation({
 *   variables: {
 *      teamID: // value for 'teamID'
 *      userIDs: // value for 'userIDs'
 *   },
 * });
 */
export function useAddMembersMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<AddMembersMutation, AddMembersMutationVariables>) {
        return ApolloReactHooks.useMutation<AddMembersMutation, AddMembersMutationVariables>(AddMembersDocument, baseOptions);
      }
export type AddMembersMutationHookResult = ReturnType<typeof useAddMembersMutation>;
export type AddMembersMutationResult = ApolloReactCommon.MutationResult<AddMembersMutation>;
export type AddMembersMutationOptions = ApolloReactCommon.BaseMutationOptions<AddMembersMutation, AddMembersMutationVariables>;
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
export function useApplyTeamMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<ApplyTeamMutation, ApplyTeamMutationVariables>) {
        return ApolloReactHooks.useMutation<ApplyTeamMutation, ApplyTeamMutationVariables>(ApplyTeamDocument, baseOptions);
      }
export type ApplyTeamMutationHookResult = ReturnType<typeof useApplyTeamMutation>;
export type ApplyTeamMutationResult = ApolloReactCommon.MutationResult<ApplyTeamMutation>;
export type ApplyTeamMutationOptions = ApolloReactCommon.BaseMutationOptions<ApplyTeamMutation, ApplyTeamMutationVariables>;
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
export function useNewTeamMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<NewTeamMutation, NewTeamMutationVariables>) {
        return ApolloReactHooks.useMutation<NewTeamMutation, NewTeamMutationVariables>(NewTeamDocument, baseOptions);
      }
export type NewTeamMutationHookResult = ReturnType<typeof useNewTeamMutation>;
export type NewTeamMutationResult = ApolloReactCommon.MutationResult<NewTeamMutation>;
export type NewTeamMutationOptions = ApolloReactCommon.BaseMutationOptions<NewTeamMutation, NewTeamMutationVariables>;
export const QuitTeamAsCoachDocument = gql`
    mutation QuitTeamAsCoach($teamID: String!) {
  quitTeamAsCoach(teamID: $teamID)
}
    `;
export type QuitTeamAsCoachMutationFn = ApolloReactCommon.MutationFunction<QuitTeamAsCoachMutation, QuitTeamAsCoachMutationVariables>;

/**
 * __useQuitTeamAsCoachMutation__
 *
 * To run a mutation, you first call `useQuitTeamAsCoachMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useQuitTeamAsCoachMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [quitTeamAsCoachMutation, { data, loading, error }] = useQuitTeamAsCoachMutation({
 *   variables: {
 *      teamID: // value for 'teamID'
 *   },
 * });
 */
export function useQuitTeamAsCoachMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<QuitTeamAsCoachMutation, QuitTeamAsCoachMutationVariables>) {
        return ApolloReactHooks.useMutation<QuitTeamAsCoachMutation, QuitTeamAsCoachMutationVariables>(QuitTeamAsCoachDocument, baseOptions);
      }
export type QuitTeamAsCoachMutationHookResult = ReturnType<typeof useQuitTeamAsCoachMutation>;
export type QuitTeamAsCoachMutationResult = ApolloReactCommon.MutationResult<QuitTeamAsCoachMutation>;
export type QuitTeamAsCoachMutationOptions = ApolloReactCommon.BaseMutationOptions<QuitTeamAsCoachMutation, QuitTeamAsCoachMutationVariables>;
export const QuitTeamAsMemberDocument = gql`
    mutation QuitTeamAsMember($teamID: String!) {
  quitTeamAsMember(teamID: $teamID)
}
    `;
export type QuitTeamAsMemberMutationFn = ApolloReactCommon.MutationFunction<QuitTeamAsMemberMutation, QuitTeamAsMemberMutationVariables>;

/**
 * __useQuitTeamAsMemberMutation__
 *
 * To run a mutation, you first call `useQuitTeamAsMemberMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useQuitTeamAsMemberMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [quitTeamAsMemberMutation, { data, loading, error }] = useQuitTeamAsMemberMutation({
 *   variables: {
 *      teamID: // value for 'teamID'
 *   },
 * });
 */
export function useQuitTeamAsMemberMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<QuitTeamAsMemberMutation, QuitTeamAsMemberMutationVariables>) {
        return ApolloReactHooks.useMutation<QuitTeamAsMemberMutation, QuitTeamAsMemberMutationVariables>(QuitTeamAsMemberDocument, baseOptions);
      }
export type QuitTeamAsMemberMutationHookResult = ReturnType<typeof useQuitTeamAsMemberMutation>;
export type QuitTeamAsMemberMutationResult = ApolloReactCommon.MutationResult<QuitTeamAsMemberMutation>;
export type QuitTeamAsMemberMutationOptions = ApolloReactCommon.BaseMutationOptions<QuitTeamAsMemberMutation, QuitTeamAsMemberMutationVariables>;
export const RejectMembersDocument = gql`
    mutation RejectMembers($teamID: String!, $userIDs: [String!]!) {
  rejectMembers(teamID: $teamID, userIDs: $userIDs)
}
    `;
export type RejectMembersMutationFn = ApolloReactCommon.MutationFunction<RejectMembersMutation, RejectMembersMutationVariables>;

/**
 * __useRejectMembersMutation__
 *
 * To run a mutation, you first call `useRejectMembersMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRejectMembersMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [rejectMembersMutation, { data, loading, error }] = useRejectMembersMutation({
 *   variables: {
 *      teamID: // value for 'teamID'
 *      userIDs: // value for 'userIDs'
 *   },
 * });
 */
export function useRejectMembersMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<RejectMembersMutation, RejectMembersMutationVariables>) {
        return ApolloReactHooks.useMutation<RejectMembersMutation, RejectMembersMutationVariables>(RejectMembersDocument, baseOptions);
      }
export type RejectMembersMutationHookResult = ReturnType<typeof useRejectMembersMutation>;
export type RejectMembersMutationResult = ApolloReactCommon.MutationResult<RejectMembersMutation>;
export type RejectMembersMutationOptions = ApolloReactCommon.BaseMutationOptions<RejectMembersMutation, RejectMembersMutationVariables>;
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
export const RemoveMembersDocument = gql`
    mutation RemoveMembers($teamID: String!, $userIDs: [String!]!) {
  removeMembers(teamID: $teamID, userIDs: $userIDs)
}
    `;
export type RemoveMembersMutationFn = ApolloReactCommon.MutationFunction<RemoveMembersMutation, RemoveMembersMutationVariables>;

/**
 * __useRemoveMembersMutation__
 *
 * To run a mutation, you first call `useRemoveMembersMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveMembersMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeMembersMutation, { data, loading, error }] = useRemoveMembersMutation({
 *   variables: {
 *      teamID: // value for 'teamID'
 *      userIDs: // value for 'userIDs'
 *   },
 * });
 */
export function useRemoveMembersMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<RemoveMembersMutation, RemoveMembersMutationVariables>) {
        return ApolloReactHooks.useMutation<RemoveMembersMutation, RemoveMembersMutationVariables>(RemoveMembersDocument, baseOptions);
      }
export type RemoveMembersMutationHookResult = ReturnType<typeof useRemoveMembersMutation>;
export type RemoveMembersMutationResult = ApolloReactCommon.MutationResult<RemoveMembersMutation>;
export type RemoveMembersMutationOptions = ApolloReactCommon.BaseMutationOptions<RemoveMembersMutation, RemoveMembersMutationVariables>;
export const UpdateTeamDocument = gql`
    mutation UpdateTeam($sport: String!, $teamID: String!, $name: String!, $description: String!) {
  updateTeam(sport: $sport, teamID: $teamID, name: $name, description: $description)
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
 *      description: // value for 'description'
 *   },
 * });
 */
export function useUpdateTeamMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateTeamMutation, UpdateTeamMutationVariables>) {
        return ApolloReactHooks.useMutation<UpdateTeamMutation, UpdateTeamMutationVariables>(UpdateTeamDocument, baseOptions);
      }
export type UpdateTeamMutationHookResult = ReturnType<typeof useUpdateTeamMutation>;
export type UpdateTeamMutationResult = ApolloReactCommon.MutationResult<UpdateTeamMutation>;
export type UpdateTeamMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateTeamMutation, UpdateTeamMutationVariables>;
export const GetTeamListAsCoachDocument = gql`
    query GetTeamListAsCoach {
  getTeamsAsCoach {
    name
    _id
  }
}
    `;

/**
 * __useGetTeamListAsCoachQuery__
 *
 * To run a query within a React component, call `useGetTeamListAsCoachQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTeamListAsCoachQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTeamListAsCoachQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetTeamListAsCoachQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetTeamListAsCoachQuery, GetTeamListAsCoachQueryVariables>) {
        return ApolloReactHooks.useQuery<GetTeamListAsCoachQuery, GetTeamListAsCoachQueryVariables>(GetTeamListAsCoachDocument, baseOptions);
      }
export function useGetTeamListAsCoachLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetTeamListAsCoachQuery, GetTeamListAsCoachQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetTeamListAsCoachQuery, GetTeamListAsCoachQueryVariables>(GetTeamListAsCoachDocument, baseOptions);
        }
export type GetTeamListAsCoachQueryHookResult = ReturnType<typeof useGetTeamListAsCoachQuery>;
export type GetTeamListAsCoachLazyQueryHookResult = ReturnType<typeof useGetTeamListAsCoachLazyQuery>;
export type GetTeamListAsCoachQueryResult = ApolloReactCommon.QueryResult<GetTeamListAsCoachQuery, GetTeamListAsCoachQueryVariables>;
export const GetTeamListAsMemberDocument = gql`
    query GetTeamListAsMember {
  getTeamsAsMember {
    name
    _id
  }
}
    `;

/**
 * __useGetTeamListAsMemberQuery__
 *
 * To run a query within a React component, call `useGetTeamListAsMemberQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTeamListAsMemberQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTeamListAsMemberQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetTeamListAsMemberQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetTeamListAsMemberQuery, GetTeamListAsMemberQueryVariables>) {
        return ApolloReactHooks.useQuery<GetTeamListAsMemberQuery, GetTeamListAsMemberQueryVariables>(GetTeamListAsMemberDocument, baseOptions);
      }
export function useGetTeamListAsMemberLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetTeamListAsMemberQuery, GetTeamListAsMemberQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetTeamListAsMemberQuery, GetTeamListAsMemberQueryVariables>(GetTeamListAsMemberDocument, baseOptions);
        }
export type GetTeamListAsMemberQueryHookResult = ReturnType<typeof useGetTeamListAsMemberQuery>;
export type GetTeamListAsMemberLazyQueryHookResult = ReturnType<typeof useGetTeamListAsMemberLazyQuery>;
export type GetTeamListAsMemberQueryResult = ApolloReactCommon.QueryResult<GetTeamListAsMemberQuery, GetTeamListAsMemberQueryVariables>;
export const GetCoachesDocument = gql`
    query GetCoaches($teamID: String!) {
  getCoaches(teamID: $teamID) {
    users {
      name
      _id
      sport
      phone
      email
      address
      avatarUrl
    }
    isCoach
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
    users {
      name
      _id
      sport
      phone
      email
      address
      avatarUrl
    }
    isCoach
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
export const GetMyTeamIDsDocument = gql`
    query GetMyTeamIDs {
  getMyTeams {
    _id
  }
}
    `;

/**
 * __useGetMyTeamIDsQuery__
 *
 * To run a query within a React component, call `useGetMyTeamIDsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMyTeamIDsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMyTeamIDsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetMyTeamIDsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetMyTeamIDsQuery, GetMyTeamIDsQueryVariables>) {
        return ApolloReactHooks.useQuery<GetMyTeamIDsQuery, GetMyTeamIDsQueryVariables>(GetMyTeamIDsDocument, baseOptions);
      }
export function useGetMyTeamIDsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetMyTeamIDsQuery, GetMyTeamIDsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetMyTeamIDsQuery, GetMyTeamIDsQueryVariables>(GetMyTeamIDsDocument, baseOptions);
        }
export type GetMyTeamIDsQueryHookResult = ReturnType<typeof useGetMyTeamIDsQuery>;
export type GetMyTeamIDsLazyQueryHookResult = ReturnType<typeof useGetMyTeamIDsLazyQuery>;
export type GetMyTeamIDsQueryResult = ApolloReactCommon.QueryResult<GetMyTeamIDsQuery, GetMyTeamIDsQueryVariables>;
export const GetPendingsDocument = gql`
    query GetPendings($teamID: String!) {
  getPendings(teamID: $teamID) {
    name
    _id
    sport
    phone
    email
    address
    avatarUrl
  }
}
    `;

/**
 * __useGetPendingsQuery__
 *
 * To run a query within a React component, call `useGetPendingsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPendingsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPendingsQuery({
 *   variables: {
 *      teamID: // value for 'teamID'
 *   },
 * });
 */
export function useGetPendingsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetPendingsQuery, GetPendingsQueryVariables>) {
        return ApolloReactHooks.useQuery<GetPendingsQuery, GetPendingsQueryVariables>(GetPendingsDocument, baseOptions);
      }
export function useGetPendingsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetPendingsQuery, GetPendingsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetPendingsQuery, GetPendingsQueryVariables>(GetPendingsDocument, baseOptions);
        }
export type GetPendingsQueryHookResult = ReturnType<typeof useGetPendingsQuery>;
export type GetPendingsLazyQueryHookResult = ReturnType<typeof useGetPendingsLazyQuery>;
export type GetPendingsQueryResult = ApolloReactCommon.QueryResult<GetPendingsQuery, GetPendingsQueryVariables>;
export const GetSearchTeamsDocument = gql`
    query GetSearchTeams {
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
    isCoach
    isPending
  }
}
    `;

/**
 * __useGetSearchTeamsQuery__
 *
 * To run a query within a React component, call `useGetSearchTeamsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSearchTeamsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSearchTeamsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetSearchTeamsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetSearchTeamsQuery, GetSearchTeamsQueryVariables>) {
        return ApolloReactHooks.useQuery<GetSearchTeamsQuery, GetSearchTeamsQueryVariables>(GetSearchTeamsDocument, baseOptions);
      }
export function useGetSearchTeamsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetSearchTeamsQuery, GetSearchTeamsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetSearchTeamsQuery, GetSearchTeamsQueryVariables>(GetSearchTeamsDocument, baseOptions);
        }
export type GetSearchTeamsQueryHookResult = ReturnType<typeof useGetSearchTeamsQuery>;
export type GetSearchTeamsLazyQueryHookResult = ReturnType<typeof useGetSearchTeamsLazyQuery>;
export type GetSearchTeamsQueryResult = ApolloReactCommon.QueryResult<GetSearchTeamsQuery, GetSearchTeamsQueryVariables>;
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
export function useGetTeamIDsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetTeamIDsQuery, GetTeamIDsQueryVariables>) {
        return ApolloReactHooks.useQuery<GetTeamIDsQuery, GetTeamIDsQueryVariables>(GetTeamIDsDocument, baseOptions);
      }
export function useGetTeamIDsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetTeamIDsQuery, GetTeamIDsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetTeamIDsQuery, GetTeamIDsQueryVariables>(GetTeamIDsDocument, baseOptions);
        }
export type GetTeamIDsQueryHookResult = ReturnType<typeof useGetTeamIDsQuery>;
export type GetTeamIDsLazyQueryHookResult = ReturnType<typeof useGetTeamIDsLazyQuery>;
export type GetTeamIDsQueryResult = ApolloReactCommon.QueryResult<GetTeamIDsQuery, GetTeamIDsQueryVariables>;
export const GetMyTeamListDocument = gql`
    query GetMyTeamList {
  getMyTeams {
    name
    _id
    imgUrl
  }
}
    `;

/**
 * __useGetMyTeamListQuery__
 *
 * To run a query within a React component, call `useGetMyTeamListQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMyTeamListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMyTeamListQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetMyTeamListQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetMyTeamListQuery, GetMyTeamListQueryVariables>) {
        return ApolloReactHooks.useQuery<GetMyTeamListQuery, GetMyTeamListQueryVariables>(GetMyTeamListDocument, baseOptions);
      }
export function useGetMyTeamListLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetMyTeamListQuery, GetMyTeamListQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetMyTeamListQuery, GetMyTeamListQueryVariables>(GetMyTeamListDocument, baseOptions);
        }
export type GetMyTeamListQueryHookResult = ReturnType<typeof useGetMyTeamListQuery>;
export type GetMyTeamListLazyQueryHookResult = ReturnType<typeof useGetMyTeamListLazyQuery>;
export type GetMyTeamListQueryResult = ApolloReactCommon.QueryResult<GetMyTeamListQuery, GetMyTeamListQueryVariables>;
export const GetTeamListAsMemberOrCoachDocument = gql`
    query GetTeamListAsMemberOrCoach {
  getTeamsAsMemberOrCoach {
    team {
      _id
      name
    }
    isCoach
  }
}
    `;

/**
 * __useGetTeamListAsMemberOrCoachQuery__
 *
 * To run a query within a React component, call `useGetTeamListAsMemberOrCoachQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTeamListAsMemberOrCoachQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTeamListAsMemberOrCoachQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetTeamListAsMemberOrCoachQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetTeamListAsMemberOrCoachQuery, GetTeamListAsMemberOrCoachQueryVariables>) {
        return ApolloReactHooks.useQuery<GetTeamListAsMemberOrCoachQuery, GetTeamListAsMemberOrCoachQueryVariables>(GetTeamListAsMemberOrCoachDocument, baseOptions);
      }
export function useGetTeamListAsMemberOrCoachLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetTeamListAsMemberOrCoachQuery, GetTeamListAsMemberOrCoachQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetTeamListAsMemberOrCoachQuery, GetTeamListAsMemberOrCoachQueryVariables>(GetTeamListAsMemberOrCoachDocument, baseOptions);
        }
export type GetTeamListAsMemberOrCoachQueryHookResult = ReturnType<typeof useGetTeamListAsMemberOrCoachQuery>;
export type GetTeamListAsMemberOrCoachLazyQueryHookResult = ReturnType<typeof useGetTeamListAsMemberOrCoachLazyQuery>;
export type GetTeamListAsMemberOrCoachQueryResult = ApolloReactCommon.QueryResult<GetTeamListAsMemberOrCoachQuery, GetTeamListAsMemberOrCoachQueryVariables>;
export const GetTeamPageDocument = gql`
    query GetTeamPage($teamID: String!) {
  getTeam(teamID: $teamID) {
    team {
      name
      _id
      imgUrl
      description
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
      name
      avatarUrl
      bannerUrls
      introduction
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
    mutation Register($email: String!, $password: String!, $firstName: String!, $lastName: String!) {
  register(input: {email: $email, password: $password, firstName: $firstName, lastName: $lastName})
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
export function useRegisterMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        return ApolloReactHooks.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, baseOptions);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = ApolloReactCommon.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = ApolloReactCommon.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const UploadAvatarDocument = gql`
    mutation UploadAvatar($url: String!) {
  uploadAvatar(avatarUrl: $url)
}
    `;
export type UploadAvatarMutationFn = ApolloReactCommon.MutationFunction<UploadAvatarMutation, UploadAvatarMutationVariables>;

/**
 * __useUploadAvatarMutation__
 *
 * To run a mutation, you first call `useUploadAvatarMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUploadAvatarMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [uploadAvatarMutation, { data, loading, error }] = useUploadAvatarMutation({
 *   variables: {
 *      url: // value for 'url'
 *   },
 * });
 */
export function useUploadAvatarMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UploadAvatarMutation, UploadAvatarMutationVariables>) {
        return ApolloReactHooks.useMutation<UploadAvatarMutation, UploadAvatarMutationVariables>(UploadAvatarDocument, baseOptions);
      }
export type UploadAvatarMutationHookResult = ReturnType<typeof useUploadAvatarMutation>;
export type UploadAvatarMutationResult = ApolloReactCommon.MutationResult<UploadAvatarMutation>;
export type UploadAvatarMutationOptions = ApolloReactCommon.BaseMutationOptions<UploadAvatarMutation, UploadAvatarMutationVariables>;
export const UploadBannerDocument = gql`
    mutation UploadBanner($url: String!) {
  uploadBanner(bannerUrl: $url)
}
    `;
export type UploadBannerMutationFn = ApolloReactCommon.MutationFunction<UploadBannerMutation, UploadBannerMutationVariables>;

/**
 * __useUploadBannerMutation__
 *
 * To run a mutation, you first call `useUploadBannerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUploadBannerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [uploadBannerMutation, { data, loading, error }] = useUploadBannerMutation({
 *   variables: {
 *      url: // value for 'url'
 *   },
 * });
 */
export function useUploadBannerMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UploadBannerMutation, UploadBannerMutationVariables>) {
        return ApolloReactHooks.useMutation<UploadBannerMutation, UploadBannerMutationVariables>(UploadBannerDocument, baseOptions);
      }
export type UploadBannerMutationHookResult = ReturnType<typeof useUploadBannerMutation>;
export type UploadBannerMutationResult = ApolloReactCommon.MutationResult<UploadBannerMutation>;
export type UploadBannerMutationOptions = ApolloReactCommon.BaseMutationOptions<UploadBannerMutation, UploadBannerMutationVariables>;
export const UploadIntroDocument = gql`
    mutation UploadIntro($intro: String!) {
  uploadIntro(intro: $intro)
}
    `;
export type UploadIntroMutationFn = ApolloReactCommon.MutationFunction<UploadIntroMutation, UploadIntroMutationVariables>;

/**
 * __useUploadIntroMutation__
 *
 * To run a mutation, you first call `useUploadIntroMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUploadIntroMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [uploadIntroMutation, { data, loading, error }] = useUploadIntroMutation({
 *   variables: {
 *      intro: // value for 'intro'
 *   },
 * });
 */
export function useUploadIntroMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UploadIntroMutation, UploadIntroMutationVariables>) {
        return ApolloReactHooks.useMutation<UploadIntroMutation, UploadIntroMutationVariables>(UploadIntroDocument, baseOptions);
      }
export type UploadIntroMutationHookResult = ReturnType<typeof useUploadIntroMutation>;
export type UploadIntroMutationResult = ApolloReactCommon.MutationResult<UploadIntroMutation>;
export type UploadIntroMutationOptions = ApolloReactCommon.BaseMutationOptions<UploadIntroMutation, UploadIntroMutationVariables>;
export const GetProfilePageDocument = gql`
    query GetProfilePage {
  me {
    _id
    name
    avatarUrl
    bannerUrls
  }
}
    `;

/**
 * __useGetProfilePageQuery__
 *
 * To run a query within a React component, call `useGetProfilePageQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProfilePageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProfilePageQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetProfilePageQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetProfilePageQuery, GetProfilePageQueryVariables>) {
        return ApolloReactHooks.useQuery<GetProfilePageQuery, GetProfilePageQueryVariables>(GetProfilePageDocument, baseOptions);
      }
export function useGetProfilePageLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetProfilePageQuery, GetProfilePageQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetProfilePageQuery, GetProfilePageQueryVariables>(GetProfilePageDocument, baseOptions);
        }
export type GetProfilePageQueryHookResult = ReturnType<typeof useGetProfilePageQuery>;
export type GetProfilePageLazyQueryHookResult = ReturnType<typeof useGetProfilePageLazyQuery>;
export type GetProfilePageQueryResult = ApolloReactCommon.QueryResult<GetProfilePageQuery, GetProfilePageQueryVariables>;
export const MeDocument = gql`
    query Me {
  me {
    _id
    name
    avatarUrl
    bannerUrls
    introduction
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