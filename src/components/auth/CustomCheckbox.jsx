import PropTypes from "prop-types";
import Icons from "@/icons.jsx";

const CustomCheckbox = ({ checked, onChange, label }) => {
    const handleToggle = () => {
        onChange(!checked);
    };

    return (
        <div className="minecraft-checkbox-wrapper" onClick={handleToggle}>
            <div className={`minecraft-checkbox ${checked ? "checked" : ""}`}>
                {checked ? Icons.CheckboxOn : Icons.CheckboxOff}
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
