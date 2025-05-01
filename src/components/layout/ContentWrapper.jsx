import PropTypes from 'prop-types';

const ContentWrapper = ({ children, row = false  }) => {
    return (
        <div className={`container-xl ${row ? 'row' : ''} mx-auto`}>
            {children}
        </div>
    );
}

ContentWrapper.propTypes = {
    children: PropTypes.node.isRequired,
    row: PropTypes.bool,
}

export default ContentWrapper;