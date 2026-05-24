import React from "react";

// Icon imports
import editIcon from '../assets/EditTradeIcon.svg';
import deleteIcon from '../assets/DeleteTradeIcon.svg';

import { Link } from "react-router";
import { useTradeActions } from "../hooks/useTradeActions";

export default function TableRow({
    id,
    date,
    asset,
    direction,
    outcome,
    pnl,
    onTradeDeleted
}) {
    const { handleEditClick , handleDeleteClick} = useTradeActions(id , onTradeDeleted);

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