# Trading journal :bar_chart:
![Static Badge](https://img.shields.io/badge/PostgreSQL-white?logo=postgresql&logoColor=blue&labelColor=white&color=blue)
![Static Badge](https://img.shields.io/badge/Express-yellow?style=flat&logo=express&labelColor=w)
![Static Badge](https://img.shields.io/badge/React-black?logo=react)
![Static Badge](https://img.shields.io/badge/Node.js-%235FA04E?style=flat&logo=nodedotjs&labelColor=white)

This coding project is used to record trades and display related statistics.    
The goal is to provide a simple but complete journal that will help enhance personal performance without any paid membership !

## Project description :clipboard:
The web application is composed of 3 main pages:
* Dashboard
    * Displays the main analytics data as well as fetched links to financial articles
* Journal
    * Is composed of a table populated by trades ordered by date
* Statistics
    * Render a graphical representation of data as well as more complex statistics

<img width="1784" height="991" alt="PagesGif" src="https://github.com/user-attachments/assets/4b9aea76-9d2b-49e5-ba06-4087640033b1" />

## Live Demo :rocket:
[Discover the application](https://trading-journal-2jli.vercel.app/)

## Features :round_pushpin:
* Graphical representation and interpretation of data
* Implementation of CRUD operations
    * Create new trades with the form put at disposition
    * Read displayed trades in the table
    * Update trades
    * Delete trades
* Create and Update personal information in the profile
* Access recent financials articles that may affect the current market

<img width="1785" height="963" alt="ActionsGif" src="https://github.com/user-attachments/assets/c962e99c-6851-432b-94d1-b15f5cea6703" />

## Technology stack and tools :mortar_board:
PERN stack consisting of PostgreSQL, Express.js, React and Node.js

* Backend testing: Jest and Supertest
* Frontend testing: Jest and React testing library
* Database hosting: Neon
* Graph library: Recharts
* Frontend build tool: Vite
* Design mockup: Figma
* Frontend deployment: Vercel
* Backend deployment: Render

## Installation :arrow_forward:
### Prerequisites :triangular_flag_on_post:
[Node.js](https://nodejs.org/en/download) ≥ v24.x.x    
[npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) ≥ 11.x.x    
[A Neon database created](https://neon.com/)

### Installation guide :wrench:
1. Clone the repository from Github:
    * `git clone https://github.com/Haveadream1/trading-journal.git`
    * `cd trading-journal`
2. Install backend dependencies:
    * `cd server`
    * `npm install`
3. Install frontend dependencies:
    * `cd ..`
    * `npm install`
4. Add environment variables:
    * Following the `.env.example` file, copy a `.env` file and add required variables
    * `cp server/.env.example server/.env`
5. Start backend server:
    * `cd server`
    * `node server.js`
6. Start Vite development server:
    * Create a new terminal _(to not kill the process in server)_
    * `cd trading-journal`
    * `npm run dev`
7. Open the browser:
    * Navigate to `http://localhost:5173`

## Testing guide :scissors:
The project has both testing for backend and frontend.    
By running the following commands, all test suites will run.    
(*A possible alternative is to run each test individually*)    

1. Navigate to the project directory
    * `cd trading-journal`
2. Run all tests (frontend + backend) with the custom command
    * `npm run test`

## Project structure :open_file_folder:
```
trading-journal/    
├── archive/    
├── public/     
├── server/    
│   ├── __tests__/    
│   └── routes/    
├── src/    
│   ├── __tests__/     
│   ├── assets/     
│   ├── components/      
│   ├── containers/    
│   ├── context/    
│   ├── data/    
│   ├── hooks/    
│   └── styles/     
└── README.md
```

## API documentation :closed_book:
Different methods have been implemented for the routes
1. /api/trades
   * POST: create a new trade
   * GET: request and retrieve all trades
   * PUT: update the trade specified by id
   * DELETE: delete the trade specified by id
2. /api/statistics
   * GET: request and retrieve aggregated data
3. /api/articles
   * GET: fetch financial news

## Aggregated queries documentation :bookmark_tabs:
Here is a list of most of the statisticals columns created with queries for the different routes:
* total_trades: count all trades
* total_pnl: sum all net_pnl
* avg_win: sum of all winning trades / number of winning trades or by using avg
* avg_loss: sum of all losing trades / number of losing trades or by using avg
* biggest_win: max of net_pnl when winning
* biggest_loss: min of net_pnl when losing
* nbr_wins: count the number of winning trades
* nbr_losses: count the number of losing trades
* total_winning_pnl: sum of winning pnl
* total_losing_pnl: sum of losing pnl
* win_rate: (number of wins / numbers of trades) * 100
* profit_factor: total winning net_pnl / total losing net_pnl
* weekly_pnl: sum of the net_pnl over a span of 7 days
* most_traded_asset: asset that appears the most
* most_traded_asset_count: number of trades for most traded asset
* trades: the list of all sorted trades by date

## To-dos :rotating_light:
* Enable user to import a profile picture
* Implement scalable fonts

## Credits :white_check_mark:
[Emojis](https://gist.github.com/rxaviers/7360908)      
[Icons for badges](https://simpleicons.org/)    
[Bagdes](https://shields.io/)    
[Vercel](https://vercel.com/)    
[Render](https://render.com/)     
[Neon](https://neon.com/)    
[Figma](https://www.figma.com)     
[Icons](https://icons.download/)    
[FMP api](https://site.financialmodelingprep.com/)     
