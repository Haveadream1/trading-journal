import React from "react";
import { useStatistics } from "../context/StatisticsContext";

export default function MetricSection({
    titleId,
    titleValue,
    text
}) {
    const { isLoading } = useStatistics();

    return (
        <section className="metric-section" aria-labelledby={titleId}>
            <h2 id={titleId}>{titleValue}</h2>
            <p className="metric-value">
                {isLoading ? (
                    "Loading..."
                ) : (
                    text
                )}
            </p>
        </section>
    );
}