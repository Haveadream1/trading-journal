export default function MainHeading({
    titleValue,
    text
}) {
    return (
        <section className="main-heading-section" aria-labelledby="main-heading">
            <h1 id="main-heading">{titleValue}</h1>
            <p className="main-heading-text">{text}</p>
        </section>
    );
}