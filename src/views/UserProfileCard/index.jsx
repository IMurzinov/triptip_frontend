// TODO: Прописать заглушку на случай отсутствия данных по пользователю
// TODO: Обернуть edit в кнопку
import { useSelector, useDispatch } from "react-redux";

import { Header, Userpic } from "components";
import editLogo from "assets/images/edit_logo.svg";

import "./index.css";

const UserProfileCard = ({isMyAccount, userpic, username, tripsCount = 0}) => {
    const dispatch = useDispatch();

    if (!username) {
        return <div>Не удалось загрузить информацию о пользователе</div>
    };

    return (
        <div className='profile-card'>
            <img
                className={`profile-card__edit-icon ${!isMyAccount ? 'hidden' : ''}`}
                src={editLogo}
                alt='edit-icon'
            />
            <Userpic 
                userpicSrc={userpic}
                size="large"
            />
            <div className='profile-card__info'>
                <div className='profile-card__name'>
                    <Header 
                        text={username}
                        hdrType="section"
                    />
                </div>
                <div className='profile-card__numbers'>
                    <div className='profile-card__trips'>
                        <p className='trips'>Путешествия</p>
                        <span className='number'>{tripsCount}</span>
                    </div>
                    {/* <div className='profile-card__friends'>
                        <p className='friends'>Друзья</p>
                        <span className='number'>120</span>
                    </div> */}
                </div>
            </div>
        </div>
    );
};

export default UserProfileCard;