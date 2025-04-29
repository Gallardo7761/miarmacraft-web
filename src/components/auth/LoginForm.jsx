import CustomContainer from "../layout/CustomContainer";
import { useAuth } from "../../hooks/useAuth";
import PasswordInput from "./PasswordInput";
import { Alert } from "react-bootstrap";
import CustomCheckbox from "./CustomCheckbox";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const LoginForm = () => {
    const { login, error } = useAuth();
    const navigate = useNavigate();

    const [formState, setFormState] = useState({
        emailOrUserName: "",
        password: "",
        keepLoggedIn: false
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormState((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.emailOrUserName);

        const loginBody = {
            password: formState.password,
            keepLoggedIn: Boolean(formState.keepLoggedIn),
        };

        if (isEmail) {
            loginBody.email = formState.emailOrUserName;
        } else {
            loginBody.userName = formState.emailOrUserName;
        }

        try {
            await login(loginBody);
            navigate("/");
        } catch (err) {
            console.error("Error de login:", err.message);
        }
    };

    return (
        <CustomContainer>
            <div className="minecraft-card mx-auto d-flex flex-column gap-4 col-12 col-md-8 col-lg-6 col-xl-5 my-5">
                <div className="card-body">
                    <h1 className="text-center">Inicio de sesion</h1>
                    <hr className="minecraft-hr" />
                    {error && (
                        <Alert variant="danger" className="text-center py-2 mb-3">
                            {error}
                        </Alert>
                    )}
                    <form onSubmit={handleSubmit}>
                        <label>Usuario o email</label>
                        <input
                            type="text"
                            name="emailOrUserName"
                            value={formState.emailOrUserName}
                            onChange={handleChange}
                            className="minecraft-input mb-3" />

                        <label>Contraseña</label>
                        <PasswordInput
                            value={formState.password}
                            onChange={handleChange}
                            name="password"
                            className="mb-5"
                        />

                        <CustomCheckbox
                            checked={formState.keepLoggedIn}
                            onChange={(newValue) => setFormState(prev => ({ ...prev, keepLoggedIn: newValue }))}
                            label="Mantener sesión iniciada"
                        />

                        <hr className="minecraft-hr" />

                        <div className="text-center">
                            <button className="minecraft-btn" type="submit">
                                Iniciar sesion
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </CustomContainer>
    );
}

LoginForm.propTypes = {
    emailOrUsername: PropTypes.string,
    password: PropTypes.string,
};

export default LoginForm;