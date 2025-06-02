import { Link } from "react-router-dom";

import { Header } from "components";

import "./index.css";

const TripCard = ({ tripId, name, location, dateFrom, dateTo }) => {
  const formatDate = (date) => {
    const options = { day: 'numeric', month: 'long' };
    return new Date(date).toLocaleDateString('ru-RU', options);
  };

  const formatYear = (date) => {
    return new Date(date).getFullYear();
  };

  return (
    <Link
      to={`/trip/${tripId}`}
      className="trip-guide-link"
    >
      <div className="trip-card">
          <div className='trip-card__header'>
              <Header
                  text={name}
                  hdrType="trip"
              />
          </div>
        
        <div className='trip-card__info'>
            <p className=''>{location}</p>
            <p>|</p>
            <p>{formatDate(dateFrom)} - {formatDate(dateTo)} {formatYear(dateTo)}</p>
        </div>
      </div>
    </Link>
  );
};

export default TripCard;