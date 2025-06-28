import Loading from '@common/components/Loading';
import LoginRoute from '@common/LoginRoute';
import PrivateRoute from '@common/PrivateRoute';
import AppLayout from '@layout/AppLayout';
import CharacterDetailPage from '@pages/Character/CharacterDetailPage';
import CharacterPage from '@pages/Character/CharacterPage';
import StyleGuidePage from '@pages/styleGuidePage/StyleGuidePage';
import * as React from 'react';
import { Routes, Route } from 'react-router-dom';
const HomePage = React.lazy(() => import('@pages/HomePage/HomePage'));
const LoginPage = React.lazy(() => import('@pages/LoginPage/LoginPage'));
const FormPage = React.lazy(() => import('@pages/formPage/FormPage'));
const HabitDetailPage = React.lazy(() => import('@pages/habitDetailPage/HabitDetailPage'));

function App() {
  return (
    <React.Suspense fallback={<Loading />}>
      <Routes>
        <Route
          path="/login"
          element={
            <LoginRoute>
              <LoginPage />
            </LoginRoute>
          }
        />
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<HomePage />} />
            <Route path="guide" element={<StyleGuidePage />} />
            <Route path="character" element={<CharacterPage />} />
            <Route path="character/:id" element={<CharacterDetailPage />} />
            <Route path="new" element={<FormPage />} />
            <Route path="habit">
              <Route path=":id" element={<HabitDetailPage />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </React.Suspense>
  );
}

export default App;
