import 'views/Toggler/index.css';

const Toggler = ({ isEmailVisible, onDataChange }) => {
  const handleToggle = (isEmail) => {
    onDataChange(isEmail);
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
    </div>
  );
};

export default Toggler;