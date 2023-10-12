import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './index.css';
import App from './App';
import Category from './Screens/Category/Category';
import NotFound from './Screens/NotFound/NotFound';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <Routes>
      <Route exact path="/" element={<App/>} />
      <Route path="/category/:name" element={<Category/>} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </Router>
);

document.getElementById('root')