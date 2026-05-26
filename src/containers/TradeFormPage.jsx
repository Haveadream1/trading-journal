/* Style import */
import '../styles/TradeFormStyle.css'

import FieldsetDiv from "../components/FieldsetDiv";
import MainHeading from "../components/MainHeading";
import { useForm } from "../context/FormContext";
import { Link, Navigate, useNavigate } from "react-router";
import { useStatistics } from '../context/StatisticsContext';
import { useState } from 'react';
import { useActions } from '../context/ActionsContext';

export default function TradeFormPage() {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const navigate = useNavigate();
    const { formData, isTradeUpdated, setIsTradeUpdated, updateTradeId, validity, submitTrade, selectedUpdateTrade } = useForm();
    const { refreshStatistics } = useStatistics();
    const { updateTrade } = useActions();

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

        // Avoid duplicates trades for the same submit
        if(isSubmitting) return;
        // Otherwise, disable submit button
        setIsSubmitting(true);

        try {
            // Validity check for all inputs before sending data to API
            for (let i in validity) {
                if (!validity[i]) {
                    console.error("Some inputs are still invalid !");
                    setIsSubmitting(false);
                    return;
                }
            }
            setIsTradeUpdated(false);

            let convertedPnl = convertPnl(formData['trade-outcome']['outcome-select'], parseFloat(formData['trade-outcome']['net-pnl']));
            const formattedData = {
                trade_date: formData['trade-outcome']['trade-date'],
                asset: formData['trade-details']['asset-symbol'],
                direction: formData['trade-details']['direction-select'],
                outcome: formData['trade-outcome']['outcome-select'],
                net_pnl: convertedPnl,
            }

            let isOperationSuccessful;
            // Depending on the state set by the update button we either UPDATE or SUBMIT the trade
            if (isTradeUpdated) {
                isOperationSuccessful = await updateTrade(updateTradeId, formattedData);
            } else {
                isOperationSuccessful = await submitTrade(formattedData);
            }

            if (isOperationSuccessful) {
                await refreshStatistics(); // pause process to modify the trigger value, leads to refresh pages

                navigate("/journal"); // Redirect to journal page
            } else {
                console.error("Failed to conduct the operation on the trade");
                setIsSubmitting(false);
            }
        } catch (error) {
            console.error("Error while trying to submit the form", error.message);
            setIsSubmitting(false);
        }
    };

    const formatFetchedDefaultDate = (dateStored) => {
        return dateStored.slice(0, 10);
    }

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
                        // Display either the data of the selected trade to update or the default
                        placeholder={selectedUpdateTrade?.asset || "GBP/USD"}
                        ariaLabel="Asset symbol datalist"
                    />
                    <FieldsetDiv
                        id="direction-select"
                        label="Direction"
                        type="select"
                        ariaLabel="Directions select"
                        select="true"
                        defaultValue={selectedUpdateTrade?.direction || "Buy (Long)"}
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
                        defaultValue={selectedUpdateTrade?.trade_date ? formatFetchedDefaultDate(selectedUpdateTrade.trade_date) : ""}
                        ariaLabel="Trade date input"
                    />
                    <FieldsetDiv
                        id="outcome-select"
                        label="Outcome"
                        type="select"
                        ariaLabel="Outcomes select"
                        select="true"
                        defaultValue={selectedUpdateTrade?.outcome || "Win"}
                        options={outcomeOptions}
                    />
                    <FieldsetDiv 
                        id="net-pnl"
                        label="Net PnL"    
                        type="number"
                        step="0.01"
                        placeholder={selectedUpdateTrade?.net_pnl || 250.51}
                        input="true"
                        ariaLabel="Net PnL input"
                    />
                </fieldset>

                <div className="form-buttons-container">
                    <button disabled={isSubmitting} className="save-button" type="submit" aria-label="Submit form">
                        {isSubmitting ? (
                            "Saving...."
                        ):(
                            "Save Trade"
                        )}
                    </button>
                    {!isSubmitting ? (
                        <Link to="/journal" className="cancel-button" aria-label="Cancel form">Cancel</Link>
                    ):(
                        <></>
                    )}
                </div>
            </form>
        </main>
    );
}