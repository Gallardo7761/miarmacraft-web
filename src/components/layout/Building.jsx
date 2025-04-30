import CustomContainer from '@/components/layout/CustomContainer';
import { Row, Col } from 'react-bootstrap';

const Building = () => {
  return (
    <CustomContainer>
      <Row className="justify-content-center">
        <Col xs={12} md={6} className="d-flex">
          <div className="minecraft-card text-center flex-fill p-5">
            <img
              src="/images/building.webp"
              alt="Página en construcción"
              className="construction-img img-fluid mb-4"
            />
            <h1>Pagina en construccion</h1>
            <p>Estamos trabajando en ello. ¡Vuelve pronto!</p>
          </div>
        </Col>
      </Row>
    </CustomContainer>
  );
};

export default Building;
