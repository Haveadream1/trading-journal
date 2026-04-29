export default function MetricSection({
    titleId,
    titleValue,
    text
}) {
    return (
        <section className="metric-section" aria-labelledby={titleId}>
            <h2 id={titleId}>{titleValue}</h2>
            <p className="metric-value">{text}</p>
        </section>
    );
}