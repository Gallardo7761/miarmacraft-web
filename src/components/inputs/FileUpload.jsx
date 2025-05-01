import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { CloseButton } from "react-bootstrap";
import "@/css/FileUpload.css";
import PropTypes from "prop-types";

const MAX_FILE_SIZE_MB = 100;

const FileUpload = forwardRef(({ onFilesSelected }, ref) => {
  const fileInputRef = useRef();
  const [highlight, setHighlight] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);

  useImperativeHandle(ref, () => ({
    getSelectedFiles: () => selectedFiles,
    resetSelectedFiles: () => setSelectedFiles([]),
  }));

  const handleFiles = (files) => {
    const validFiles = Array.from(files).filter(
      (file) => file.size <= MAX_FILE_SIZE_MB * 1024 * 1024
    );
    setSelectedFiles(validFiles);
    if (onFilesSelected) onFilesSelected(validFiles);
  };

  const handleInputChange = (e) => {
    handleFiles(e.target.files);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setHighlight(false);
    handleFiles(e.dataTransfer.files);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setHighlight(true);
  };

  const handleDragLeave = () => {
    setHighlight(false);
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  const removeFile = (index) => {
    const updated = [...selectedFiles];
    updated.splice(index, 1);
    setSelectedFiles(updated);
    if (onFilesSelected) onFilesSelected(updated);
  };

  return (
    <div
      className={`upload-card mb-4 ${highlight ? "highlight" : ""}`}
      onClick={openFileDialog}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      role="button"
    >
      <div className="text-center">
        <h2 className="mb-3">📎 Subir archivo</h2>
        <p>
          Arrastra o haz click para seleccionar archivos (Máx. 100MB)
        </p>
        <input
          ref={fileInputRef}
          type="file"
          accept=".jar"
          multiple
          className="d-none"
          onChange={handleInputChange}
        />
        {selectedFiles.length > 0 && (
          <ul className="file-list text-start mt-4 px-3">
            {selectedFiles.map((file, idx) => (
              <li
                key={idx}
                className="d-flex justify-content-between align-items-center mb-2"
              >
                <span>📄 {file.name}</span>
                <CloseButton
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFile(idx);
                  }}
                />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
});

FileUpload.displayName = "FileUpload";

FileUpload.propTypes = {
  onFilesSelected: PropTypes.func,
};

export default FileUpload;
