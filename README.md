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

Insteading of using JavaScript, we opted to use Typescript for type-checking to help avoid bugs. Our front-end is all written in React components, and consequently encorporate HTML. We used Material-UI, custom CSS, and inline styles to help with general styling and ui/ux.
 

#### Unit 2: React and Redux

As stated above, our front-end is all just React components. We use Redux to help manage state for several components such as the team selector on the event page and our user tables. We also used React Hooks and the Apollo store for other cases like menus and event user maps.

#### Unit 3: MongoDB
All our data is stored on MongoDB. We have seven different collections of documents to manage our complex data schema. Instead of using a RESTful API though, we opted to use GraphQL to help with scalability and performance.

#### Unit 4: Node and Express
Our backend is also written completely in TypeScript. We used NodeJS to help handle connections and Express as the framework. We also had to use other packages like TypeGraphQL and Typegoose to make use of Typescript decorators to define both our GraphQL types, queries, mutations and the MongoDB schema.

#### Unit 5: Release Engineering
Our GraphQL server is actually deployed to Heroku. Our app, however, is built on NextJS, and consequently, we deployed it on Vercel instead. Vercel is primarily built for NextJS apps and is dedicated to support server-side rendering, which is why we opted to use NextJS in the first place.

#

## Above and Beyond functionality
For one, instead of building a simple React app and only using what we learned in class, we wanted to challenge ourselves by aiming for a significantly more production-ready app. We wrote our entire app, both the front and back-end in Typescript, and also used a GraphQL server for requests. When combining both TypeScript and GraphQL, we can leverage the benefits of having a client-driven api, static typing, and the ability to avoid under and over-fetching issues. 

Secondly, we wanted to develop our app on NextJS. NextJS is a framework that that supports pre-rendering. Instead of having the browser render everything from scratch, Next.js can serve pre-rendered HTML. The benefit of this is that our site should appear fast as possible to not only our users, but also to Google. Our site essentially becomes more search engine friendly. As well, NextJS provides true code splitting. Each route is considered a unique entry point into the app and only loads the dependencies that are needed on that route. So theoretically, if we were to demo our teampage on a slow 3g network, only 10 public posts along with team info would be preloaded. Other features such as likes, comments, and the pin toggle would be loaded after the user has been authenticated.

Security and authentication is another challenge we tackled head-on with our registration and login page. None of our passwords are stored in plain-text, and instead hashed using Bcrypt. We have both front and back-end validation checks on things like email type and password length. We store json web tokens in a cookie and authentication header. Different users, depending on their priviledge, have access to different features. We don't simply hide certain components; we have authentication middleware to guard the database.

#

## Next Steps...?

We are happy with our final product, but we do acknowledge that we can definitely build upon it. Some ideas would maybe include a recruiting portal where you could search for players or even list your team as being open to new members. We could add google maps integration to our locations. As well, the option to add statistics so users can record scores for games and even add individual stats would be a great feature to have. The possibilities are almost endless, but we are really happy with the final product we accomplished in this much time. 

#

## Individual Contributions

#### Geordie Parappilly
- developed and helped add to several front-end components including the majority of the event page, the front page, and several of the card items used on the profile and team page
- contributed heavily to the visual design of the app - aligning content, prettying up features, and creating custom Material-UI components
- helped with testing, cleaning up code, and removing unneccesary inputs

#### Collin Eng
- organized most meetings and created timelines for project production
- helped with cleaning up code, adding finishing touches and stylistic tweaks to components

#### William Ji
- Contributed to the visual design throughout the project, including early prototypes, layouts and component appearances.
- Developed various front-end features and integrated them into pages, including editing and displaying personal profile, sending and showing team posts and searching teams, etc.
- Achieved Cloudinary image management library intergration.
- Implemented several back-end resolvers mainly for handling post and comment requests.

#

## Screenshots
![Personal Home page](public/sporty1.jpg?raw=true)
![Team Home Page](public/sporty2.jpg?raw=true)
![Calendar Page](public/sporty3.jpg?raw=true)
![Team Search Page](public/sporty4.jpg?raw=true)
![Team Page](public/TeamPage.PNG?raw=true)

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
