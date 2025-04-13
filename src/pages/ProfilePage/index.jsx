import { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { Button, Header, PageHeader, Footer } from "components";
import { UserProfileCard, Toggler, TripList } from "views";

import "./index.css";

const ProfilePage = () => {

    const userTrips = useSelector(state => state.userTrips.trips);
    const userTripsCount = useSelector(state => state.userTrips.tripsCount);

    console.log(userTrips);
    console.log(userTripsCount);

    const handleToggle = (option) => {
        setSelectedOption(option);
    };

    const [selectedOption, setSelectedOption] = useState('security');

    const options = [
        { label: 'Путешествия', value: 'trips' },
        { label: 'Друзья', value: 'friends' },
        { label: 'Лайки и комментарии', value: 'social' },
        { label: 'Совместное', value: 'joint' },
        { label: 'Безопасность', value: 'security' },
    ];

    const tripsRender = () => {
        return (
            <div className="toggler__trips">
                <TripList 
                    tripsData={userTrips}
                    tripsCount={true}
                />
            </div>
        );
    };

    const friendsRender = () => {

    };

    const socialActionsRender = () => {

    };

    const jointRender = () => {

    };

    const securityRender = () => {
        return (
            <div className="toggler__security">
                <div className="password__change">
                    <Header text="Изменение пароля" hdrType="section"/>
                    <p>Текст про изменение пароля</p>
                    <Button text="Изменить пароль" btnType="secondary"/>
                </div>
                <div className="account__delete">
                    <Header text="Удаление аккаунта" hdrType="section"/>
                    <p>Текст про удаление аккаунта типа бла бла бла вы очень для нас важны пажалувста не надо</p>
                    <Button text="Удалить аккаунт" btnType="danger"/>
                </div>
            </div>
        );
    };

    const renderFunctions = {
        trips: tripsRender,
        friends: friendsRender,
        social: socialActionsRender,
        joint: jointRender,
        security: securityRender,
    };

    return <div className="profile-page-container">
                <PageHeader/>
                <main className="profile-page-layout">
                    <Header className="profile-page__header" text="Личный кабинет" hdrType="page"/>
                    <UserProfileCard className="profile-page__user-card" style={{margin: "41px 0 53px"}} />
                    <Toggler
                        className="profile-page__toggler"
                        options={options}
                        selectedOption={selectedOption}
                        onOptionChange={handleToggle}
                    />
                    {renderFunctions[selectedOption] && renderFunctions[selectedOption]()}
                </main>
                <Footer />
            </div>
};

export default ProfilePage;