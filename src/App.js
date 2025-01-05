import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/loginPage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/loginPage" element={<LoginPage />} /> 
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;