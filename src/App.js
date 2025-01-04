import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './pages/loginPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/loginPage" element={<LoginPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;