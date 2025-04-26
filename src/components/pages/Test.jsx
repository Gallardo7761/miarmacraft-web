import { useState } from "react";

const Test = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div style={{ padding: '2rem' }}>
      {/* Header / Títulos */}
      <h1>Prueba de Estilos - H1</h1>
      <h2>Prueba de Estilos - H2</h2>
      <h3>Prueba de Estilos - H3</h3>
      <h4>Prueba de Estilos - H4</h4>
      <h5>Prueba de Estilos - H5</h5>
      <h6>Prueba de Estilos - H6</h6>

      {/* Párrafo */}
      <p>Este es un párrafo usando la fuente de texto normal de Minecraft. Debe ser blanco y con margen inferior.</p>

      {/* HR */}
      <hr className="minecraft-hr" />

      {/* Card */}
      <div className="minecraft-card">
        <h3>Card de prueba</h3>
        <p>Esto es una tarjeta con los estilos de fondo, borde y sombra Minecraft.</p>
      </div>

      {/* Formulario */}
      <div style={{ marginTop: '2rem' }}>
        <h3>Formulario de prueba</h3>
        <form>
          <div style={{ marginBottom: '1rem' }}>
            <label htmlFor="nombre">Nombre:</label>
            <input id="nombre" type="text" className="minecraft-input" placeholder="Escribe tu nombre..." />
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label htmlFor="email">Email:</label>
            <input id="email" type="email" className="minecraft-input" placeholder="correo@example.com" />
          </div>

          <button type="submit" className="minecraft-form-btn">Enviar</button>
        </form>
      </div>

      {/* Botón aparte */}
      <div style={{ marginTop: '2rem' }}>
        <button className="minecraft-form-btn" onClick={() => setModalOpen(true)}>
          Abrir Modal
        </button>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="minecraft-modal">
          <h3>¡Modal abierto!</h3>
          <p>Este es el estilo del modal de Minecraft. Pulsa el botón para cerrarlo.</p>
          <button className="minecraft-form-btn" onClick={() => setModalOpen(false)}>
            Cerrar
          </button>
        </div>
      )}

      {/* Enlaces */}
      <div style={{ marginTop: '2rem' }}>
        <h3>Enlaces de prueba</h3>
        <a href="/" className="header-nav" style={{ display: 'inline-block', marginRight: '1rem' }}>
          Enlace 1
        </a>
        <a href="/" className="header-nav" style={{ display: 'inline-block', marginRight: '1rem' }}>
          Enlace 2
        </a>
      </div>
    </div>
  );
};

export default Test;
