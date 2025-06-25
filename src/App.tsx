import FormPage from '@pages/FormPage';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
const HomePage = React.lazy(() => import('@pages/HomePage'));
const LoginPage = React.lazy(() => import('@pages/LoginPage'));

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/new" element={<FormPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
