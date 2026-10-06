# 📊 Trading journal
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=flat&logo=postgresql&logoColor=white)
![Express](https://img.shields.io/badge/Express-yellow?style=flat&logo=express)
![React](https://img.shields.io/badge/React-black?logo=react)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=nodedotjs&logoColor=white)

A full-stack web application designed to record trades, visualize performance analytics, and deliver market news. The goal is to provide a complete, free alternative to paid trading journals, helping traders to enhance their performance through data-driven decisions.

🔗 **[Live Demo](https://trading-journal-2jli.vercel.app/)**

## Table of contents
- [Overview](#-overview)
- [Features](#-features)
- [Tech stack](#️-tech-stack)
- [Getting started](#-getting-started)
- [Testing](#-testing)
- [Project structure](#-project-structure)
- [API documentation](#-api-documentation)
- [Aggregated queries & Metrics](#-aggregated-queries--metrics)
- [Future enhancements](#-future-enhancements)
- [Credits](#-credits)

## 📝 Overview
The web application is composed of 3 core pages:
1. **Dashboard**: Displays the main analytics data as well as fetched links to financial articles.
2. **Journal**: A chronological, data table of all recorded trades.
3. **Statistics**: Composed of graphical representations (via Recharts) and deep-dive performance metrics.

<img width="1784" height="991" alt="PagesGif" src="https://github.com/user-attachments/assets/4b9aea76-9d2b-49e5-ba06-4087640033b1" />

## ✨ Features
- 📈 **Data Visualization**: Interactive charts and graphical interpretation of trading data.
- 🔄 **Full CRUD Operations**: 
  - **C**reate new trades via an intuitive form.
  - **R**ead trades in a dynamically sorted table.
  - **U**pdate existing trade records.
  - **D**elete trades seamlessly.
- 👤 **Profile Management**: Create and update personal trader information.
- 📰 **Market Insights**: Integrated feed of recent financial articles impacting current markets.

<img width="1785" height="963" alt="ActionsGif" src="https://github.com/user-attachments/assets/c962e99c-6851-432b-94d1-b15f5cea6703" />

## 🛠️ Tech stack
PERN stack consisting of PostgreSQL, Express.js, React and Node.js

| Category | Technologies & Tools |
|---|---|
| **Frontend** | React, Vite, Recharts, React Testing Library |
| **Backend** | Node.js, Express.js, Jest, Supertest |
| **Database** | PostgreSQL (Hosted on [Neon](https://neon.com/)) 
| **Deployment** | Frontend: [Vercel](https://vercel.com/) / Backend: [Render](https://render.com/) |
| **Design** | [Figma](https://www.figma.com/) for UI/UX mockups | 

## 🚀 Getting started
### Prerequisites
Ensure you have the following installed on your local machine:
- [Node.js](https://nodejs.org/en/download) ≥ v24.x.x    
- [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) ≥ 11.x.x    
- A [Neon PostgreSQL](https://neon.com/) database instance

### Installation guide
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

## 🧪 Testing
The project has both testing for backend and frontend.    
By running the following commands, all test suites will run.    
(*A possible alternative is to run each test individually*)    

1. Navigate to the project directory
    * `cd trading-journal`
2. Run all tests (frontend + backend) with the custom command
    * `npm run test`

## 📂 Project structure 
```
trading-journal/      
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

## 📚 API documentation
| Endpoint | Method | Description |
| --- | --- | --- |
| `/api/trades` | `POST` | Create a new trade |
| `/api/trades` | `GET` | Retrieve all trade records |
| `/api/trades/:id` |  `PUT`| Update a specific trade by ID|
| `/api/trades/:id` | `DELETE` | Delete a specific trade by ID |
| `/api/statistics` |  `GET`| Retrieve aggregated performance data |
| `/api/articles` | `GET` | Fetch recent financial news articles |

## 📡 Aggregated queries & Metrics
The `/api/statistics` endpoint computes the following aggregated metrics directly via database queries:

| Metric | Description |
| --- | --- |
| `total_trades` | Total count of all recorded trades |
| `total_pnl` | Sum of all `net_pnl` values |
| `avg_win` / `avg_loss` | Average profit of winning trades / Average loss of losing trades |
| `biggest_win` / `biggest_loss` | Maximum `net_pnl` of a winning trade / Minimum `net_pnl` of a losing trade |
| `nbr_wins` / `nbr_loss` | Total count of winning / losing trades |
| `total_winning_pnl` / `total_losing_pnl` | Sum of PnL for winning / losing trades |
| `win_rate` | `(Number of wins / Total trades) * 100` |
| `profit_factor` | `Total winning PnL / Total losing PnL` (absolute value) |
| `weekly_pnl` | Sum of `net_pnl` over a span of 7 days |
| `most_traded_asset` | The asset symbol with the highest trade frequency |
| `most_traded_asset_count` | Number of trades executed for the most traded asset |
| `trades` | The list of all sorted trades by date |

## 🚧 Future Enhancements
* Enable user to import a profile picture
* Allow import of trades from broker export files

## ✅ Credits
**UI/UX & Assets**: [Figma](https://www.figma.com), [Icons](https://icons.download/) <br>
**Infrastructure**: [Vercel](https://vercel.com/) , [Render](https://render.com/) , [Neon](https://neon.com/) <br>
**Data**: [FMP api](https://site.financialmodelingprep.com/)  <br>
**Badges & Emojis**: [Icons for badges](https://simpleicons.org/), [ShieldsIo](https://shields.io/), [Emojis Repo](https://gist.github.com/rxaviers/7360908)  
