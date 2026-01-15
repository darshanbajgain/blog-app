import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import BlogPostDetails from './pages/BlogPostDetails';
import Dashboard from './pages/Dashboard';
import { ProtectedRoute } from './routes/ProtectedRoutes';
import { PublicRoute } from './routes/PublicRoutes';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/blog/:id" element={<BlogPostDetails />} />

        <Route element={<PublicRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
        </Route>

        {/* Protected Routes (Accessible only if logged in) */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>

        {/* Catch all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;