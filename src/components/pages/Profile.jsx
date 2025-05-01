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

const Profile = () => {
    const { config, configLoading } = useConfig();
    if (configLoading) return <LoadingIcon />;

    const reqConfig = {
        baseUrl: `${config.apiConfig.baseUrl}${config.apiConfig.endpoints.players.playerInfo}`,
        changePassword: `${config.apiConfig.baseUrl}${config.apiConfig.endpoints.auth.changePassword}`,
        params: {}
    };

    return (
        <DataProvider config={reqConfig}>
            <ProfileContent reqConfig={reqConfig} />
        </DataProvider>
    );
};

const ProfileContent = ({ reqConfig }) => {
    const { data, dataLoading, dataError } = useDataContext();
    if (dataLoading) return <LoadingIcon />;
    if (dataError) return <div className="alert alert-danger">{errorParser(dataError)}</div>;

    const handleChangePassword = async (e) => {

    }

    return (
        <CustomContainer>
            <ContentWrapper>
                <div className="minecraft-card row">
                    <h1 className="header col-12 mb-4">{data.user_name}</h1>
                    <ReactSkinview3d
                        className="col-4"
                        skinUrl={`https://mineskin.eu/skin/${data.user_name}`}
                        width={250}
                        height={500}
                        onReady={({viewer}) => {
                            viewer.animation = new IdleAnimation();
                            viewer.autoRotate = true;
                        }} 
                    />
                    <div className="col-8">
                        <form onSubmit={handleChangePassword}>
                            <label>Antigua contraseña:</label>
                            <input disabled name="latestPass" type="text" className="minecraft-input mb-4" />
                            <label>Nueva contraseña:</label>
                            <input disabled name="newPass" type="text" className="minecraft-input mb-4" />
                            <label>Confirmar contraseña:</label>
                            <input disabled name="newPassConfirm" type="text" className="minecraft-input mb-4" />
                            <button disabled type="submit" className="minecraft-btn">Cambiar</button>
                        </form>
                    </div>
                </div>
            </ContentWrapper>
        </CustomContainer>
    );
};


ProfileContent.propTypes = {
    reqConfig: PropTypes.object
};

export default Profile;
