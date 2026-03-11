import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import { Sidebar } from "components";
import { UserProfileCard, Toggler, ProfileTripCard } from "views";
import { apiClient } from "api";
import { URL } from "constants/constants";

import "./index.css";

const ProfilePage = () => {
    const { userId } = useParams();
    const dispatch = useDispatch();

    const currentUser = useSelector((state) => state.auth.user);
    const currentUserId = currentUser?.id?.toString();

    const [otherProfileData, setOtherProfileData] = useState(null);
    const [otherTripsData, setOtherTripsData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const userTripsFromStore = useSelector(state => state.userTrips?.trips);
    const userTrips = userTripsFromStore || [];
    const userTripsCount = userTrips.length;

    const [selectedOption, setSelectedOption] = useState('publications');

    const isMyAccount = currentUserId === userId;

    const options = [
        { label: 'Публикации', value: 'publications' },
        { label: 'Избранное', value: 'favorites' },
        ...(isMyAccount ? [{ label: 'Черновики (112)', value: 'drafts' }] : []),
    ];

    const handleToggle = (option) => {
        setSelectedOption(option);
    };

    useEffect(() => {
        setLoading(true);
        setError(null);

        if (currentUserId === userId) {
            setOtherProfileData(null);
            setOtherTripsData([]);
            setLoading(false);
            return;
        }

        const fetchOtherProfile = async () => {
            try {
                const profileResp = await apiClient(`${URL.GET_USERS}/${userId}`);
                if (!profileResp) throw new Error("Пользователь не найден");
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

    // 3 хардкодных карточки
    const hardcodedTrips = [
        {
            id: 1,
            title: 'Счастливого путешествия в Казахстан!',
            fromFlag: '🇽🇰',
            fromPlace: 'Косово',
            toFlag: '🇰🇿',
            toPlace: 'Казахстан, Алматы',
            dateFrom: '22 сентября',
            dateTo: '31 сентября 2025',
        },
        {
            id: 2,
            title: 'Лучший международный рейс',
            fromFlag: '🇷🇺',
            fromPlace: 'Россия, Сургут',
            toFlag: '🇪🇸',
            toPlace: 'Испания, Аликанте',
            dateFrom: '12.02.18',
            dateTo: '13.02.18',
        },
        {
            id: 3,
            title: 'Лучший международный рейс',
            fromFlag: '🇷🇺',
            fromPlace: 'Россия, Сургут',
            toFlag: '🇪🇸',
            toPlace: 'Испания, Аликанте',
            dateFrom: '12.02.18',
            dateTo: '13.02.18',
        },
    ];

    if (loading) {
        return (
            <div className="profile-page">
                <Sidebar activeItem="profile" />
                <main className="profile-page__main">
                    <p>Загрузка профиля...</p>
                </main>
            </div>
        );
    }

    if (error) {
        return (
            <div className="profile-page">
                <Sidebar activeItem="profile" />
                <main className="profile-page__main">
                    <p>Ошибка: {error}</p>
                </main>
            </div>
        );
    }

    return (
        <div className="profile-page">
            <Sidebar activeItem="profile" />
            <main className="profile-page__main">
                <UserProfileCard
                    isMyAccount={isMyAccount}
                    userpic={isMyAccount ? currentUser?.userpic : otherProfileData?.userpic}
                    username={isMyAccount ? currentUser?.username : otherProfileData?.username}
                    tripsCount={isMyAccount ? userTripsCount : otherTripsData?.total_count}
                    subscribersCount={0}
                    likesCount={0}
                    bio={isMyAccount ? currentUser?.bio : otherProfileData?.bio}
                />
                <div className="profile-page__content">
                    <Toggler
                        variant="tabbar"
                        options={options}
                        selectedOption={selectedOption}
                        onOptionChange={handleToggle}
                    />
                    <div className="profile-page__trips-grid">
                        {hardcodedTrips.map(trip => (
                            <ProfileTripCard
                                key={trip.id}
                                title={trip.title}
                                fromFlag={trip.fromFlag}
                                fromPlace={trip.fromPlace}
                                toFlag={trip.toFlag}
                                toPlace={trip.toPlace}
                                dateFrom={trip.dateFrom}
                                dateTo={trip.dateTo}
                            />
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default ProfilePage;
