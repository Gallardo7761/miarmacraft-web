import { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { useConfig } from '@/hooks/useConfig';
import { DataProvider } from '@/context/DataContext';
import { useDataContext } from '@/hooks/useDataContext';

import CustomContainer from '@/components/layout/CustomContainer';
import ContentWrapper from '@/components/layout/ContentWrapper';
import LoadingIcon from '@/components/util/LoadingIcon';
import CustomModal from '@/components/modals/CustomModal';
import ModListByDate from '@/components/mods/ModListByDate';
import Mod from '@/components/mods/Mod';
import { errorParser } from '@/util/parsers/errorParser';

const Mods = () => {
    const { config, configLoading } = useConfig();
    if (configLoading) return <LoadingIcon />;

    const reqConfig = {
        baseUrl: `${config.apiConfig.baseRawUrl}${config.apiConfig.endpoints.mods.all}`,
        params: {
            _sort: 'created_at',
            _order: 'desc',
        },
    };

    return (
        <DataProvider config={reqConfig}>
            <ModsContent reqConfig={reqConfig} />
        </DataProvider>
    );
};

const ModsContent = ({ reqConfig }) => {
    const { data, dataLoading, dataError, postData, putData, deleteData } = useDataContext();
    const [tempMod, setTempMod] = useState(null);
    const [error, setError] = useState(null);
    const [deleteTargetId, setDeleteTargetId] = useState(null);
    const [showModModal, setShowModModal] = useState(false);
    const fileRef = useRef();

    const handleCreate = () => {
        setTempMod({ mod_id: null, name: '', url: '', status: 1 });
        setShowModModal(true);
    };

    const handleCancelCreate = () => {
        setTempMod(null);
        setShowModModal(false);
        setError(null);
    };

    const handleCreateSubmit = async (nuevo) => {
        try {
            const file = fileRef.current?.getSelectedFiles?.()[0];
            if (!file) throw new Error("Falta el archivo .jar");

            const formData = new FormData();
            formData.append('file', file);
            formData.append('data', JSON.stringify(nuevo));

            await postData(reqConfig.baseUrl, formData);
            setTempMod(null);
            setShowModModal(false);
            setError(null);
            fileRef.current?.resetSelectedFiles?.();
        } catch (err) {
            setError(errorParser(err));
        }
    };

    const handleEditSubmit = async (editado, id) => {
        try {
            await putData(`${reqConfig.baseUrl}/${id}`, editado);
            setError(null);
        } catch (err) {
            setError(errorParser(err));
        }
    };

    const handleDelete = async (id) => {
        setDeleteTargetId(id);
    };

    if (dataLoading) return <LoadingIcon />;
    if (dataError) return <p className="text-danger text-center my-5">{dataError}</p>;

    return (
        <CustomContainer>
            <ContentWrapper>
                <button className="minecraft-btn mb-3" onClick={handleCreate}>Nuevo mod</button>

                <ModListByDate
                    mods={data}
                    onUpdate={handleEditSubmit}
                    onDelete={handleDelete}
                    onClearError={() => setError(null)}
                />

                <CustomModal
                    show={showModModal}
                    onClose={handleCancelCreate}
                >
                    <div className="p-4">

                        {error && (
                            <div className="alert alert-danger mb-3" role="alert">
                                {error}
                            </div>
                        )}

                        <ul className="list-unstyled m-0 p-0">
                            <Mod
                                mod={tempMod}
                                isNew
                                fileRef={fileRef}
                                onCreate={handleCreateSubmit}
                                onCancel={handleCancelCreate}
                                onClearError={() => setError(null)}
                            />
                        </ul>
                    </div>
                </CustomModal>

                <CustomModal
                    show={deleteTargetId !== null}
                    onClose={() => setDeleteTargetId(null)}
                >
                    <p className='p-3'>¿Estás seguro de que quieres eliminar este mod?</p>
                    <div className="d-flex justify-content-end gap-2 mt-3 p-3">
                        <button className='minecraft-btn' onClick={() => setDeleteTargetId(null)}>Cancelar</button>
                        <button
                            className='minecraft-btn danger'
                            onClick={async () => {
                                try {
                                    await deleteData(`${reqConfig.baseUrl}/${deleteTargetId}`);
                                    setDeleteTargetId(null);
                                } catch (err) {
                                    setError(errorParser(err));
                                }
                            }}
                        >
                            Eliminar
                        </button>
                    </div>
                </CustomModal>
            </ContentWrapper>
        </CustomContainer>
    );
};

ModsContent.propTypes = {
    reqConfig: PropTypes.shape({
        baseUrl: PropTypes.string.isRequired,
        params: PropTypes.object.isRequired,
    }).isRequired,
};

export default Mods;