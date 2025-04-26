// Componente genérico para cada paso
const StepSection = ({ title, description, children, imgSrc, bgSrc, reverse }) => (
  <section
    className="min-vh-100 d-flex align-items-center justify-content-center bg-cover bg-center"
    style={{ backgroundImage: `url('${bgSrc}')` }}
  >
    <div className="minecraft-card container p-5 mx-3">
      <div className={`row align-items-center ${reverse ? 'flex-row-reverse' : ''}`}>
        <div className="col-md-6">
          <h2 className="display-4 mb-4">{title}</h2>
          <p className="lead mb-4">{description}</p>
          {children}
        </div>
        <div className="col-md-6 text-center">
          <img
            src={imgSrc}
            alt={title}
            className="img-fluid rounded"
            style={{ maxWidth: '300px' }}
          />
        </div>
      </div>
    </div>
  </section>
);

const Inicio = () => {
  const copiarIP = () => {
    navigator.clipboard.writeText('miarma.net')
      .then(() => alert('IP copiada al portapapeles: miarma.net'))
      .catch(() => alert('Error al copiar la IP'));
  };

  return (
    <main className="min-vh-100 d-flex flex-column p-0 m-0">
      <StepSection
        title="1. Descarga el Launcher"
        description="Para comenzar tu aventura en MiarmaCraft, descarga nuestro launcher oficial o la versión piratilla. ¡Elige y empieza ya!"
        imgSrc="/miarmacraft/images/launcher.png"
        bgSrc="/miarmacraft/images/launcher_bg.jpg"
      >
        <div className="d-flex gap-3">
          <a href="#" className="minecraft-btn">Launcher Oficial</a>
          <a href="#" className="minecraft-btn">Launcher Piratilla XD</a>
        </div>
      </StepSection>

      <hr className="minecraft-hr" />

      <StepSection
        title="2. Configura y Descarga el Modpack"
        description="Aumenta la RAM del juego a 4 GB o más y descarga nuestro modpack exclusivo para disfrutar al máximo de MiarmaCraft."
        imgSrc="/miarmacraft/images/modpack.png"
        bgSrc="/miarmacraft/images/modpack_bg.jpg"
        reverse
      >
        <a href="#" className="minecraft-btn">Descargar Modpack</a>
      </StepSection>

      <hr className="minecraft-hr" />

      <StepSection
        title="3. Copia la IP"
        description="Copia la IP de nuestro servidor y pégala en el launcher para unirte a la partida."
        imgSrc="/miarmacraft/images/server.png"
        bgSrc="/miarmacraft/images/ip_bg.jpg"
      >
        <button onClick={copiarIP} className="minecraft-btn">
          Copiar IP: miarma.net
        </button>
      </StepSection>
    </main>
  );
};

export default Inicio;