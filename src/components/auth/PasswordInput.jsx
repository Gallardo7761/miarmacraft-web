import { useState } from 'react';
import { Button } from 'react-bootstrap';
import '../../css/PasswordInput.css';
import PropTypes from 'prop-types';

const PasswordInput = ({ value, onChange, name = "password", className }) => {
  const [show, setShow] = useState(false);

  const toggleShow = () => setShow(prev => !prev);

  const Eye = 
  <svg 
    className='pixel-icon'
    fill="currentColor" 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24"
  >
    <path d="M8 6h8v2H8V6zm-4 4V8h4v2H4zm-2 2v-2h2v2H2zm0 2v-2H0v2h2zm2 2H2v-2h2v2zm4 2H4v-2h4v2zm8 0v2H8v-2h8zm4-2v2h-4v-2h4zm2-2v2h-2v-2h2zm0-2h2v2h-2v-2zm-2-2h2v2h-2v-2zm0 0V8h-4v2h4zm-10 1h4v4h-4v-4z" fill="currentColor" />
  </svg>;

  const EyeSlash = 
  <svg 
    className='pixel-icon'
    fill="currentColor" 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24"
  >
    <path d="M0 7h2v2H0V7zm4 4H2V9h2v2zm4 2v-2H4v2H2v2h2v-2h4zm8 0H8v2H6v2h2v-2h8v2h2v-2h-2v-2zm4-2h-4v2h4v2h2v-2h-2v-2zm2-2v2h-2V9h2zm0 0V7h2v2h-2z" fill="currentColor"/>
  </svg>;

  return (
    <div className={`position-relative w-100 ${className}`}>
      <input
        type={show ? "text" : "password"}
        name={name}
        value={value}
        placeholder=""
        onChange={onChange}
        className="minecraft-input" />

      <Button
        variant="link"
        className="show-button position-absolute end-0 top-50 translate-middle-y"
        onClick={toggleShow}
        aria-label="Mostrar contraseña"
        tabIndex={-1}
        style={{ zIndex: 2 }}
      >
        {show ? EyeSlash : Eye}
      </Button>
    </div>
  );
};

PasswordInput.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string,
  className: PropTypes.string,
};

export default PasswordInput;
