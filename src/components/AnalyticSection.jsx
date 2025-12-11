export default function AnalyticSection({
    titleId,
    titleValue,
    src,
    alt,
    text
}) {
    return (
        <section className="analytic-section" aria-labelledby={titleId}>
            <h2 id={titleId}>{titleValue}</h2>
            {src ? (
                <img src="" alt={alt} loading="lazy" />
            ):(
                <p>{text}</p>
            )}
        </section>
    );
}
// TODO: Either we pass the graph in the analytic section Either we call it in the parent -> Wait for real data implementation