import { useState } from 'react'

import { Header, Input} from '../../index';

import './AuthSwitcher.css';

const AuthSwitcher = () => {
    const [formData, setFormData] = useState({
        tel: "",
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };
    
  const [isEmailVisible, setIsEmailVisible] = useState(true);

  const handleToggle = (isEmail) => {
    setIsEmailVisible(isEmail);
  };

  return (
    <div className="auth-switcher">
      <div className="toggle-buttons">
        <button 
          className={`toggle-button ${!isEmailVisible ? 'active' : ''}`} 
          onClick={() => handleToggle(false)}
        >
          По номеру телефона
        </button>
        <button 
          className={`toggle-button ${isEmailVisible ? 'active' : ''}`} 
          onClick={() => handleToggle(true)}
        >
          По электронной почте
        </button>
      </div>
      <div className="form-wrapper">
        {isEmailVisible ? (
          <div className="form email-form">
            <Input
                label={<Header className="form-header" text="Электронная почта"/>}
                type="email"
                placeholder="something@smth.com"
                name="email"
                value={formData.email}
                onChange={handleChange}
                autocomplete="email"
                required
            />
            <Input
                label={<Header className="form-header" text="Пароль"/>}
                type="password"
                placeholder="********"
                name="password"
                value={formData.password}
                onChange={handleChange}
                autocomplete="off"
                required
            />
          </div>
        ) : (
          <div className="form phone-form">
            <Input
                label={<Header className="form-header" text="Телефон"/>}
                type="tel"
                placeholder="+7(XXX)XXX-XX-XX"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                autocomplete="tel"
                required
            />
            <Input
                label={<Header className="form-header" text="Пароль"/>}
                type="password"
                placeholder="********"
                name="password"
                value={formData.password}
                onChange={handleChange}
                autocomplete="off"
                required
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthSwitcher;