import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignupPage1 from './pages/signupPage1';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/signupPage1" element={<SignupPage1 />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
