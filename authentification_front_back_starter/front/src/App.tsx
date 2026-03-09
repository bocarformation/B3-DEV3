import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { Layout } from './features/base/ui/Layout'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* <Route path="login" element={<LoginForm />} /> */}
          {/* <Route path="register" element={<RegisterForm />} /> */}
          {/* <Route path="projects" element={<Project />} /> */}
          {/* Ajouter ici les autres routes */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App
