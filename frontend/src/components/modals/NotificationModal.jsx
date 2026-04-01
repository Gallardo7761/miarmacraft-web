import PropTypes from 'prop-types';
import { Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCircleCheck,
  faCircleXmark,
  faCircleExclamation,
  faCircleInfo
} from '@fortawesome/free-solid-svg-icons';

const iconMap = {
  success: faCircleCheck,
  danger: faCircleXmark,
  warning: faCircleExclamation,
  info: faCircleInfo
};

const NotificationModal = ({
  show,
  onClose,
  title,
  message,
  variant = "info",
  buttons = [{ label: "Aceptar", variant: "primary", onClick: onClose }]
}) => {
  return (
    <Modal show={show} onHide={onClose} centered className="minecraft-modal-wrapper">
      <Modal.Header className="minecraft-modal-header">
        <Modal.Title className="minecraft-modal-title">
          <FontAwesomeIcon icon={iconMap[variant] || faCircleInfo} className="me-3" />
          {title.toUpperCase()}
        </Modal.Title>
        <button className="minecraft-close-btn" onClick={onClose}>×</button>
      </Modal.Header>

      <Modal.Body className="minecraft-modal-body">
        <p className="mb-0">{message}</p>
      </Modal.Body>

      <Modal.Footer className="minecraft-modal-footer">
        {buttons.map((btn, index) => (
          <button
            key={index}
            className={`minecraft-btn ${btn.variant === 'danger' || variant === 'danger' ? 'danger' : ''}`}
            onClick={btn.onClick || onClose}
          >
            {btn.label}
          </button>
        ))}
      </Modal.Footer>
    </Modal>
  );
};

NotificationModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  variant: PropTypes.oneOf(['success', 'danger', 'warning', 'info']),
  buttons: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      variant: PropTypes.string,
      onClick: PropTypes.func
    })
  )
};

export default NotificationModal;