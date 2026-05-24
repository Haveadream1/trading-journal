/* Style import */
import '../styles/ProfileStyle.css'

import homeIcon from "../assets/HomeIcon.svg";
import MainHeading from "../components/MainHeading";
import { Link } from 'react-router';
import { useProfile } from '../context/ProfileContext';

export default function ProfilePage() {
    const { profileData } = useProfile();
    
    return (
        <>
            <header className="profile-header">
                <MainHeading 
                    titleValue={`Welcome ${profileData["username-input"]} !`}
                    text="Access and edit your profile data"
                />
            </header>

            <main className="profile-page">
                <div className="profile-section">
                    <div className="profile-picture-container">
                        <div className="picture-container">
                            {/* <img src="" id="profile-picture" alt="User profile picture" /> */}
                            <span id='profile-picture'></span>
                            <p>{`${profileData["username-input"]}`}</p>
                        </div>

                        <div className="button-container">
                            <Link to={"/profileForm"} className='profile-edit-button' aria-label='Redirect to profile form page'>
                                Edit
                            </Link>

                            <Link to={"/"} className="back-home-button" aria-label='Redirect to dashboard page'>
                                <img src={homeIcon} alt="Home icon" />
                            </Link>
                        </div>
                    </div>

                    <div className="profile-data-container">
                        <div className="data-child-container">
                            <p>Name:</p>

                            <p className="username-value">
                                {profileData["username-input"] || "My name is...."}
                            </p>
                        </div>
                        <div className="data-child-container">
                            <p>Motivation:</p>

                            <p className="user-motivation-value">
                                {profileData["motivation-input"] || "My motivation is...."}
                            </p>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}