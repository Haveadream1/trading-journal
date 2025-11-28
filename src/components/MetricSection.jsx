export default function MetricSection({
    titleId,
    titleValue,
    text
}) {
    return (
        <section className="metric-section" aria-labelledby={titleId}>
            <h3 id={titleId}>{titleValue}</h3>
            <p className="metric-value">{text}</p>
        </section>
    );
}