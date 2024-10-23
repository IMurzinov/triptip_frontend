import { Link } from 'react-router-dom';

import './index.css';

const NotFoundPage = () => {
    return (
        <div className='not-found-page'>
            404 Not Found
            <Link to="/">Home</Link>
        </div>
    );
};

export default NotFoundPage;