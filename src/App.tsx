import { AuthProvider } from '@context/AuthProvider';
import AppLayout from '@layout/AppLayout';
import TestFetchComponent from '@pages/TestFetchComponent';
import * as React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
const HomePage = React.lazy(() => import('@pages/HomePage'));
const LoginPage = React.lazy(() => import('@pages/LoginPage'));

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/test" element={<TestFetchComponent />} />
          <Route path="/" element={<AppLayout />}>
            <Route index element={<HomePage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
