import LoginRoute from '@common/LoginRoute';
import PrivateRoute from '@common/PrivateRoute';
import AppLayout from '@layout/AppLayout';
import CharacterDetailPage from '@pages/Character/CharacterDetailPage';
import CharacterPage from '@pages/Character/CharacterPage';
import FormPage from '@pages/formPage/FormPage';
import HabitDetailPage from '@pages/habitDetailPage/HabitDetailPage';
import HabitListPage from '@pages/HabitPage/HabitListPage';
import HomePage from '@pages/HomePage/HomePage';
import LoginPage from '@pages/LoginPage/LoginPage';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
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
          <Route path="character" element={<CharacterPage />} />
          <Route path="character/:id" element={<CharacterDetailPage />} />
          <Route path="new" element={<FormPage />} />
          <Route path="habit">
            <Route index element={<HabitListPage />} />
            <Route path=":id" element={<HabitDetailPage />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
