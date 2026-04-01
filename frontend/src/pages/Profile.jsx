import { useConfig } from "@/hooks/useConfig";
import LoadingIcon from "@/components/util/LoadingIcon";
import { DataProvider } from "@/context/DataContext";
import { useDataContext } from "@/hooks/useDataContext";
import { errorParser } from "@/util/parsers/errorParser";
import PropTypes from "prop-types";
import ContentWrapper from "@/components/layout/ContentWrapper";
import CustomContainer from "@/components/layout/CustomContainer";
import ReactSkinview3d from "react-skinview3d";
import { IdleAnimation } from "skinview3d"
import { useError } from "@/context/ErrorContext";
import { useState } from "react";
import PasswordInput from "@/components/auth/PasswordInput";
import { useAuth } from "@/hooks/useAuth";
import NotificationModal from "@/components/modals/NotificationModal";
import { useData } from "@/hooks/useData";

const Profile = () => {
    const { config, configLoading } = useConfig();
    const { showError } = useError();

    if (configLoading) return <LoadingIcon />;

    const reqConfig = {
        baseUrl: `${config.apiConfig.baseUrl}${config.apiConfig.endpoints.players.playerInfo}`,
        changePasswordUrl: `${config.apiConfig.coreUrl}${config.apiConfig.endpoints.auth.changePassword}`,
        params: {}
    };

    return (
        <DataProvider config={reqConfig} onError={showError}>
            <ProfileContent reqConfig={reqConfig} />
        </DataProvider>
    );
};

const ProfileContent = ({ reqConfig }) => {
    const { data: identity, dataLoading, dataError } = useDataContext();
    const { postData } = useData();
    const { logout } = useAuth();
    const [newPasswordData, setNewPasswordData] = useState({
        oldPassword: "",
        newPassword: "",
        confirmNewPassword: "",
        serviceId: identity?.account?.serviceId
    });
    const [fieldErrors, setFieldErrors] = useState(null);
    const [feedbackModal, setFeedbackModal] = useState(null);
    const closeFeedback = () => setFeedbackModal(null);

    if (dataLoading) return <LoadingIcon />;
    if (dataError) return <div className="alert alert-danger">{errorParser(dataError)}</div>;

    const handleChangePassword = async (e) => {
        if (e) e.preventDefault();

        if (newPasswordData.newPassword !== newPasswordData.confirmNewPassword) {
            setFieldErrors({ confirmNewPassword: "Las contraseñas no coinciden" });
            return;
        }

        try {
            await postData(reqConfig.changePasswordUrl, {
                oldPassword: newPasswordData.oldPassword,
                newPassword: newPasswordData.newPassword,
                serviceId: identity.account.serviceId
            }, false);

            setNewPasswordData({
                oldPassword: "",
                newPassword: "",
                confirmNewPassword: "",
                serviceId: identity.account.serviceId
            });

            setFeedbackModal({
                title: 'Contraseña cambiada',
                message: 'Tu contraseña ha sido cambiada correctamente.',
                variant: 'success',
                onClick: () => {
                    closeFeedback();
                    logout();
                }
            });
        } catch (err) {
            if (err.status === 422 && err.errors) {
                setFieldErrors(err.errors);
                return;
            }

            setFeedbackModal({
                title: 'Error',
                message: `Error ${err.status || 'desconocido'} al cambiar la contraseña`,
                variant: 'danger',
                onClick: () => closeFeedback()
            });
        }
    }

    return (
        <CustomContainer>
            <ContentWrapper>
                <div className="minecraft-card not-animated row">
                    <h1 className="header col-12 mb-4">{identity?.account?.username}</h1>
                    <ReactSkinview3d
                        className="col-4"
                        skinUrl={`https://mineskin.eu/skin/${identity?.account?.username}`}
                        width={250}
                        height={500}
                        onReady={({ viewer }) => {
                            viewer.animation = new IdleAnimation();
                            viewer.autoRotate = true;
                        }}
                    />
                    <div className="col-8">
                        <form onSubmit={handleChangePassword}>
                            <label>Antigua contraseña:</label>
                            <PasswordInput
                                name="oldPassword"
                                className={`mb-1 ${fieldErrors?.oldPassword ? 'is-invalid' : ''}`}
                                value={newPasswordData.oldPassword}
                                onChange={(e) => setNewPasswordData({ ...newPasswordData, [e.target.name]: e.target.value })}
                            />
                            {fieldErrors?.oldPassword && <small className="text-danger d-block">{fieldErrors.oldPassword}</small>}

                            <label className="mt-3">Nueva contraseña:</label>
                            <PasswordInput
                                name="newPassword"
                                className={`mb-1 ${fieldErrors?.newPassword ? 'is-invalid' : ''}`}
                                value={newPasswordData.newPassword}
                                onChange={(e) => setNewPasswordData({ ...newPasswordData, [e.target.name]: e.target.value })}
                            />
                            {fieldErrors?.newPassword && <small className="text-danger d-block">{fieldErrors.newPassword}</small>}

                            <label className="mt-3">Confirmar contraseña:</label>
                            <PasswordInput
                                name="confirmNewPassword"
                                className={`mb-1 ${fieldErrors?.confirmNewPassword ? 'is-invalid' : ''}`}
                                value={newPasswordData.confirmNewPassword}
                                onChange={(e) => setNewPasswordData({ ...newPasswordData, [e.target.name]: e.target.value })}
                            />
                            {fieldErrors?.confirmNewPassword && <small className="text-danger d-block">{fieldErrors.confirmNewPassword}</small>}

                            <button type="submit" className="minecraft-btn mt-3">Cambiar</button>
                        </form>
                    </div>
                </div>
                {feedbackModal && (
                    <NotificationModal
                        show={true}
                        onClose={closeFeedback}
                        title={feedbackModal.title}
                        message={feedbackModal.message}
                        variant={feedbackModal.variant}
                        buttons={[{ label: "Aceptar", variant: feedbackModal.variant, onClick: feedbackModal.onClick }]}
                    />
                )}
            </ContentWrapper>
        </CustomContainer>
    );
};


ProfileContent.propTypes = {
    reqConfig: PropTypes.object
};

export default Profile;
