/* Style import */
import '../styles/ErrorStyle.css'

import { Link, useRouteError } from "react-router";

export default function ErrorPage() {
    // hook used to access the error object
    const error = useRouteError();

    return (
        <>
            <header className="error-header">
                <h1>Unexpected error</h1>
                <p>{`Error: ${error.status} ${error.statusText}`}</p>
            </header>
            <main className="error-main">
                {/* redirect to homepage */}
                <Link to='/' className="error-button" aria-label="Go back to dashboard page">Go back to dashboard page</Link>
            </main>
        </>
    )
}
