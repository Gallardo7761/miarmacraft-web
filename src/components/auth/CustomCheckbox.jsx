import PropTypes from "prop-types";
import CheckboxOn from "/images/icons/checkbox-on.svg"; // el tick
import CheckboxOff from "/images/icons/checkbox-off.svg"; // vacío

const CustomCheckbox = ({ checked, onChange, label }) => {
    const handleToggle = () => {
        onChange(!checked);
    };

    return (
        <div className="minecraft-checkbox-wrapper" onClick={handleToggle}>
            <div className={`minecraft-checkbox ${checked ? "checked" : ""}`}>
                <img src={checked ? CheckboxOn : CheckboxOff} />
            </div>
            {label && <small className="minecraft-checkbox-label">{label}</small>}
        </div>
    );
};

CustomCheckbox.propTypes = {
    checked: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
    label: PropTypes.string,
};

export default CustomCheckbox;
