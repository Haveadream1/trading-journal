// Demonstration trades used when the database table is empty

export const getDemoTradeList = () => [
    {
        trade_date: '2026-04-15',
        trade_count: 1,
        net_pnl: 425.00
    },
    {
        trade_date: '2026-04-17',
        trade_count: 1,
        net_pnl: -150.25
    },
    {
        trade_date: '2026-04-20',
        trade_count: 2,
        net_pnl: 825.50
    },
];

export const getDemoStatistics = () => ({
    totalTrades: 4,
    totalPnl: 1250.50,
    avgWin: 425.00,
    avgLoss: 150.25,
    biggestWin: 850.00,
    biggestLoss: 200.00,
    nbrWins: 3,
    nbr_losses: 1,
    totalWinningPnl: 1275.00,
    totalLosingPnl: 150.25,
    winRate: 75.00,
    profitFactor: 8.48,
    weeklyPnl: 1250.50,
    mostTradedAsset: 'AUD/USD',
    mostTradedAssetCount: 2,
    tradeList: getDemoTradeList()
});
