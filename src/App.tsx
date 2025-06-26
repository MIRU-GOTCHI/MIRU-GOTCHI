import { AuthProvider } from '@context/AuthProvider';
import AppLayout from '@layout/AppLayout';
import CharacterDetailPage from '@pages/Character/CharacterDetailPage';
import CharacterPage from '@pages/Character/CharacterPage';
import StyleGuidePage from '@pages/styleGuidePage/StyleGuidePage';
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
            <Route path="guide" element={<StyleGuidePage />} />
            <Route path="character" element={<CharacterPage />} />
            <Route path="character/:id" element={<CharacterDetailPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
