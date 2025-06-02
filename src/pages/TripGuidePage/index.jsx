import { useParams } from "react-router-dom";

import { Footer, PageHeader } from "components";

import "./index.css";

const TripGuidePage = () => {
    const { id } = useParams();
    return (
        <div className="trip-guide-page__layout">
            <PageHeader />
            <main className="trip-guide-page__content">
                <p>Скоро здесь будет отчет о поездке с id = {id}</p>
            </main>
            <Footer />
        </div>
    )
};

export default TripGuidePage;