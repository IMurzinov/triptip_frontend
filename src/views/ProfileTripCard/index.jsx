import "./index.css";

const ProfileTripCard = ({ imageSrc, title, fromPlace, fromFlag, toPlace, toFlag, dateFrom, dateTo }) => {
    return (
        <div className="profile-trip-card">
            <img
                className="profile-trip-card__image"
                src={imageSrc || 'https://placehold.co/339x325'}
                alt={title}
            />
            <div className="profile-trip-card__info">
                <div className="profile-trip-card__header">
                    <h3 className="profile-trip-card__title">{title}</h3>
                    <div className="profile-trip-card__route">
                        <span>{fromFlag}</span>
                        <span className="profile-trip-card__place">{fromPlace}</span>
                        <span className="profile-trip-card__arrow">→</span>
                        <span>{toFlag}</span>
                        <span className="profile-trip-card__place">{toPlace}</span>
                    </div>
                </div>
                <p className="profile-trip-card__dates">{dateFrom} — {dateTo}</p>
            </div>
        </div>
    );
};

export default ProfileTripCard;
