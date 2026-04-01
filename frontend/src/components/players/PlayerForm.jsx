import { useState } from 'react';
import PropTypes from 'prop-types';
import PasswordInput from '@/components/auth/PasswordInput';

const PlayerForm = ({ onSubmit, onCancel, errors, initialData, isEdit }) => {
    const [formData, setFormData] = useState({
        displayName: initialData?.user?.displayName || '',
        username: initialData?.account?.username || '',
        password: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <form onSubmit={(e) => { e.preventDefault(); onSubmit(formData); }}>
            {errors?.general && <p className="text-danger d-block">{errors.general}</p>}
            <label>Nombre público:</label>
            <input
                name="displayName"
                className={`minecraft-input mb-1 ${errors?.general ? 'is-invalid' : ''}`}
                onChange={handleChange}
                value={formData.displayName}
                placeholder="Markus Persson"
            />

            <label className="mt-3">Usuario:</label>
            <input
                name="username"
                className={`minecraft-input mb-1 ${errors?.general ? 'is-invalid' : ''}`}
                onChange={handleChange}
                value={formData.username}
                placeholder='Notch'
            />

            {!isEdit && (
                <>
                    <label className="mt-3">Contraseña:</label>
                    <PasswordInput
                        name="password"
                        className={`mb-1 ${errors?.password ? 'is-invalid' : ''}`}
                        onChange={handleChange}
                        value={formData.password}
                    />
                </>
            )}

            <div className="d-flex gap-2 mt-4">
                <button type="submit" className="minecraft-btn w-100">{isEdit ? "CONFIRMAR" : "CREAR JUGADOR"}</button>
                <button type="button" className="minecraft-btn danger w-100" onClick={onCancel}>CANCELAR</button>
            </div>
        </form>
    );
};

PlayerForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    errors: PropTypes.object,
    initialData: PropTypes.object,
    isEdit: PropTypes.bool
};

export default PlayerForm;