import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './index.css';
import App from './App';
import Category from './Screens/Category/Category';
import Animal from './Screens/Animal/Animal';
import NotFound from './Screens/NotFound/NotFound';
import { NavigationProvider } from './ContextProvider/NavigationContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Router>
      <NavigationProvider>
        <Routes>
          <Route exact path="/" element={<App/>} />
          <Route path="/category/:name" element={<Category/>} />
          <Route path="/category/:cat/animal/:id" element={<Animal />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </NavigationProvider>
    </Router>
);

document.getElementById('root')