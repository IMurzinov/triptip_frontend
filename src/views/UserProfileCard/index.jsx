// TODO: Прописать заглушку на случай отсутствия данных по пользователю
// TODO: Прописать отображение реальных цифр по путешествиям и друзьям

import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { loginSuccess } from "features/auth/authSlice";
import { Header, Userpic } from "components";

import editLogo from "assets/images/edit_logo.svg";

import "./index.css";

const UserProfileCard = () => {
    
    const dispatch = useDispatch();

    const user = useSelector((state) => state.auth.user);

    useEffect(() => {
        const fakeUserData = {
            id: 3,
            username: "Amelia Earhart",
            nickname: "FlyinGirl",
            email: "amelia_earhart@bk.ru",
            userpic: "https://californiamuseum.org/wp-content/uploads/amelia-earhart-1.jpg",
            bio: "contact me for flights across any oceans in the world, be sure to bring your own life vest",
        };

        dispatch(loginSuccess(fakeUserData));
    }, [dispatch]);

    if (!user) {
        return <div>Не удалось загрузить информацию о пользователе</div>
    };


    
    return (
        <div className='profile-card'>

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

                        <span className='number'>6</span>

                    </div>

                    <div className='profile-card__friends'>

                        <p className='friends'>Друзья</p>

                        <span className='number'>120</span>

                    </div>

                </div>

            </div>

        </div>
    );
};

export default UserProfileCard;