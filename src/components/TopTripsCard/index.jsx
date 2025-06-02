// TODO: Добавить отображение 3 фото поездки
import { Link } from "react-router-dom";

import { Header, Userpic } from "components";
import likeIcon from "assets/images/likeIcon.svg";
import commentIcon from "assets/images/commentIcon.svg";

import "./index.css";

const TopTripsCard = ({ name, location, dateFrom, dateTo, likes, comments, user_id, username, firstLastName }) => {
    const formatDate = (date) => {
        const options = { day: 'numeric', month: 'long' };
        return new Date(date).toLocaleDateString('ru-RU', options);
      };

      const formatYear = (date) => {
        return new Date(date).getFullYear();
      };

    return (
      <div className="top-trip-card">

        <div className='top-trip-card__info'>

          <div className='top-trip-card__user'>
            <Userpic
            user_id={user_id}
            size='medium'  
            />
            <Link
              to={`/profile/${user_id}`}
              className="username-link"
            >
              <p className='username'>{username}</p>
            </Link>
          </div>
          
          <div className='top-trip-card__likes-n-comms'>
            <div className='likes'>
              <img className="likes-icon" src={likeIcon} alt='trip likes' />
              <span>{likes}</span>
            </div>
            <div className='comments'>
              <img className="comments-icon" src={commentIcon} alt='trip comments' />
              <span>{comments}</span>
            </div>
          </div>

        </div>

        <div className='top-trip-card__trip-label'>
            <Header
                text={name}
                hdrType="trip"
            />
            <div className='top-trip-card__place-n-date'>
              <p className='top-trip-card__location'>{location}</p>
              <p className="top-trip-card__divider">|</p>
              <p className="top-trip-card__period">{formatDate(dateFrom)} - {formatDate(dateTo)} {formatYear(dateTo)}</p>
            </div>
        </div>
      </div>
    );
  };

export default TopTripsCard;