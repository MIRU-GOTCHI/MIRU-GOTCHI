import AppLayout from '@layout/AppLayout';
import * as React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
const HomePage = React.lazy(() => import('@pages/HomePage'));
const LoginPage = React.lazy(() => import('@pages/LoginPage'));
const FormPage = React.lazy(() => import('@pages/formPage/FormPage'));
const HabitDetailPage = React.lazy(() => import('@pages/habitDetailPage/HabitDetailPage'));

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<AppLayout />}>
          <Route index element={<HomePage />} />
          <Route path="new" element={<FormPage />} />
          <Route path="habit">
            <Route path=":id" element={<HabitDetailPage />} />
          </Route>
        </Route>        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
