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
Create a .env file (environment) in our server directory
Define a constant and assign to it our connection string
Specify the env file in our gitignore file to protect it from being seeing by others
Define the data schema in Neon
  * Specify attributes and conditions
Create a file to easily access the data schema of our database
Install dotenv
  * to be able to securely fetch env variables
Install cors
  * to allow React to interact with express with ports
Create server.js file 
  * to initialize the express server
(Push to github due to change of pc operating system)
Import and set up middlewares in server file
Create a database file that will contain the connection pool
  * allow to reuse database connection (+ for performance)
  * test connection
  * run/start server with 'node server.js' command
Set up the routes
  * perform health check with /api/health
  * GET route
    * read, fetch data from the database (like all trades for ie)
  * POST route
    * insert data to the database
Configure vite.config to avoid CORS issues
  * by adding relative path, the browser will treat it as 'same-origin'
Refactor the form submit
  * store new trades in the database with the POST route
Refactor the display of trades
  * fetch stored trades from the database with the GET route
Create a route for analytics/dashboard
  * so we can easily fetch corresponding columns
  * define aggregate functions
  * perform js calculations on data that cannot be retrieved in database
Create a dataContext for analytics
  * enable to access shared data from the route on dashboard/analytics page
Each time creating a new route either GET/POST, test it with Postman
Fetch statistics data from context and display them on page
Fetch data, treat it and display in the corresponding metric section
Refactor and add fixes from the to-dos list
Separate server.js file into more meaningfull sections/files to improve code readability
  * create queries.js to store PostgreSQL queries
Import each styles into the page instead of importing everything inside the App.jsx
  * improve performance has it only loads the css needed 
Create an archive directory to keep the old html
  * the html file that was used to create the structure and provide for css before creating the React components
Handle when the database table is empty
  * display demo data
  * create a file, that contains examples trades
Create and error page
  * errorElement reference to it
  * redirect to homepage (dashboard)
Handle the refresh of the pages by adding a state
  * each time a new trade is added, we increment the value of the refresh
  * this will trigger a refresh of the pages, as the refresh value is listed in dependencies
Refactor articles API
  * get api key from env file
  * fetch from modules demo articles in case of failing fetch
Implement testing for backend
  * install Jest: testing framework
  * install Supertest: testing library to simulate HTTP request like GET/POST
  * both tools are used together for backend testing
  * What to test:
    * HTTP status 
    * data format


## To-do
<!-- TODO: Do something for the profile icon, it currently redirects to nothing --> 
<!-- TODO: create a graph to visualize the database -->
<!-- TODO: implement CRUD operations on trade -->
<!-- TODO: add testing ?>
<!-- TODO: component should be DUMB while container SMART>
<!-- TODO: check with tradeHistory if it should be displayed in case of no load -->

<!-- TODO: pass the aria to the a el -->
<!-- TODO: render a lightHouse -->
<!-- TODO: render formatting and linter tool (Prettier, ESlint) -->
  <!-- SUB-TODO: check all double or single quotes -->

<!-- TODO: limit the number of trades/data fetched for the graphic to see clear data>
<!-- TODO: differentiate in journal page when there is no data and when we wait for loading>

<!-- TODO: freeze the button while waiting for page redirection in trade form ?>
<!-- TODO: add a loading state after clicking on the save trade button>

## Queries documentation
// total_trades: count all trades
// total_pnl: sum all net_pnl
// avg_win: sum of all winning trades / number of winning trades or by using avg
// avg_loss: sum of all losing trades / number of losing trades or by using avg
// biggest_win: max of net_pnl when winning
// biggest_loss: min of net_pnl when losing
// nbr_wins: count the number of winning trades
// nbr_losses: count the number of losing trades
// total_winning_pnl: sum of winning pnl
// total_losing_pnl: sum of losing pnl
// win_rate: (number of wins / numbers of trades) * 100
// profit_factor: total winning net_pnl / total losing net_pnl
// weekly_pnl: sum of the net_pnl over a span of 7 days
// most_traded_asset: asset that appears the most
// most_traded_asset_count: number of trades for most traded asset

// trades: the list of all sorted trades by date

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