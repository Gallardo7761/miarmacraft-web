import CustomContainer from "@/components/layout/CustomContainer";
import { useAuth } from "@/hooks/useAuth";
import PasswordInput from "./PasswordInput";
import { Alert } from "react-bootstrap";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CONSTANTS } from "@/constants";

const LoginForm = () => {
    const { login, error } = useAuth();
    const navigate = useNavigate();

    const [formState, setFormState] = useState({
        username: "",
        password: "",
        serviceId: CONSTANTS.SERVICE_ID
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormState((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(formState);
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
                        <label>Usuario</label>
                        <input
                            type="text"
                            name="username"
                            value={formState.username}
                            onChange={handleChange}
                            className="minecraft-input mb-3" />

                        <label>Contraseña</label>
                        <PasswordInput
                            value={formState.password}
                            onChange={handleChange}
                            name="password"
                            className="mb-4"
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

export default LoginForm;