import MainHeading from "../components/MainHeading";

export default function JournalPage() {
    return (
        <main className="journal-page">
            <MainHeading 
                titleValue="Trade journal"
                text="A complete history of your recent trades"
            />

            <table>
                <thead>
                    <tr className="table-heading-row">
                        <th>Date</th>
                        <th>Asset</th>
                        <th>Direction</th>
                        <th>Outcome</th>
                        <th>Net P/L</th>
                    </tr>
                </thead>

                <tbody>
                    <tr className="table-values-row">
                        <td className="table-date-value">24/05/2025</td>
                        <td className="table-asset-value">BTC / USD</td>
                        <td className="table-direction-value">BUY</td>
                        <td className="table-outcome-value">
                            <span className="outcome-span-win">Win</span>
                        </td>
                        <td className="table-pnl-value">
                            <span className="pnl-span-win">+2,505.20$</span>
                        </td>
                    </tr>

                    <tr className="table-values-row">
                        <td className="table-date-value">25/05/2025</td>
                        <td className="table-asset-value">ETH / USD</td>
                        <td className="table-direction-value">SELL</td>
                        <td className="table-outcome-value">
                            <span className="outcome-span-loss">Loss</span>
                        </td>
                        <td className="table-pnl-value">
                            <span className="pnl-span-loss">-1,204.05$</span>
                        </td>
                    </tr>
                </tbody>
            </table>

            <button type="button" className="add-new-trade-button">
                <span className="material-symbols-outlined" alt="Add a new trade icon" aria-label="Add a new trade" loading="lazy">add_2</span>
            </button>
        </main>
    );
}