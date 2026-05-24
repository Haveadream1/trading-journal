# Trading journal
A web application used to record trades and display related statistics

## Project description
The platform is composed of 3 main pages:
* Dashboard
* Journal
* Statistics
!TODO: Add screenshots 

!TODO: Add gif of responsivenes

1. The dashboard page displays the main analytics data as well as fetched links to financial articles    
2. The journal page is composed of a table populated by trades ordered by date. On this same page it is possible to add a new trade by clicking on the + button, redirecting to a form with mandatory inputs    
3. The statistics page render a graphical representation of data as well as more complex statistics

## Live Demo
!LINK

## Features
!TODO: add gif of CRUD operations, user profile, api link, etc...

## Technology stack and tools
PERN stack consisting of PostgreSQL, Express.js, React and Node.js

* Backend testing: Jest and Supertest
* Frontend testing: Jest and React testing library
* Database hosting: Neon
* Graph library: Recharts
* Frontend build tool: Vite
* Design mockup: Figma

## Installation guide

## Testing guide

## Project structure
trading-journal/
├─ archive/
├─ public/
├─ server/
    ├── __tests__/
├─ src/
    ├── __tests__/
    ├── assets/
    ├── components/
    ├── containers/
    ├── data/
    ├── hooks/
    ├── styles/
│ README.md


## Queries documentation
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

## To-dos


## Credits
