// {TO DO}: Добавить случай обработки пустого аватара


import { useState, useEffect } from 'react';
import { CiUser } from "react-icons/ci";
import classNames from 'classnames';

import { BASE_URL } from 'constants/constants';

import 'components/Userpic/index.css';

const Userpic = ({ user_id, size }) => {

    const USERS_URL = `${BASE_URL}/users/get_user/${user_id}`;

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {

        let isMounted = true;

        const fetchUserpic = async () => {
            setLoading(true);
            try {
                const response = await fetch(USERS_URL);
                if (!response.ok) {
                    throw new Error("Network response was not OK");
                }
                const data = await response.json();
                if (isMounted) {
                    setData(data);
                }
            } catch (error) {
                if (isMounted) {
                    setError(error);
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        fetchUserpic();

        return () => {
            isMounted = false;
        };

    }, [user_id])
    
    if (loading || error || !data?.userpic) {
        return <div className={classNames(
            'userpic-stub',
            {
                'userpic-small': size === 'small',
                'userpic-medium': size === 'medium',
                'userpic-large': size === 'large',
            }
        )}>
            <CiUser className='userpic-stub__icon'/>
        </div>;
    }

    return (
        <img src={data?.userpic} alt='userpic' className={classNames(
            'userpic',
            {
                'userpic-small': size === 'small',
                'userpic-medium': size === 'medium',
                'userpic-large': size === 'large',
            }
        )}></img>
    );
};

export default Userpic;