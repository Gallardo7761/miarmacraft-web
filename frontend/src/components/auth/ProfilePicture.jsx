import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const ProfilePicture = ({ userName, part }) => {
    const src = `https://mineskin.eu/${part}/${userName}/40.png?v=${Date.now()}`;
    return (
        <Link to="/perfil" className='navbar-brand align-items-center'>
            <img src={src} 
                width="40" height="40" className="d-inline-block m-0 p-0" 
            />
        </Link>
    );
}

ProfilePicture.propTypes = {
    userName: PropTypes.string,
    part: PropTypes.string,
};

export default ProfilePicture;