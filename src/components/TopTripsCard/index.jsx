import { Header, Userpic } from 'components';
import likeIcon from 'assets/images/likeIcon.svg';
import commentIcon from 'assets/images/commentIcon.svg';

import 'components/TopTripsCard/index.css';

const TopTripsCard = ({ name, location, dateFrom, dateTo, likes, comments, user_id, username, nickname }) => {
    const formatDate = (date) => {
        const options = { day: 'numeric', month: 'long' };
        return new Date(date).toLocaleDateString('ru-RU', options);
      };

      const formatYear = (date) => {
        return new Date(date).getFullYear();
      };

    return (
      <div className="trip-card">
        <div className='trip-card__info'>
          <Userpic
            user_id={user_id}
            size='medium'  
          />
          <div className='trip-card__user-name'>
            <p>{username}</p>
            <p>{nickname}</p>
          </div>
          <div className='trip-card__likes-n-comms'>
            <div className='likes'>
              <img src={likeIcon} alt='trip likes' />
              <span>{likes}</span>
            </div>
            <div className='comments'>
              <img src={commentIcon} alt='trip comments' />
              <span>{comments}</span>
            </div>
          </div>
        </div>
        <div className='trip-card__header'>
            <Header
                text={name}
                hdrType="section"
            />
        </div>
        <div className='trip-card__info'>
            <p className=''>{location}</p>
            <p>|</p>
            <p>{formatDate(dateFrom)} - {formatDate(dateTo)} {formatYear(dateTo)}</p>
        </div>
      </div>
    );
  };

export default TopTripsCard;