import { Header } from '@components';
import editLogo from '@assets/edit_logo.svg';

import '@root/index.css';

const TripCard = ({ name, location, dateFrom, dateTo }) => {
    const formatDate = (date) => {
        const options = { day: 'numeric', month: 'long' };
        return new Date(date).toLocaleDateString('ru-RU', options);
      };

      const formatYear = (date) => {
        return new Date(date).getFullYear();
      };

    return (
      <div className="trip-card">
        <div className='trip-card__header'>
            <Header
                text={name}
                hdrType="section"
            />
            <button className='trip-card__edit-button'>
              <img className='trip-card__edit-logo' src={editLogo} alt='edit_logo' />
            </button>
        </div>
        <div className='trip-card__info'>
            <p className=''>{location}</p>
            <p>|</p>
            <p>{formatDate(dateFrom)} - {formatDate(dateTo)} {formatYear(dateTo)}</p>
        </div>
      </div>
    );
  };

export default TripCard;