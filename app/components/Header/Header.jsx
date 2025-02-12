import { useState } from 'react';
import Image from 'next/image';
import './Header.css';
import logo from './img/fone.svg';
import quit from './img/Icon - Quit.svg';

const Header = () => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const togglePopup = () => {
    setIsPopupVisible(!isPopupVisible);
  };

  return (
    <header className='header'>
      <div className="container">
        <div className="header__content">
          <div className="header__deck">
            <Image src={logo} alt="fone" />
          </div>
          <div className="header__title">
            <Image
              src={quit}
              alt="quit"
              className="header__quit"
              onClick={togglePopup} 
            />
            <h3>Выход</h3>
          </div>
        </div>
      </div>

      {isPopupVisible && (
        <div className="popup">
          <div className="popup__content">
            <h4>Вы уверены, что хотите выйти?</h4>
            <button onClick={() => setIsPopupVisible(false)}>Отмена</button>
            <button onClick={() => {
              alert('Выход...');
              setIsPopupVisible(false);
            }}>Да</button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
