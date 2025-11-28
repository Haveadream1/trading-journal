export default function AnalyticSection({
    titleId,
    titleValue,
    alt
}) {
    return (
        <section className="analytic-section" aria-labelledby={titleId}>
            <h2 id={titleId}>{titleValue}</h2>
            <img src="" alt={alt} loading="lazy" />
        </section>
    );
}
// TODO Pass image source