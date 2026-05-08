/* Style import */
import '../styles/ProfileStyle.css'

import homeIcon from "../assets/HomeIcon.svg";
import MainHeading from "../components/MainHeading";
import { Link } from 'react-router';

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
                            <img src="" id="profile-picture" />
                            {/* <img src="" id="profile-picture" alt="User profile picture" /> */}
                            <p>User name</p>
                        </div>

                        <div className="button-container">
                            <Link to={"/profileForm"} className='profile-edit-button' aria-label='redirect to profile form page'>Edit</Link>
                            <Link to={"/"} className="back-home-button" aria-label='redirect to dashboard page'>
                                <img src={homeIcon} alt="Home icon" />
                            </Link>
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