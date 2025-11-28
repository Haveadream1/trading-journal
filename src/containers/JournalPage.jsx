import MainHeading from "../components/MainHeading";
import TableRow from "../components/TableRow";
import Header from "../components/Header";

export default function JournalPage() {
    return (
        <>
            <Header />
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
                        <TableRow
                            date="24/05/2025"
                            asset="BTC / USD"
                            direction="BUY"
                            outcome="Win"
                            pnl="+2,505.20$"
                        />
                        <TableRow
                            date="25/05/2025"
                            asset="ETH / USD"
                            direction="SELL"
                            outcome="Loss"
                            pnl="-1,204.05$"
                        />
                    </tbody>
                </table>

                <button type="button" className="add-new-trade-button">
                    <span className="material-symbols-outlined" alt="Add a new trade icon" aria-label="Add a new trade" loading="lazy">add_2</span>
                </button>
            </main>
        </>
    );
}