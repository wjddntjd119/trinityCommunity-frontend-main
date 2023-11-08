import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import HeaderMenu from './components/HeaderMenu'
import Title from './components/Title';
import RTNoisePage from './pages/RTNoisePage';
import RHNoisePage from './pages/RHNoisePage';
import MCNoisePage from './pages/MCNoisePage';
import OAMenuPage from './pages/OAMenuPage';
import NotFound from './pages/NotFound';
import Login from './pages/signPages/Login';
import Register from './pages/signPages/Register';
import { AuthProvider } from './context/AuthContext';
import AlarmsPage from './pages/AlarmsPage';
import ReportNoise from './components/report/ReportNoise';
import EditPost from './components/posts/EditPost';
import NewPost from './components/posts/NewPost';
import PostItem from './components/posts/PostItem';
import Post from './components/posts/Post';
import Edit from './components/posts/Edit';

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
            <Route path='/post/:id' element={<Post />} />
            <Route path='/edit/:id' element={<Edit />} />
            <Route path='/newPost' element={<NewPost />} />
            <Route path='/editPost' element={<EditPost/>} />
            <Route path='/postItem' element={<PostItem />} />
            <Route path='/*' element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
