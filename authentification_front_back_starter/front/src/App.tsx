import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { Layout } from './features/base/ui/Layout'
import { RegisterForm } from './features/auth/ui/RegisterForm';
import { LoginForm } from './features/auth/ui/LoginForm';
import AnalyticsDashboard from './features/dashboard/ui/AnalyticsDashboard';
import { lazy, Suspense } from 'react';
import { Center, Spinner } from '@chakra-ui/react';

const Project = lazy(() => import ("./features/projects/ui/Project"))

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="login" element={<LoginForm />} />
          <Route path="register" element={<RegisterForm/>} />
          <Route path="dashboard" element={<AnalyticsDashboard />} />
          <Route path="projects" element={
            <Suspense fallback={<Center py={20}><Spinner size={"xl"} /></Center>}>
              <Project />
            </Suspense>
          
          } />
          {/* Ajouter ici les autres routes */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App
