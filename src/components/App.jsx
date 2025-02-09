import '../css/App.css';
import Header from "./Header.jsx";
import Nav from "./Nav.jsx";
import Footer from "./Footer.jsx";
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home.jsx';

const App = () => {
  return (
    <>
      <Header src={"title.png"} />
      <Nav />
      <Routes>
        <Route path="/miarmacraft/" element={<Home />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
