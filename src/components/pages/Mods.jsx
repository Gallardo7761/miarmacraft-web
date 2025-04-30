import { useState } from 'react';
import { useConfig } from '@/hooks/useConfig';
import { DataProvider } from '@/context/DataContext';
import { useDataContext } from '@/hooks/useDataContext';

import CustomContainer from '@/components/layout/CustomContainer';
import ContentWrapper from '@/components/layout/ContentWrapper';
import LoadingIcon from '@/components/util/LoadingIcon';

import { errorParser } from '@/util/parsers/errorParser';
import CustomModal from '@/components/modals/CustomModal';

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
}

const ModsContent = ({ reqConfig }) => {
    const { data, dataLoading, dataError, postData, putData, deleteData } = useDataContext();
    const [creatingMod, setCreatingMod] = useState(false);
    const [tempMod, setTempMod] = useState(null);
    const [error, setError] = useState(null);
    const [deleteTargetId, setDeleteTargetId] = useState(null);

    const handleCreate = () => {
        setCreatingMod(true);
        setTempMod({
            mod_id: null,
            name: '',
            url: '',
            state: 1
        });
    }

    const handleCancelCreate = () => {
        setCreatingMod(false);
        setTempMod(null);
    }

    const handleCreateSubmit = async (nuevo) => {
        try {
            await postData(nuevo);
            setError(null);
            setCreatingMod(false);
            setTempMod(null);
        } catch (error) {
            setTempMod({ ...nuevo });
            setError(errorParser(error));
        }
    }

    const handleEditSubmit = async (editado, id) => {
        try {
            await putData(`${reqConfig.baseUrl}/${id}`, editado);
            setError(null);
        } catch (error) {
            setError(errorParser(error));
        }
    }

    const handleDelete = async (id) => {
        setDeleteTargetId(id);
    }

    if (dataLoading) return <LoadingIcon />;
    if (dataError) return <p className="text-danger text-center my-5">{dataError}</p>;

    return (
        <CustomContainer>
            <ContentWrapper>

                <h1 className="text-center mt-3 mb-5">Lista de Mods</h1>
                {data && (
                    <p
                        className='text-center'
                        style={{ fontSize: '1.5rem', color: 'lime' }}
                    >
                        Esto funciona illo! Pronto estará lista la web :D
                    </p>
                )}

                {!data && (
                    <p
                        className='text-center'
                        style={{ fontSize: '1.5rem', color: 'tomato' }}
                    >
                        No va :(
                    </p>
                )}

                <CustomModal
                    show={deleteTargetId !== null}
                    onClose={() => setDeleteTargetId(null)}
                >
                    <p className='p-3'>¿Estás seguro de que quieres eliminar este mod?</p>
                    <div className="d-flex justify-content-end gap-2 mt-3 p-3">
                        <button
                            className='minecraft-btn'
                            onClick={() => setDeleteTargetId(null)}
                        >
                            Cancelar
                        </button>
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
}

export default Mods;