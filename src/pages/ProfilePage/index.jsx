import { useState } from "react";
import { useParams } from "react-router-dom";

import { Button, Header, PageHeader } from "components";
import { UserProfileCard, Toggler } from "views";

import "./index.css";

const ProfilePage = () => {

    const { username } = useParams();

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

    return <div className="profile-page-layout">
            <PageHeader/>
            <Header className="profile-page__header" text="Личный кабинет" hdrType="page"/>
            <UserProfileCard className="profile-page__user-card" style={{margin: "41px 0 53px"}} />
            <Toggler
                className="profile-page__toggler"
                options={options}
                selectedOption={selectedOption}
                onOptionChange={handleToggle}
            />
            {renderFunctions[selectedOption] && renderFunctions[selectedOption]()}
        </div>
};

export default ProfilePage;