import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Header from './components/Header';
import HeaderMenu from './components/HeaderMenu'
import Title from './components/Title';
import RTNoisePage from './pages/RTNoisePage';
import RHNoisePage from './pages/RHNoisePage';
import SGHNoisePage from './pages/SGHNoisePage';
import MCNoisePage from './pages/MCNoisePage';
import OAMenuPage from './pages/OAMenuPage';
import ManageResidentsPage from './pages/ManageResidentsPage';
import NotFound from './pages/NotFound';
import Login from './pages/signPages/Login';
import Register from './pages/signPages/Register';
import { AuthProvider } from './context/AuthContext';
import AlarmsPage from './pages/AlarmsPage';
import ReportNoise from './components/report/ReportNoise';
import EditPost from './pages/EditPost';
import NewPost from './pages/NewPost';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AuthProvider>
          <Header />
          <HeaderMenu />
          <Title />
          <Routes>
            <Route path='/' element={<MCNoisePage/>} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/rtnoise' element={<RTNoisePage />} />
            <Route path='/mcnoise' element={<MCNoisePage />} />
            <Route path='/rhnoise' element={<RHNoisePage />} />
            <Route path='/sghnoise' element={<AlarmsPage />} />
            <Route path='/manages' element={<ReportNoise />} />
            <Route path='/oamenu' element={<OAMenuPage />} />
            <Route path='/alarms' element={<AlarmsPage />} />
            <Route path='/newPost' element={<NewPost />} />
            <Route path='/editPost' element={<EditPost/>} />
            <Route path='/*' element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
