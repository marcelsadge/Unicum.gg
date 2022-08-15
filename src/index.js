import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ClanMap from './components/ClanMap';
import HomePage from './components/HomePage';
import PlayerPage from './components/PlayerPage';
import SideBar from './components/SideBar';

function Core() {
  return (
    <Router>
      <SideBar />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/clanmap' element={<ClanMap />} />
        <Route path='/playerstat' element={<PlayerPage />} />
      </Routes>
    </Router>
  );
}

ReactDOM.render(<Core />, document.getElementById("root"));