import { Userpic, Button } from "components";

import "./index.css";

const UserProfileCard = ({ isMyAccount, userpic, username, tripsCount = 0, subscribersCount = 0, likesCount = 0, bio }) => {
    if (!username) {
        return <div>Не удалось загрузить информацию о пользователе</div>;
    }

    return (
        <div className="profile-card">
            <div className="profile-card__banner" />
            <div className="profile-card__body">
                <Userpic
                    userpicSrc={userpic}
                    size="large"
                    style={{ outline: '3px solid white', borderRadius: '50%', display: 'block' }}
                />
                <p className="profile-card__username">{username}</p>
                <div className="profile-card__stats">
                    <div className="profile-card__stat">
                        <span className="profile-card__stat-number">{tripsCount}</span>
                        <span className="profile-card__stat-label">Публикации</span>
                    </div>
                    <div className="profile-card__stat">
                        <span className="profile-card__stat-number">{subscribersCount}</span>
                        <span className="profile-card__stat-label">Подписчики</span>
                    </div>
                    <div className="profile-card__stat">
                        <span className="profile-card__stat-number">{likesCount}</span>
                        <span className="profile-card__stat-label">Лайки</span>
                    </div>
                </div>
                {bio && <p className="profile-card__bio">{bio}</p>}
            </div>
            {!isMyAccount && (
                <div className="profile-card__subscribe">
                    <Button text="Подписаться" btnType="primary" />
                </div>
            )}
        </div>
    );
};

export default UserProfileCard;
