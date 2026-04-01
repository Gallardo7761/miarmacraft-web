import { useState } from 'react';
import { useConfig } from '@/hooks/useConfig';
import { DataProvider } from '@/context/DataContext';
import { useDataContext } from '@/hooks/useDataContext';

import CustomContainer from '@/components/layout/CustomContainer';
import ContentWrapper from '@/components/layout/ContentWrapper';
import LoadingIcon from '@/components/util/LoadingIcon';
import CustomModal from '@/components/modals/CustomModal';
import NotificationModal from '@/components/modals/NotificationModal';
import PlayerForm from '@/components/players/PlayerForm';
import { errorParser } from '@/util/parsers/errorParser';
import PropTypes from 'prop-types';
import { generateSecurePassword } from '@/util/passwordGenerator';
import Icons from '@/icons';
import AnimatedDropdown from '@/components/util/AnimatedDropdown';

const Jugadores = () => {
    const { config, configLoading } = useConfig();
    if (configLoading) return <LoadingIcon />;

    const reqConfig = {
        baseUrl: `${config.apiConfig.baseUrl}${config.apiConfig.endpoints.players.all}`,
    };

    return (
        <DataProvider config={reqConfig}>
            <JugadoresContent reqConfig={reqConfig} />
        </DataProvider>
    );
};

const JugadoresContent = ({ reqConfig }) => {
    const { data: players, dataLoading, postData, putData } = useDataContext();

    const [modalState, setModalState] = useState({ show: false, mode: 'create', player: null });
    const [feedback, setFeedback] = useState(null);
    const [fieldErrors, setFieldErrors] = useState(null);

    const handleAdd = () => {
        setFieldErrors(null);
        setModalState({ show: true, mode: 'create', player: null });
    };

    const handleEdit = (player) => {
        setFieldErrors(null);
        setModalState({ show: true, mode: 'edit', player });
    };

    const handleDelete = async (userId) => {
        if (!window.confirm("¿Seguro que quieres eliminar a este jugador?")) return;

        try {
            await postData(`${reqConfig.baseUrl}/${userId}/status`, { status: 0 }, true);
            setFeedback({ title: 'ELIMINADO', message: 'El jugador ha sido desactivado.', variant: 'success' });
        } catch (err) {
            setFeedback({ title: 'ERROR', message: 'No se pudo eliminar.', variant: 'danger' });
        }
    };

    const handleSubmit = async (formData) => {
        setFieldErrors(null);
        try {
            if (modalState.mode === 'create') {
                const finalData = {
                    ...formData,
                    password: formData.password.length === 0 ? generateSecurePassword(8) : formData.password
                };
                const res = await postData(reqConfig.baseUrl, finalData, true);
                setFeedback({
                    title: 'CREADO',
                    message: `Jugador listo. Contraseña: ${res.temporaryPassword}`,
                    variant: 'success'
                });
            } else {
                const updatedData = JSON.parse(JSON.stringify(modalState.player));
                updatedData.user.displayName = formData.displayName;
                updatedData.account.username = formData.username;
                await putData(`${reqConfig.baseUrl}/${modalState.player.user.userId}`, updatedData, true);
                setFeedback({ title: 'ACTUALIZADO', message: 'Datos guardados.', variant: 'success' });
            }
            setModalState({ ...modalState, show: false });
        } catch (err) {
            if (err.status === 422) setFieldErrors(err.errors);
            else setFeedback({ title: 'ERROR', message: errorParser(err), variant: 'danger' });
        }
    };

    const handleResetPassword = async (player) => {
        if (window.confirm(`¿Seguro que quieres resetear la contraseña de ${player.account.username}?`)) {
            try {
                const res = await postData(`${reqConfig.baseUrl}/${player.user.userId}/password`, {}, false);
                setFeedback({ title: 'EXITO', message: `Contraseña reseteada a: ${res.password}`, variant: 'success' });
            } catch (err) {
                setFeedback({ title: 'ERROR', message: 'No se pudo cambiar la contraseña', variant: 'danger' });
            }
        }
    };

    if (dataLoading) return <LoadingIcon />;

    return (
        <CustomContainer>
            <ContentWrapper>
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h1 className="m-0">PANEL DE JUGADORES</h1>
                    <button className="minecraft-btn" onClick={handleAdd}>+ NUEVO</button>
                </div>

                <div className="row g-4">
                    {players?.map(p => (
                        <div key={p.user.userId} className="col-md-6 col-xxl-4">
                            <div className="minecraft-card not-animated h-100 p-3">
                                <div className="d-flex align-items-center gap-3">
                                    <img
                                        src={`https://mineskin.eu/armor/bust/${p.account.username}/64`}
                                        alt="head"
                                        style={{ imageRendering: 'pixelated' }}
                                    />
                                    <div className="flex-grow-1">
                                        <div className="fw-bold" style={{ fontSize: '1.2rem' }}>{p.user.displayName}</div>
                                        <div className="text-muted small">@{p.account.username}</div>
                                    </div>
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
                                                <div className="dropdown-item d-flex align-items-center gap-2" onClick={() => { handleEdit(p); closeDropdown(); }}>
                                                    {Icons.Edit} Editar
                                                </div>
                                                <div className="dropdown-item d-flex align-items-center gap-2" onClick={() => { handleResetPassword(p); closeDropdown(); }}>
                                                    {Icons.Key} Resetear contraseña
                                                </div>
                                                <hr className="dropdown-divider" />
                                                <div className="dropdown-item d-flex align-items-center gap-2" style={{ color: "var(--removed-color)" }} onClick={() => { handleDelete(p.user.userId); closeDropdown(); }}>
                                                    {Icons.TrashRed} Eliminar
                                                </div>
                                            </>
                                        )}
                                    </AnimatedDropdown>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <CustomModal show={modalState.show} onClose={() => setModalState({ ...modalState, show: false })}>
                    <div className="p-3">
                        <h2 className="text-center mb-4">{modalState.mode === 'create' ? 'NUEVO JUGADOR' : 'EDITAR JUGADOR'}</h2>
                        <PlayerForm
                            onSubmit={handleSubmit}
                            onCancel={() => setModalState({ ...modalState, show: false })}
                            errors={fieldErrors}
                            initialData={modalState.player}
                            isEdit={modalState.mode === 'edit'}
                        />
                    </div>
                </CustomModal>

                {feedback && (
                    <NotificationModal
                        show={true}
                        title={feedback.title}
                        message={feedback.message}
                        variant={feedback.variant}
                        onClose={() => setFeedback(null)}
                    />
                )}
            </ContentWrapper>
        </CustomContainer>
    );
};

JugadoresContent.propTypes = {
    reqConfig: PropTypes.object
};

export default Jugadores;