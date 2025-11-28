import FieldsetDiv from "../components/FieldsetDiv";
import MainHeading from "../components/MainHeading";

export default function TradeFormPage() {
    const directionOptions = [ // Passing an array of objects is easier than each values separately
        {value: "buy", text: "Buy (Long)"},
        {value: "sell", text: "Sell (Short)"},
    ]
    
    const outcomeOptions = [
        {value: "win", text: "Win"},
        {value: "loss", text: "Loss"},
    ]

    return (
        <main className="trade-form-page">
            <MainHeading 
                titleValue="Log a new trade"
                text="Enter the details of your trade to save it in the journal"
            />

            <form action="post">
                <fieldset aria-labelledby="trade-details-legend">
                    <legend id="trade-details-legend">Trade details</legend>
                    <FieldsetDiv 
                        id="asset-symbol"
                        label="Asset"    
                        type="text"
                        placeholder="BTC/USD"
                        ariaLabel="Asset symbol input"
                    />
                    <FieldsetDiv
                        id="direction-select"
                        label="Direction"
                        type="select"
                        ariaLabel="Directions select"
                        options={directionOptions}
                    />
                </fieldset>

                <fieldset aria-labelledby="trade-outcome-legend">
                    <legend id="trade-outcome-legend">Trade outcome</legend>
                    <FieldsetDiv 
                        id="trade-date"
                        label="Date"    
                        type="date"
                        ariaLabel="Trade date input"
                    />
                    <FieldsetDiv
                        id="outcome-select"
                        label="Outcome"
                        type="select"
                        ariaLabel="Outcomes select"
                        options={outcomeOptions}
                    />
                    <FieldsetDiv 
                        id="net-pnl"
                        label="Net P/L"    
                        type="number"
                        placeholder="2500.51"
                        ariaLabel="Net P/L input"
                    />
                </fieldset>

                <div className="form-buttons-container">
                    <button className="save-button" type="submit" aria-label="Submit form">Save Trade</button>
                    <a href="/journal" className="cancel-button" aria-label="Cancel form">Cancel</a>
                </div>
            </form>
        </main>
    );
}