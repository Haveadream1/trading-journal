/* Style import */
    // Share the same style, as we want it to be identical to form page
import '../styles/ProfileStyle.css'

import { Link, Navigate, useNavigate } from "react-router";
import MainHeading from "../components/MainHeading";
import { useState } from 'react';
import { useProfile } from '../context/ProfileContext';

export default function ProfileFormPage() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const {handleDataChange, storeProfile, profileData} = useProfile()
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const value = e.target.value;
        const label = e.target.id;

        handleDataChange(label, value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (isSubmitting) return;
        setIsSubmitting(true);

        try {
            // Function called return a boolean value depending on success or failure
            const success = storeProfile(profileData);

            if (success) {
                console.log("Successes in submitting the profile form");
                navigate('/profile');
            } else {
                console.error("Error while submitting the profile form");
                setIsSubmitting(false);
            }
        } catch(error) {
            console.error("Failed to submit profile form", error);
            setIsSubmitting(false);
        }
    }

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
                            <span id='profile-picture'></span>
                            <p>{`${profileData["username-input"]}`}</p>
                        </div>

                        <div className="button-container">
                            {/* form link the button to the form, as it's located outside */}
                            <button type='submit' form="profile-form" disabled={isSubmitting} className='profile-save-button' >
                                {isSubmitting ? "Saving..." : "Save"}
                            </button>

                            <Link to={"/profile"} className="profile-cancel-button" aria-label='redirect to profile page'>
                                Cancel
                            </Link>
                        </div>
                    </div>

                    {/* No fieldset because we don't implement a legend */}
                    <form onSubmit={handleSubmit} id="profile-form" className="profile-form">
                        <div id="profile-name-fieldset" className="profile-fieldset">
                            <label htmlFor="username-input">Name:</label>
                            <input 
                                type="text" 
                                onChange={handleInputChange} 
                                id="username-input" 
                                className="profile-input" 
                                min={1} 
                                maxLength={15} 
                                placeholder="My name is...." 
                            />
                        </div>

                        <div id="profile-motivation-fieldset" className="profile-fieldset">
                            <label htmlFor="motivation-input">Motivation:</label>
                            <input 
                                type="text" 
                                onChange={handleInputChange} 
                                id="motivation-input" 
                                className="profile-input" 
                                maxLength={25} 
                                placeholder="My motivation is...." 
                            />
                        </div>
                    </form>
                </div>
            </main>
        </>
    )
}