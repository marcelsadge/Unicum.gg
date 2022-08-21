import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ClanMap from './components/ClanMap';
import HomePage from './components/HomePage';
import PageHeader from './components/PageHeader';
import PlayerStatsPage from './components/PlayerPage';

function Core() {
  return (
    <Router>
      <PageHeader />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/clanmap' element={<ClanMap />} />
        <Route path='/playerstat' element={<PlayerStatsPage />} />
      </Routes>
    </Router>
  );
}

ReactDOM.render(<Core />, document.getElementById("root"));