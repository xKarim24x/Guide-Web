import { Route, Routes } from 'react-router-dom';
import './App.css';
import CreateAccountPage from './pages/CreateAccountPage/CreateAccountPage';
import LoginPage from './pages/LoginPage/LoginPage';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path='/new-user' element={<CreateAccountPage/>}/>
      </Routes>
    </>
  );
}

export default App;
