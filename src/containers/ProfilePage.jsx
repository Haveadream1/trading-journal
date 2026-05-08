/* Style import */
import '../styles/ProfileStyle.css'

import MainHeading from "../components/MainHeading";

export default function ProfilePage() {
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
                            <img src="" id="profile-picture" alt="User profile picture" />
                            <p>User name</p>
                        </div>

                        <div className="button-container">
                            <button className="profile-edit-button">Edit</button>
                            <button className="back-home-button">
                                <img src="" alt="Home icon" />
                            </button>
                        </div>
                    </div>

                    <div className="profile-data-container">
                        <div className="data-child-container">
                            <p>Name:</p>
                            <p className="user-name-value">User name</p>
                        </div>
                        <div className="data-child-container">
                            <p>Motivation:</p>
                            <p className="user-motivation-value">My motivation is...</p>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}