export default function MainHeading({
    h1,
    text
}) {
    return (
        <section className="main-heading-section" aria-labelledby="main-heading">
            <h1 id="main-heading">{h1}</h1>
            <p className="main-heading-text">{text}</p>
        </section>
    );
}