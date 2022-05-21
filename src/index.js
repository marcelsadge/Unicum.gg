import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ClanMap from './components/ClanMap';
import HomePage from './components/HomePage';

function Core() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/clanmap' element={<ClanMap />} />
      </Routes>
    </Router>
  );
}

ReactDOM.render(<Core />, document.getElementById("root"));