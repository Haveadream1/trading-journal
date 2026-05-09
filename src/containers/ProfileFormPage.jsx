/* Style import */
import '../styles/ProfileStyle.css'

// Share the same style, as we want it to be identical to form page

import { Link } from "react-router";
import MainHeading from "../components/MainHeading";

export default function ProfileFormPage() {
    return (
        <>
            <header className="profile-header">
                <MainHeading 
                    titleValue="Welcome user name"
                    text="Access and edit your profile data"
                />
            </header>

            <main className="profile-page">
                <div className="profile-section">
                    <div className="profile-picture-container">
                        <div className="picture-container">
                            <img src="" id="profile-picture" />
                            <p>User name</p>
                        </div>

                        <div className="button-container">
                            <Link to={"/profile"} className='profile-save-button' aria-label='save input and redirect to profile page'>Save</Link>
                            <Link to={"/profile"} className="profile-cancel-button" aria-label='redirect to profile page'>Cancel</Link>
                        </div>
                    </div>

                    {/* <div className="profile-data-container">
                        <div className="data-child-container">
                            <p>Name:</p>
                            <p className="user-name-value">User name</p>
                        </div>
                        <div className="data-child-container">
                            <p>Motivation:</p>
                            <p className="user-motivation-value">My motivation is...</p>
                        </div>
                    </div> */}

                    {/* ! Button should be inside for the submit ? */}
                    <form action="post" className="profile-form">
                        <fieldset id="profile-name-fieldset" className="profile-fieldset">
                            <label htmlFor="user-name-value">Name:</label>
                            <input type="text" id="user-name-value" className="profile-input" placeholder="My name is...."></input>
                        </fieldset>

                        <fieldset id="profile-motivation-fieldset" className="profile-fieldset">
                            <label htmlFor="motivation-value">Motivation:</label>
                            <input type="text" id="motivation-value" className="profile-input" placeholder="My motivation is...."></input>
                        </fieldset>
                    </form>
                </div>
            </main>
        </>
    )
}