import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar_temp from './components/Navbar_temp';
import Home_temp from './pages/Home_temp';
import Admin from './pages/Admin';
import './styles/globalStyles.css';

function App() {
  return (
    <Router>
      <Navbar_temp />
      <Routes>
        <Route path="/" element={<Home_temp/>} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
      
    </Router>
  );
}

export default App;
