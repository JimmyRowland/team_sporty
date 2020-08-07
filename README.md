# SPORTY

Team Name: SeeGeeDoubleYu

Team Members: Collin Eng, Geordie Parappilly, William Ji, Yu Tian

App Name: SPORTY

#


## Project Description
Whether it be the abundant email spam or numerous apps being used to manage a single sports team, organizing can be a hassle. Our app, Sporty, aims to change that by being the one-stop web app for all your sports team management needs.
#

## Project Task Requirements (Updated)
Along the course of the term and further re-evaluation of our project, we felt it was neccessary to restructure our goals and requirements. Some of our initial goals were underestimated or overestimated in difficulty. We also removed goals that were either overly time-consuming or less relevant, and broke some of the more generic goals into more specific ones. Our new goals now significantly more concise and reflect a more accurate level of achievability we could aspire to hit. 

Minimal Goals
- Create teams ✅
- View teams ✅
- Create events ✅
- Edit personal information for an individual's page ✅
- Team message board ✅
- Login/authentication ✅

Standard Goals
- Ability to add profile image and cover image ✅
- Manage teams - promote players to coaches/managers; kick players ✅
- Mark off availability for events ✅
- Edit team information ✅
- Dynamic routing ✅
- Image posts ✅

Stretch Goals
- Server Side Rendering (NextJS) ✅
- Search function for teams ✅
- Search function for players ❌
- Direct messages to individuals ❌
- Sports Statistics (individual and team) - eg. W/L record, goals/assists, etc. ❌

#

## Overview of Technology Used

#### Unit 1: HTML, JS, CSS, React

Insteading of using JavaScript, we opted to use Typescript for type-checking to help avoid bugs. Our front-end is all written in React components, and consequently encorporate HTML. We used Material-UI, JSS, and inline styles to help with general styling and ui/ux.
 

#### Unit 2: React and Redux

As stated above, our front-end is all just React components. We use Redux to help manage state for deeply nested components such as the team selector on the event page and our user tables. We also used hooks for data fetching and state management.

#### Unit 3: MongoDB
All our data is stored on MongoDB. We have seven different collections of documents to manage our complex data schema. We use Nested Documents and Sub Documents to model 1:N relationship. Instead of using subDocument to handle n:m relationship, we use ObjectID maps to keep data integrity and improve performance.

#### Unit 4: Node and Express
Our backend is also written completely in TypeScript. We used NodeJS to help handle connections and Express as the framework. We also had to use other packages like TypeGraphQL and Typegoose to make use of Typescript decorators to generate GraphQL types, Typescript Types, and MongoDB schemas.

#### Unit 5: Release Engineering
Our GraphQL server is actually deployed to Heroku. Our app, however, is built on NextJS, and consequently, we deployed it on Vercel instead. Vercel is primarily built for NextJS apps and is dedicated to support server-side rendering, which is why we opted to use NextJS in the first place.

#

## Above and Beyond functionality
For one, instead of building a simple React app and only using what we learned in class, we wanted to challenge ourselves by aiming for a significantly more production-ready app. We wrote our entire app, both the front and back-end in Typescript, and also we built our GraphQL server to handle requests. When combining both TypeScript, GraphQL, and Graphql generator, we can leverage the benefits of having a client-driven api, type-safe interface, and the ability to avoid under and over-fetching issues. 

Secondly, we wanted to develop our app on NextJS. NextJS is a framework that that supports pre-rendering. Instead of having the browser render everything from scratch, Next.js can serve pre-rendered HTML. The benefit of this is that our site should appear fast as possible to not only our users, but also to Google. Our site essentially becomes more search engine friendly. As well, NextJS provides true code splitting. Each route is considered a unique entry point into the app and only loads the dependencies that are needed on that route. So theoretically, if we were to demo our teampage on a slow 3g network, only 10 public posts along with team info would be preloaded. Other features such as likes, comments, and the pin toggle would be loaded after the user has been authenticated. Thanks to nextJS pre-rendering and Apollo's efficient caching, our site is blazing fast. There is virtually no loading time when users swtich between route with caching in place.

Security and authentication is another challenge we tackled head-on with our registration and login page. None of our passwords are stored in plain-text, and instead hashed with unique salt using crypto. We have both front and back-end validation checks on things like email type and password length. We store json web tokens in a cookie and authentication header. Different users, depending on their privilege, have access to different features. We don't simply hide certain components; we have authentication middleware to guard the database.

We fully make use of gravatar and cloudinary API, serve pictures through CDN, and provide smooth user experience. We compress pictures upon upload and convert them into webp format to reduce payload. 

Although we do not have time to implement direct messaging, we did finish the live comments update. New comments will be populated every fill second and users can have interactive discussion on a post. 
#

## Next Steps...?

We are happy with our final product, but we do acknowledge that we can definitely build upon it. Some ideas would maybe include a recruiting portal where you could search for players or even list your team as being open to new members. We could add google maps integration to our locations. As well, the option to add statistics so users can record scores for games and even add individual stats would be a great feature to have. The possibilities are almost endless, but we are really happy with the final product we accomplished in this much time. 

#

## Challenges
Dealing with young technologies comes with unique challenges.We need to fix problems such caching bugs that comes with apollo and nextjs integration, [Open issue link](https://github.com/vercel/next.js/discussions/11957), [counter-intuitive type coercion that comes with typegoose](https://github.com/typegoose/typegoose/issues/323), and [dependencies that only work together in some specific versions](https://github.com/react-hook-form/react-hook-form/issues/2105)
#

## Individual Contributions

#### Geordie Parappilly
- developed and helped add to several front-end components including the majority of the event page, the front page, and several of the card items used on the profile and team page
- contributed heavily to the visual design of the app - aligning content, prettying up features, and creating custom Material-UI components
- helped with testing, cleaning up code, and removing unneccesary inputs

#### Collin Eng
- organized most meetings and created timelines for project production
- helped with cleaning up code, adding finishing touches and stylistic tweaks to components

#### Yu Tian
- Set up NextJS and Graphql Server Boilerplate
- Set up the authentication and wrote authentication middlewares
- Created database schemas and wrote many resolvers.
- Deployed the app on heroku and vercel 
- Helped with some layout issues
- Distributed YouTube videos

#

## Screenshots
![Personal Home page](public/sporty1.jpg?raw=true)
![Team Home Page](public/sporty2.jpg?raw=true)
![Calendar Page](public/sporty3.jpg?raw=true)
![Team Search Page](public/sporty4.jpg?raw=true)

#
## Reference
- https://github.com/benawad/jwt-auth-example
- https://github.com/benawad/typescript-nextjs-graphql-series/tree/1_apollo_setup
- https://www.youtube.com/watch?v=8yZImm2A1KE&list=PLN3n1USn4xlma1bBu3Tloe4NyYn9Ko8Gs
- https://www.youtube.com/watch?v=z7872Nki5FY&list=PLYQSCk-qyTW2ewJ05f_GKHtTIzjynDgjK
- https://github.com/devias-io/react-material-dashboard


#
## OLD


## Project Task Requirements (Original)
Minimal Requirements:
- Create, view, and manage teams
- Manage schedules and availiability
- Customized Home pages for the individual
- Team message board

Standard Requirements:
- Search function for teams / players
- Direct messages to individuals
- Add Google calendar support (using Google Calendar API)
- Recruiting / team portal
- Sprucing up the team page, announcements on team page

Stretch:
- Managing Clubs (can have more than one team in a club)
- Social media feeds
- Sports Statistics (individual and team)

## 2 minimal requirements broken down

Create, view, manage teams:
- Creating a team page (logos, introduction, member list) ✅
- Managing players (adding / removing from the team) ✅
- Be able to pull contact info from roster list ✅

Schedules and availability
- Putting in events (with a time and date) ✅
- Players can set their own availability for the events ✅
- Write a comment about attendance
- See which players are available for a specific event ✅
- Calculate number of all users who can attend ✅

#

## Original Mockups 
![Event page](public/Event%20Page.png?raw=true)
![Team Home Page](public/Team%20Home%20Page.png?raw=true)
![Personal Home Page](public/Personal%20Home%20Page.png?raw=true)
