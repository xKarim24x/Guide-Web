import { Route, Routes } from 'react-router-dom';
import './App.css';
import CreateAccountPage from './pages/CreateAccountPage/CreateAccountPage';
import HomePage from './pages/HomePage/HomePage';
import LoginPage from './pages/LoginPage/LoginPage';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/new-user" element={<CreateAccountPage />} />
        <Route path="/home" element={<HomePage />} />
      </Routes>
    </>
  );
}

export default App;
