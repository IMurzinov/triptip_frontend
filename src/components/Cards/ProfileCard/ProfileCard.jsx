import React from "react";
import React, { useState, useEffect } from "react";

function ProfileCard() {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const url = 'https://triptip.pro/users/get_user/1';

        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.json();
            })
            .then(data => {
                setUserData(data);
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div className="profile-card">
            <div className="profile-card__picture">
                <img src={userData.userpic} alt='user profile picture' />
            </div>
            <div className="profile-card__details">
                <h2>{userData.username}</h2>
                <p>{userData.bio}</p>
            </div>
            <div className="profile-card__stats">
                <div className="profile-card__trips">
                    <p>Путешествия</p>
                    <span>{userData.trips_count}</span>
                </div>
                <div className="profile-card__friends">
                    <p>Друзья</p>
                    <span>{userData.friends_count}</span>
                </div>
            </div>
        </div>
    );
}

export default ProfileCard;