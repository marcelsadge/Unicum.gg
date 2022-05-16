import React from 'react';
import ReactDOM from "react-dom";
import HomePage from './components/HomePage';

function Core() {
  return (
    <HomePage 
    />
  );
}

ReactDOM.render(<Core />, document.getElementById("root"));