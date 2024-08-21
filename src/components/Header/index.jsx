import classNames from 'classnames';

import '@root/index.css';

const Header = ({ text, style, hdrType }) => {
    return (
        <p className={classNames(
            'header',
            {
               'page-header': hdrType === 'page',
               'section-header': hdrType === 'section',
               'input-header': hdrType === 'input', 
            }
        )} style={style}>
            {text}
        </p>
    );
};

export default Header;