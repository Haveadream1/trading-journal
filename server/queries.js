// Module used to separate concern in server.js
    // Contains the PostgreSQL queries

const statisticsQueries = {
    baseQuery = `
      SELECT  
        COUNT(*) as total_trades,
        SUM(net_pnl) as total_pnl,
        AVG(CASE WHEN outcome = 'Win' THEN net_pnl END) as avg_win,
        AVG(CASE WHEN outcome = 'loss' THEN net_pnl END) as avg_loss,
        MAX(CASE WHEN outcome = 'Win' THEN net_pnl END) as biggest_win,
        MIN(CASE WHEN outcome = 'loss' THEN net_pnl END) as biggest_loss,
        COUNT(CASE WHEN outcome = 'Win' THEN 1 END) as nbr_wins,
        COUNT(CASE WHEN outcome = 'loss' THEN 1 END) as nbr_losses,
        SUM(CASE WHEN outcome = 'Win' THEN net_pnl END) as total_winning_pnl,
        SUM(CASE WHEN outcome = 'loss' THEN net_pnl END) as total_losing_pnl
      FROM trades
      HAVING COUNT(*) > 0;
    `,

    weekly = `
      SELECT 
        SUM(net_pnl) as weekly_pnl
      FROM trades
      WHERE trade_date >= CURRENT_DATE - INTERVAL '7 days';
    `,

    mostTraded = `
      SELECT
        asset, COUNT(*) as trade_count
      FROM trades
      GROUP BY asset
      ORDER BY trade_count DESC
      LIMIT 1;
    `,

    // Sum trades where the date is the same
    orderedTradeList = `
      SELECT 
        COUNT(*) as trade_count,
        trade_date,
        SUM(net_pnl) as net_pnl
      FROM trades
      GROUP BY trade_date
      ORDER BY trade_date ASC;
    `
};
export default statisticsQueries;