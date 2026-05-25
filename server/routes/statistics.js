const express = require('express');
const router = express.Router();
const pool = require('../database');

const statisticsQueries = require('../queries');

const formatData = (type, value) => {
  const num = Number(value) // Avoid error with JS about retrieved type from PostgreSQL
  if (type === 'int') {
    return parseInt(num);
  } else {
    return parseFloat(num.toFixed(2));
  }
}

// Set up GET route to fetch statistics data computed
router.get('/', async (req, res) => {
  // Handle the case when no trades are stored yet
  const totalResult = await pool.query(`SELECT COUNT(*) as total FROM trades`);
  const totalTrades = formatData('int', totalResult.rows[0].total);

  if (totalTrades === 0) {
    return res.json({
      totalTrades: 0
    });
  }

  try {
    // Enabled to run multiple asynchronous query in parallel
    const [baseResult, weeklyResult, mostTradedResult, orderedTradeListResult] = await Promise.all([
      pool.query(statisticsQueries.base),
      pool.query(statisticsQueries.weekly),
      pool.query(statisticsQueries.mostTraded),
      pool.query(statisticsQueries.orderedTradeList)
    ]);

    // aggregate function only return one row
    const baseRow = baseResult.rows[0];
    const weeklyRow = weeklyResult.rows[0]
    const mostTradedRow = mostTradedResult.rows[0];
    const orderedTradeListRow = orderedTradeListResult.rows;

    // format the JSON to be sent for easier access later
    res.json({
      totalTrades: formatData('int', baseRow.total_trades),
      totalPnl: formatData('float', baseRow.total_pnl),
      avgWin: formatData('float', baseRow.avg_win),
      avgLoss: formatData('float', baseRow.avg_loss),
      biggestWin: formatData('float', baseRow.biggest_win),
      biggestLoss: formatData('float',baseRow.biggest_loss),
      nbrWins: formatData('int', baseRow.nbr_wins),
      nbr_losses: formatData('int',baseRow.nbr_losses),
      totalWinningPnl: formatData('float', baseRow.total_winning_pnl),
      totalLosingPnl: formatData('float', baseRow.total_losing_pnl),
      winRate: formatData('float', (baseRow.nbr_wins / baseRow.total_trades) * 100),
      profitFactor: formatData('float', baseRow.total_winning_pnl / Math.abs(baseRow.total_losing_pnl)), // get the absolute value for losing pnl

      weeklyPnl: formatData('float', weeklyRow.weekly_pnl),

      mostTradedAsset: mostTradedRow.asset, // string
      mostTradedAssetCount: formatData('int', mostTradedRow.trade_count),

      tradeList: orderedTradeListRow
    });

  } catch (err) {
    console.error('Failed to fetch aggregate data', err.message);
    res.status(500).json({ error: 'Error with aggregate functions in database'});
  }
})

module.exports = router;