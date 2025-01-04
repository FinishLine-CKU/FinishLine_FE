import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignupPage1 from './pages/signupPage1';
import SignupPage2 from './pages/signupPage2';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/signupPage1" element={<SignupPage1 />} />
          <Route path="/signupPage2" element={<SignupPage2 />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
