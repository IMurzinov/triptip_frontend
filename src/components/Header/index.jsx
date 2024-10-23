import classNames from "classnames";

import 'components/Header/index.css';

const Header = ({ text, style, hdrType }) => {
    return (
        <p className={classNames(
            'header',
            {
               'page-header': hdrType === 'page',
               'section-header': hdrType === 'section',
               'input-header': hdrType === 'input',
               'trip-card-header': hdrType === 'trip', 
            }
        )} style={style}>
            {text}
        </p>
    );
};

export default Header;