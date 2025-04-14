// TODO: Прописать заглушку на случай отсутствия данных по пользователю
// TODO: Прописать отображение реальных цифр по путешествиям и друзьям
// TODO: Добавить стили иконки edit, чтобы её не было, когда карточка не своя
// TODO: Обернуть edit в кнопку
// TODO: Продумать, в каком месте должны подтягиваться данные пользователя для заполнения карточки. Через пропсы?

import { useSelector, useDispatch } from "react-redux";

import { Header, Userpic } from "components";

import editLogo from "assets/images/edit_logo.svg";

import "./index.css";

const UserProfileCard = ({style}) => {

    let userTrips = useSelector(state => state.userTrips.trips);
    let tripsCount = userTrips.length;
    
    
    const dispatch = useDispatch();

    const user = useSelector((state) => state.auth.user);

    if (!user) {
        return <div>Не удалось загрузить информацию о пользователе</div>
    };


    
    return (
        <div className='profile-card' style={style}>

            <img className='profile-card__edit-icon' src={editLogo} alt='edit-icon'/>

            <Userpic 
                userpicSrc={user.userpic}
                size="large"
            />
            
            <div className='profile-card__info'>
                
                <div className='profile-card__name'>

                    <Header 
                        text={user.username}
                        hdrType="section"
                    />

                    <span className='nickname'>{user.nickname}</span>

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