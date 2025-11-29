export default function TableRow({
    date,
    asset,
    direction,
    outcome,
    pnl
}) {
    return (
        <tr className="table-values-row">
            <td className="table-date-value">{date}</td>
            <td className="table-asset-value">{asset}</td>
            <td className="table-direction-value">{direction}</td>
            <td className="table-outcome-value">
                {outcome === "loss" ? (
                    <span className="outcome-span-loss">Loss</span>
                ):(
                    <span className="outcome-span-win">Win</span>
                )}
            </td>
            <td className="table-pnl-value">
                {outcome === "loss" ? (
                    <span className="pnl-span-loss">{pnl}</span>
                ):(
                    <span className="pnl-span-win">{pnl}</span>
                )}
            </td>
        </tr>
    );
}