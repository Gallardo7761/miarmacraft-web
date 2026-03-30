import { useState } from 'react';
import { Button } from 'react-bootstrap';
import '../../css/PasswordInput.css';
import PropTypes from 'prop-types';
import Icons from '../../icons.jsx';

const PasswordInput = ({ value, onChange, name = "password", className }) => {
  const [show, setShow] = useState(false);

  const toggleShow = () => setShow(prev => !prev);

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
        {show ? Icons.EyeSlash : Icons.Eye}
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
