/* Style import */
import '../styles/TradeFormStyle.css'

import FieldsetDiv from "../components/FieldsetDiv";
import MainHeading from "../components/MainHeading";
import { useForm } from "../data/FormContext";
import { Link, Navigate, useNavigate } from "react-router";
import { useStatistics } from '../data/StatisticsContext';

export default function TradeFormPage() {
    const navigate = useNavigate();
    const {formData, pushTradeToHistory, validity} = useForm();
    const { refreshStatistics } = useStatistics();

    // List of top 5 stocks, forex, commodities, crypto,
    const assetOptions = [
        "NVDA", "APPL", "AMZN", "TSLA", "GOOGL",
        "EUR/USD", "USD/JPY", "GBP/USD", "USD/CHF", "AUD/USD",
        "CL", "GC", "HG", "SL", "KC",
        "BTC", "ETH", "USDT", "BNB", "USD coin",
    ]

    // Passing an array of objects is easier than each values separately
    const directionOptions = [
        {value: "buy", text: "Buy (Long)"},
        {value: "sell", text: "Sell (Short)"},
    ]
    
    const outcomeOptions = [
        {value: "win", text: "Win"},
        {value: "loss", text: "Loss"},
    ]

    const convertPnl = (outcome, pnl) => {
        // We already verified in the form validation, that all pnl are positive
            // We need to handle only the case when outcome is set to 'loss'
        if (outcome === 'loss') {
            return -pnl;
        } else {
            return pnl;
        }
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        // Validity check for all inputs before sending data to API
        for (let i in validity) {
            if (!validity[i]) {
                console.error("Some inputs are still invalid !");
                return;
            }
        }

        let convertedPnl = convertPnl(formData['trade-outcome']['outcome-select'], parseFloat(formData['trade-outcome']['net-pnl']));

        try {
            // Format data and assign them to the same name as the database columns
            const formattedData = {
                trade_date: formData['trade-outcome']['trade-date'],
                asset: formData['trade-details']['asset-symbol'],
                direction: formData['trade-details']['direction-select'],
                outcome: formData['trade-outcome']['outcome-select'],
                net_pnl: convertedPnl,
            }
            
            // Send the form data to API to save it in the database
            const response = await fetch('/api/trades', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json' // Metadata affilied to request to indicate the data type to server
                },
                body: JSON.stringify(formattedData) // Send form values as JSON
            });

            const data = await response.json(); // Parse the JSON response from server

            if (response.ok) {
                pushTradeToHistory(data); // Store the submitted trade
                console.log("Successfully saved the trade:", data);

                await refreshStatistics(); // pause process to modify the trigger value, leads to refresh pages

                navigate("/journal"); // Redirect to journal page
            } else {
                console.error("Failed to save the trade", data.error);
            }
        } catch (err) {
            console.error("Error submitting the trade", err.message);
        }
    };

    // Debugging purpose
    // useEffect(() => {
    //     console.log(tradeHistory);
    // }, [tradeHistory])

    return (
        <main className="trade-form-page">
            <MainHeading 
                titleValue="Log a new trade"
                text="Enter the details of your trade to save it in the journal"
            />

            <form action="post" onSubmit={handleFormSubmit}>
                <fieldset id="trade-details" aria-labelledby="trade-details-legend">
                    <legend id="trade-details-legend">Trade details</legend>
                    <FieldsetDiv 
                        id="asset-symbol"
                        listId="assets"
                        label="Asset"
                        input="true"
                        datalist="true"
                        options={assetOptions}
                        placeholder="GBP/USD"
                        ariaLabel="Asset symbol datalist"
                    />
                    <FieldsetDiv
                        id="direction-select"
                        label="Direction"
                        type="select"
                        ariaLabel="Directions select"
                        select="true"
                        options={directionOptions}
                    />
                </fieldset>

                <fieldset id="trade-outcome" aria-labelledby="trade-outcome-legend">
                    <legend id="trade-outcome-legend">Trade outcome</legend>
                    <FieldsetDiv 
                        id="trade-date"
                        label="Date"
                        type="date"
                        input="true"
                        ariaLabel="Trade date input"
                    />
                    <FieldsetDiv
                        id="outcome-select"
                        label="Outcome"
                        type="select"
                        ariaLabel="Outcomes select"
                        select="true"
                        options={outcomeOptions}
                    />
                    <FieldsetDiv 
                        id="net-pnl"
                        label="Net PnL"    
                        type="number"
                        placeholder="2500.51"
                        input="true"
                        ariaLabel="Net PnL input"
                    />
                </fieldset>

                <div className="form-buttons-container">
                    <button className="save-button" type="submit" aria-label="Submit form">Save Trade</button>
                    <Link to="/journal" className="cancel-button" aria-label="Cancel form">Cancel</Link>
                </div>
            </form>
        </main>
    );
}