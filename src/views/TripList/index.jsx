import { TripCard, TopTripsEmptyPlaceholder } from "components";

import "./index.css";

const TripList = ({ tripsData, tripsCount }) => {
    console.log(tripsData);
    return (
        tripsCount > 0 ? 
            ( 
                <div className="trip-list">
                    {tripsData.map(trip => (
                        <TripCard
                            key={trip.id}
                            name={trip.name}
                            location={trip.region}
                            dateFrom={trip.date_from}
                            dateTo={trip.date_to}
                        />
                    ))}
                </div> 
            ) : ( 
                <TopTripsEmptyPlaceholder />
            ) 
    );
};

export default TripList;