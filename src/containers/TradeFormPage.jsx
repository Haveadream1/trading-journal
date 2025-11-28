import MainHeading from "../components/MainHeading";

export default function TradeFormPage() {
    return (
        <main className="trade-form-page">
            <MainHeading 
                h1="Log a new trade"
                text="Enter the details of your trade to save it in the journal"
            />

            <form action="post">
                <fieldset aria-labelledby="trade-details-legend">
                    <legend id="trade-details-legend">Trade details</legend>
                    
                    <div>
                        <label for="asset-symbol">Asset<span className="required">*</span></label>
                        <input type="text" name="asset-symbol" id="asset-symbol" placeholder="BTC/USD" aria-label="Asset symbol input" required />
                    </div>

                    <div>
                        <label for="direction-select">Direction<span className="required">*</span></label>

                        <select name="direction-select" id="direction-select" aria-label="Directions select" required>
                            <option value="Buy">Buy (Long)</option>
                            <option value="Sell">Sell (Short)</option>
                        </select>
                    </div>
                </fieldset>

                <fieldset aria-labelledby="trade-outcome-legend">
                    <legend id="trade-outcome-legend">Trade outcome</legend>

                    <div>
                        <label for="trade-date">Date<span className="required">*</span></label>
                        <input type="date" name="trade-date" id="trade-date" aria-label="Trade date input" required />
                    </div>

                    <div>
                        <label for="outcome-select">Outcome<span className="required">*</span></label>

                        <select name="outcome-select" id="outcome-select"  aria-label="Outcomes select" required>
                            <option value="Win">Win</option>
                            <option value="Loss">Loss</option>
                        </select>
                    </div>

                    <div>
                        <label for="net-pl">Net P/L<span className="required">*</span></label>
                        <input type="number" name="net-pnl" id="net-pnl" aria-label="Net P/L input" required />
                    </div>
                </fieldset>

                <div className="form-buttons-container">
                    <button className="save-button" type="submit" aria-label="Submit form">Save Trade</button>
                    <button className="cancel-button" type="button" aria-label="Cancel form">Cancel</button>
                </div>
            </form>
        </main>
    );
}