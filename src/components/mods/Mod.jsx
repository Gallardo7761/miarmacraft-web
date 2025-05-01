import Icons from "@/icons";
import PropTypes from "prop-types";
import IfRole from "../auth/IfRole";
import { CONSTANTS } from "@/constants";
import AnimatedDropdown from "../util/AnimatedDropdown";
import FileUpload from '@/components/inputs/FileUpload';
import { useState } from "react";

const Mod = ({ mod, isNew, fileRef, onCreate, onUpdate, onDelete, onSelectFiles, onCancel, onClearError }) => {
  const isActive = mod?.status === 1;
  const [editMode, setEditMode] = useState(isNew);
  const [modData, setModData] = useState({
    name: mod?.name || "Mod nuevo",
    url: mod?.url || "no",
    status: mod?.status ?? 1,
  });

  const createMode = isNew;

  const handleChange = (K, V) => {
    setModData((prev) => ({ ...prev, [K]: V }))
  }

  const handleDelete = () => typeof onDelete === "function" && onDelete(mod.mod_id);

  const handleSave = () => {
    const data = { ...mod, ...modData };
    if (createMode && onCreate) onCreate(data);
    else if (onUpdate) onUpdate(data, mod.mod_id);
  }

  const handleEdit = () => {
    if (onClearError) onClearError();
    setEditMode(true);
  };

  const handleCancel = () => {
    if (onClearError) onClearError();
    if (createMode && typeof onCancel === 'function') return onCancel();
    setEditMode(false);
  };

  if (editMode) {
    return (
      <div className="d-flex flex-column align-items-center gap-3">
        <div className="d-flex align-items-center w-100 gap-1">
          <input className="minecraft-input col-10" value={modData.name} onChange={(e) => handleChange("name", e.target.value)} />
          <select className="minecraft-select col-md-1 col-2" value={modData.status} onChange={(e) => handleChange("status", parseInt(e.target.value))}>
            <option value={1}>➕</option>
            <option value={0}>➖</option>
          </select>
        </div>

        {/* Solo se muestra cuando editas un mod existente */}
        {!createMode && (
          <input
            className="minecraft-input col-12"
            value={modData.url}
            onChange={(e) => handleChange("url", e.target.value)}
          />
        )}

        {createMode && <FileUpload ref={fileRef} onFilesSelected={onSelectFiles} />}

        <div className="d-flex w-100 justify-content-end gap-2">
          <button className="minecraft-btn" onClick={handleSave}>
            {Icons.Save}
          </button>
          <button className="minecraft-btn danger" onClick={handleCancel}>
            {Icons.Cancel}
          </button>
        </div>
      </div>
    );
  }

  // Modo visual normal
  return (
    <li
      className="d-flex justify-content-between align-items-center py-2"
      style={{ gap: "1rem", fontFamily: "'MCText Regular'", fontSize: "1.3rem" }}
    >
      <div className="d-flex align-items-center gap-2">
        {isActive ? Icons.FilePlus : Icons.Trash}
        <span className="text-wrap">{mod.name}</span>
      </div>
      <div className="m-0 p-0 d-flex align-items-center gap-2 flex-wrap justify-content-end">
        {mod.url !== "no" && isActive && (
          <a
            href={mod.url}
            className="minecraft-btn flex-shrink-0"
            target="_blank"
            rel="noopener noreferrer"
          >
            {Icons.Download}
          </a>
        )}
        <IfRole roles={[CONSTANTS.ADMIN_ROLE]}>
          <AnimatedDropdown
            trigger={
              <button className="minecraft-btn flex-shrink-0">
                {Icons.Dots}
              </button>
            }
            className="end-0"
          >
            {({ closeDropdown }) => (
              <>
                <div className="dropdown-item d-flex align-items-center gap-2" onClick={() => { handleEdit(); closeDropdown(); }}>
                  {Icons.Edit} Editar
                </div>
                <hr className="dropdown-divider" />
                <div className="dropdown-item d-flex align-items-center gap-2" style={{ color: "var(--removed-color)" }} onClick={() => { handleDelete(); closeDropdown(); }}>
                  {Icons.Trash} Eliminar
                </div>
              </>
            )}
          </AnimatedDropdown>
        </IfRole>
      </div>
    </li>
  );
};

Mod.propTypes = {
  mod: PropTypes.object,
  isNew: PropTypes.bool,
  fileRef: PropTypes.object,
  onCreate: PropTypes.func,
  onUpdate: PropTypes.func,
  onDelete: PropTypes.func,
  onSelectFiles: PropTypes.func,
  onCancel: PropTypes.func,
  onClearError: PropTypes.func,
};

export default Mod;