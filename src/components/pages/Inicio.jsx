import CustomContainer from "@/components/layout/CustomContainer";
import { Col, Row, Modal } from "react-bootstrap";
import { useState } from "react";
import { Link } from "react-router-dom";
import ContentWrapper from "../layout/ContentWrapper";

const Inicio = () => {
  const [modalShown, setModalShown] = useState(false);

  const copiarIP = () => {
    navigator.clipboard.writeText('miarma.net');
    setModalShown(true);
  };

  return (
    <CustomContainer>
      <ContentWrapper>
        <h1 className="text-center mt3 mb-5">Pasos para unirse al servidor</h1>

        <Row className="g-4 align-items-stretch mb-5">
          {[1, 2, 3].map((step) => (
            <Col key={step} sm={12} md={4} className="d-flex">
              <div className="minecraft-card flex-fill d-flex flex-column">

                {/* —— Contenido “arriba” ————————————————————— */}
                <h1 className="header text-center">
                  Paso {step}
                </h1>

                <div className="card-body">
                  {step === 1 && (
                    <>
                      <p>Necesitas tener el juego para entrar en el servidor (gracias capitán obvio) así que tienes dos opciones:
                      </p>
                      <ul>
                        <li className="text-start">Comprarlo en la página oficial.</li>
                        <li className="text-start">Descargar el launcher SKLauncher (no recomendado).</li>
                      </ul>
                    </>
                  )}

                  {step === 2 && (
                    <p>
                      Una vez instales el juego, necesitas descargar el resource pack del server (también lo puedes descargar al entrar). Recomendamos mods de rendimiento que podrás descargar en la web.
                    </p>
                  )}

                  {step === 3 && (
                    <p>Por último solamente te queda copiar la dirección del servidor e introducirla en el juego para conectarte y jugar :D
                    </p>
                  )}
                </div>

                {/* —— Footer con el hr + botones ————————————————— */}
                <div className="card-footer mt-auto d-flex flex-column align-items-center gap-2">
                  <hr className="minecraft-hr w-100" />
                  {step === 1 && (
                    <div className="d-flex flex-column gap-2">
                      <button onClick={() => { window.open("https://minecraft.net/", "_blank"); }} className="minecraft-btn">Comprar Minecraft</button>
                      <button onClick={() => { window.open("/files/miarmacraft/SKLauncher.exe", "_blank"); }} className="minecraft-btn danger">Descargar SKLauncher</button>
                    </div>
                  )}
                  {step === 2 && (
                    <>
                      <Link to="https://miarma.net/files/miarmacraft/mmc_pack.zip" className="minecraft-btn">
                        Resourcepack
                      </Link>
                      <Link to="https://miarma.net/files/miarmacraft/mmc_performance.zip" className="minecraft-btn">
                        Mods rendimiento
                      </Link>
                    </>
                  )}
                  {step === 3 && (
                    <button
                      onClick={() => { copiarIP(); setModalShown(true); }}
                      className="minecraft-btn"
                    >
                      Copiar IP
                    </button>
                  )}
                </div>

              </div>
            </Col>
          ))}
        </Row>


        <Modal show={modalShown} onHide={() => setModalShown(false)}>
          <Modal.Body className="text-center">
            <h1>IP COPIADA</h1>
            <p>Nos vemos dentro del server.</p>
            <button onClick={() => setModalShown(false)} className="minecraft-btn">
              Cerrar
            </button>
          </Modal.Body>
        </Modal>
      </ContentWrapper>
    </CustomContainer>
  );
};

export default Inicio;
