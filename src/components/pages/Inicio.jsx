import CustomContainer from "../layout/CustomContainer";
import { Col, Row, Modal } from "react-bootstrap";
import { useState } from "react";

const Inicio = () => {
  const [modalShown, setModalShown] = useState(false);

  const copiarIP = () => {
    navigator.clipboard.writeText('miarma.net');
    setModalShown(true);
  };

  return (
    <CustomContainer>
      <h1 className="text-center mb-5">Pasos para unirse al servidor</h1>

      <Row className="g-4 align-items-stretch">
        {[1, 2, 3].map((step) => (
          <Col key={step} sm={12} md={4} className="d-flex">
            <div className="minecraft-card flex-fill d-flex flex-column">

              {/* —— Contenido “arriba” ————————————————————— */}
              <div className="card-body">
                <h1 className="text-center">
                  Paso {step}
                </h1>
                <hr className="minecraft-hr" />

                {step === 1 && (
                  <>
                    <p>Necesitas tener el juego para entrar en el servidor (gracias capitán obvio) así que tienes dos opciones:
                    </p>
                    <ul>
                      <li className="text-start">Comprarlo en la página oficial.</li>
                      <li className="text-start">Descargar el launcher SKLauncher (no recomendado por nosotros pero si no te puedes permitir el oficial es una opción válida).</li>
                    </ul>
                  </>
                )}

                {step === 2 && (
                  <p>
                    Una vez instales el juego, necesitarás descargar el paquete de mods que usamos en el servidor.
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
                  <>
                    <button className="minecraft-btn">Comprar Minecraft</button>
                    <button className="minecraft-btn danger">Descargar SKLauncher</button>
                  </>
                )}
                {step === 2 && (
                  <button className="minecraft-btn">Descargar modpack</button>
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
    </CustomContainer>
  );
};

export default Inicio;
