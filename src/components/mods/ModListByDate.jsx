import Mod from "./Mod";
import PropTypes from "prop-types";

const groupModsByDate = (mods) => {
  const map = {};
  mods.forEach((mod) => {
    const dateObj = new Date(mod.created_at);
    const yyyy = dateObj.getFullYear();
    const mm = String(dateObj.getMonth() + 1).padStart(2, "0");
    const dd = String(dateObj.getDate()).padStart(2, "0");
    const localDate = `${yyyy}-${mm}-${dd}`;
    if (!map[localDate]) map[localDate] = [];
    map[localDate].push(mod);
  });
  return map;
};

const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  const today = new Date().toDateString();
  return date.toDateString() === today ? "HOY" : date.toLocaleDateString("es-ES");
};

const ModListByDate = ({ mods, onUpdate, onDelete, onClearError }) => {
  const modsByDate = groupModsByDate(mods);
  const sortedDates = Object.keys(modsByDate).sort((a, b) => new Date(b) - new Date(a));

  return (
    <div className="minecraft-card not-animated p-4 col-xs-12">
      {sortedDates.map((date) => (
        <div key={date} className="mb-4">
          <h3 className="mb-2 header" style={{ fontSize: "1.6rem" }}>
            {formatDate(date)}
          </h3>
          <ul className="list-unstyled m-0 p-0">
            {modsByDate[date]
              .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
              .map((mod) => (
              <Mod 
                key={mod.mod_id} 
                mod={mod} 
                onUpdate={onUpdate}
                onDelete={onDelete}
                onClearError={onClearError}
              />
            ))}
          </ul>
          <hr className="minecraft-hr" />
        </div>
      ))}
    </div>
  );
};
ModListByDate.propTypes = {
  mods: PropTypes.arrayOf(
    PropTypes.shape({
      mod_id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      created_at: PropTypes.string.isRequired,
    })
  ).isRequired,
  onUpdate: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onClearError: PropTypes.func.isRequired
};

export default ModListByDate;
