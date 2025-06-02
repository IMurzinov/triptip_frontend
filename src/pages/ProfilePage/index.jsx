import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import { Button, Header, PageHeader, Footer } from "components";
import { UserProfileCard, Toggler, TripList } from "views";
import { apiClient } from "api";
import { URL, BASE_URL } from "constants/constants";

import "./index.css";

const ProfilePage = () => {
    // 1. Берём userId из URL-параметра
    const { userId } = useParams();
    const dispatch = useDispatch();

    // 2. Текущий залогиненный пользователь (из Redux)
    const currentUser = useSelector((state) => state.auth.user); 
    const currentUserId = currentUser?.id?.toString(); // приводим к строке для сравнения

    // 3. Стейты для загрузки “чужого” профиля
    const [otherProfileData, setOtherProfileData] = useState(null);
    const [otherTripsData, setOtherTripsData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // 4. "Свои" данные
    const userTripsFromStore = useSelector(state => state.userTrips?.trips);
    const userTrips = userTripsFromStore || [];
    const userTripsCount = userTrips.length;

    // 5. Стейты для тогглера
    const [selectedOption, setSelectedOption] = useState('trips');

    const options = [
        { label: 'Путешествия', value: 'trips' },
        // { label: 'Друзья', value: 'friends' },
        // { label: 'Лайки и комментарии', value: 'social' },
        // { label: 'Совместное', value: 'joint' },
        { label: 'Безопасность', value: 'security' },
    ];

    const handleToggle = (option) => {
        setSelectedOption(option);
    };

    // 6. Хук: при монтировании или смене userId
    useEffect(() => {
        setLoading(true);
        setError(null);

        // Если это "своя" страница:
        if (currentUserId === userId) {
            // а) очищать "чужие" данные не нужно, 
            //    тут мы просто показываем то, что уже есть в store
            setOtherProfileData(null);
            setOtherTripsData([]);
            setLoading(false);
            return;
        }

        // Если "чужая" страница:
        const fetchOtherProfile = async () => {
            try {
                // 1) Запрашиваем чужие данные профиля
                const profileResp = await apiClient(`${URL.GET_USERS}/${userId}`);

                if (!profileResp) {
                    throw new Error("Пользователь не найден");
                }

                // 2) Запрашиваем список их поездок
                const tripsResp = await apiClient(`${URL.GET_USERS}/${userId}/trips`);

                setOtherProfileData(profileResp); 
                setOtherTripsData(tripsResp);
            } catch (err) {
                console.error("Ошибка при загрузке чужого профиля:", err);
                setError(err.message || "Не удалось загрузить профиль пользователя");
            } finally {
                setLoading(false);
            }
        };

        fetchOtherProfile();
    }, [userId, currentUserId, dispatch]);

    const tripsRender = () => {
        if (currentUserId === userId) {
            return (
                <div className="toggler__trips">
                    <TripList
                        tripsData={userTrips}
                        tripsCount={userTripsCount}
                    />
                </div>
            );
        }
        // Если чужой профиль:
        return (
            <div className="toggler__trips">
                <TripList
                    tripsData={otherTripsData.trips}
                    tripsCount={otherTripsData.total_count}
                />
            </div>
        );
    };

    // const friendsRender = () => {

    // };

    // const socialActionsRender = () => {

    // };

    // const jointRender = () => {

    // };

    const isMyAccount = currentUserId === userId;

    const securityRender = () => {
        return (
            <div className="toggler__security">
                <div className="password__change">
                    <Header text="Изменение пароля" hdrType="section"/>
                    <p className="password__change-text">Текст про изменение пароля</p>
                    <Button text="Изменить пароль" btnType="secondary"/>
                </div>
                <div className="account__delete">
                    <Header text="Удаление аккаунта" hdrType="section"/>
                    <p className="account__delete-text">Текст про удаление аккаунта типа бла бла бла вы очень для нас важны пажалувста не надо</p>
                    <Button text="Удалить аккаунт" btnType="danger"/>
                </div>
            </div>
        );
    };

    
    const renderFunctions = {
        trips: tripsRender,
        // friends: friendsRender,
        // social: socialActionsRender,
        // joint: jointRender,
        security: securityRender,
    };

    // 7. Лоадер / Ошибка
    if (loading) {
        return (
        <div className="profile-page-loading">
            <PageHeader />
            <main className="profile-page-layout">
            <p>Загрузка профиля...</p>
            </main>
            <Footer />
        </div>
        );
    }

    if (error) {
        return (
        <div className="profile-page-error">
            <PageHeader />
            <main className="profile-page-layout">
            <p>Ошибка: {error}</p>
            </main>
            <Footer />
        </div>
        );
    }

    return <div className="profile-page-container">
                <PageHeader/>
                <main className="profile-page-layout">
                    <Header
                        className="profile-page__header"
                        text={`${
                            isMyAccount
                            ? "Личный кабинет"
                            : "Профиль"
                        }`}
                        hdrType="page"
                    />
                    {isMyAccount ? (
                        <UserProfileCard
                            isMyAccount={true}
                            userpic={currentUser.userpic}
                            username={currentUser.username}
                            tripsCount={userTripsCount}
                        />
                    ) : (
                        <UserProfileCard
                            isMyAccount={false}
                            userpic={otherProfileData.userpic}
                            username={otherProfileData.username}
                            tripsCount={otherTripsData.total_count}
                        />
                    )}
                    <Toggler
                        className="profile-page__toggler"
                        options={options.filter(opt => {
                            // скрываем Security, если чужой профиль
                            if (!isMyAccount && opt.value === "security") return false;
                            return true;
                        })}
                        selectedOption={selectedOption}
                        onOptionChange={handleToggle}
                    />
                    {/*Рендерим содержимое вкладки */}
                    {renderFunctions[selectedOption]?.()}
                </main>
                <Footer />
            </div>
};

export default ProfilePage;