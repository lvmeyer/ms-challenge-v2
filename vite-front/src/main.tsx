import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';

import App from './App.tsx';
import Home from './(default)/page.tsx';
import './index.css';

const Router = () => {
  return (
    <BrowserRouter>
      <Route path="/home" element={<Home />} />
      <Route path="/" element={<App />} />
    </BrowserRouter>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <Router />
  </React.StrictMode>,
  document.getElementById('root')
);
