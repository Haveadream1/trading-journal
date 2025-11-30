import MainHeading from "../components/MainHeading";
import TableRow from "../components/TableRow";
import Header from "../components/Header";
import { useForm } from "../data/FormContext";
import { useEffect } from "react";

export default function JournalPage() {
    const {tradeHistory, formData} = useForm();

    // useEffect(() => {
    //     console.log(tradeHistory, formData);
    // }, [tradeHistory, formData]);

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
                        {/* // For now use the data stored in the context before switching to SQL and Node.js */}
                        {tradeHistory.length > 0 ? (
                            tradeHistory.map((trade, index) =>  
                                <TableRow
                                    key={index}
                                    date={trade["trade-outcome"]["trade-date"]}
                                    asset={trade["trade-details"]["asset-symbol"]}
                                    direction={trade["trade-details"]["direction-select"]}
                                    outcome={trade["trade-outcome"]["outcome-select"]}
                                    pnl={trade["trade-outcome"]["net-pnl"]}
                                />
                            )
                        ):(
                            <tr>
                                <td>No saved trades yet</td>
                                {/* or TODO: display some default trades for ie  */}
                            </tr>
                        )}
                    </tbody>
                </table>

                <a href="/tradeForm" className="add-new-trade-button" aria-label="Add a new trade">
                    <span className="material-symbols-outlined">add_2</span>
                </a>
            </main>
        </>
    );
}
