import React from "react";

// Icon imports
import editIcon from '../assets/EditTradeIcon.svg';
import deleteIcon from '../assets/DeleteTradeIcon.svg';

import { useActions } from "../data/ActionsContext";
import { useStatistics } from "../data/StatisticsContext";
import { useForm } from "../data/FormContext";
import { Link } from "react-router";

export default function TableRow({
    id,
    date,
    asset,
    direction,
    outcome,
    pnl,
    onTradeDeleted
}) {
    const { deleteTrade} = useActions();
    const { refreshStatistics } = useStatistics();
    const { setIsTradeUpdated, setUpdateTradeId } = useForm();

    const handleEditClick = () => {
        console.log("Trade edited with the following id: ", id);
        setIsTradeUpdated(true);
        setUpdateTradeId(id);
    }

    const handleDeleteClick = async () => {
        try {
            // Function return a boolean depending on success/failure
            const success =  await deleteTrade(id);

            if (success) {
                console.log("Trade deleted", id);

                // When trade is deleted function is called causing the refresh in the parent to run
                onTradeDeleted?.() // Optional function invocation, avoid to mock it for test
                refreshStatistics(); // Call to refresh statistics data
            } else {
                console.error("Failed to delete the trade");
            }
        } catch (error) {
            console.error("Error while deleting the trade", error.message);
        }
    }

    return (
        <tr className="table-values-row">
            <td className="table-date-value">{date}</td>
            <td className="table-asset-value">{asset}</td>
            <td className="table-direction-value">{direction}</td>
            
            {/* conditionaly render depending on the outcome of the trade */}
            <td className="table-outcome-value">
                {outcome === "loss" ? (
                    <span className="outcome-span-loss">Loss</span>
                ):(
                    <span className="outcome-span-win">Win</span>
                )}
            </td>
            <td className="table-pnl-value">
                {outcome === "loss" ? (
                    <span className="pnl-span-loss">{pnl} €</span>
                ):(
                    <span className="pnl-span-win">{pnl} €</span>
                )}
            </td>
            <td className="table-actions-buttons">
                <Link to={"/tradeForm"} className="edit-trade-btn" onClick={handleEditClick} aria-label="Edit trade values">
                    <img src={editIcon} id="edit-trade-icon" alt="Edit icon" />
                </Link>

                <button type="button" className="delete-trade-btn" onClick={handleDeleteClick} aria-label="Delete trade">
                    <img src={deleteIcon} id="delete-trade-icon" alt="Delete icon" />
                </button>
            </td>
        </tr>
    );
}