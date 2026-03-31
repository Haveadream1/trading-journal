# trading-journal

## Project milestones
Make a style mockup
Pseudo code each html pages
Style the pages
Create react components and containers
Split each containers in new needed components
Set up the router for navigation
Split style into modules
Create a dataContext to handle the form
(Temporary) Store submitted data in the data context
(Temporary) Display stored data from context
Add form verifications
Add conditional form submit
Install recharts library
Setup the charts with example data
Setup the cell with example data
Create a data context for latest articles
Fetch Data and display it
Create a branch feature/backend to work safely on the backend
Create a server directory to separate the front and backend
Init package json
Install express to the server
Install PostgreSQL (RDBMS)
Creating the project in Neon (open-source serverless based PostgreSQL DBMS)
  * Allow us to avoid hosting the database in our computer and easier to deploy later
Fetch the connection string
Create a environment file in our server directory
Define a constant and assign to it our connection string
Specify the env file in our gitignore file to protect it from being seeing by others
Define the data schema in Neon
  * Specify attributes and conditions
Create a file to easily access the data schema of our database
Install dotenv
  * to be able to securely fetch env variables
Install cors
  * to allow React to interact with express with ports

## To-do
<!-- TODO: remove the loading lazy of the span el and pass the aria to the a el -->
<!-- TODO: Heading elements are not in a sequentially-descending order h1 - h2, currently h1-h3 -->
<!-- TODO: render a lightHouse -->
<!-- TODO: make sure all internal link are using LINK of the react router -->
<!-- TODO: Don't forget to add assigned width and height to image to improve performance -->
<!-- TODO: Place the website icon into the "assets" directory and remove "react.svg" -->
<!-- Do something for the profile icon, it currently redirects to nothing --> 
<!-- TODO: When we fetch data from the database, create conditional rendering for when we don't have data yet -> loading
Or when the database is empty then display a message -->
<!-- TODO: use the primary key value as a key attribute when we map through the data  -->
<!-- TODO: add defaultProps if needed -->
<!-- TODO: when we use useEffect, check if we need a clean up function -->
<!-- TODO: check if the use of useEffect is necessary to avoid performance issues 
Not to use to transform data when rendering or not to handle user events-->
<!-- TODO: add errorPage in router -->
<!-- TODO: create a graph to visualize the database -->
<!-- TODO: render formatting and linter tool (Prettier, ESlint) -->
  <!-- SUB-TODO: check all double or single quotes -->

<!-- CHECK: if I can remove the pushed node_modules from the cache, because it's not supposed to be pushed, but placed in .gitignore-->

## Project ideas
Ideas:
* maybe do an API call to retrieve common assets and display it like a search bar in the input

## README structure
Include stack used
Short summary and presentation of the project/website
Sub-points to explain the different features
Personal self-reflection (things that I learn, tested, feeling and motivation, ....)
Create a small documentation step by steps to clone the repo
Deployment link
Add screenshots of the projects
Credits (image, icons, graphs provider, etc...)
License ? Need to check