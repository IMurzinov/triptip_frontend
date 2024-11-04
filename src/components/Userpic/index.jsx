import { CiUser } from "react-icons/ci";
import classNames from "classnames";

import "./index.css";

const Userpic = ({ userpicSrc, size }) => {
    
    if (!userpicSrc) {
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
        <img src={userpicSrc} alt='userpic' className={classNames(
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