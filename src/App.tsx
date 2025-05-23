
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Toaster } from 'sonner';
import './App.css';
import { AuthProvider } from './contexts/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Coaches from './pages/Coaches';
import Players from './pages/Players';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';
import AdminDashboard from './pages/AdminDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import Unauthorized from './pages/Unauthorized';
import CoachDetails from './pages/CoachDetails';
import PlayerDetails from './pages/PlayerDetails';
import AddPlayer from './pages/admin/AddPlayer';
import AddCoach from './pages/admin/AddCoach';
import AddGallery from './pages/admin/AddGallery';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen bg-gray-50">
          <Toaster />
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<Home />} />
            <Route path="/coaches" element={<Coaches />} />
            <Route path="/coaches/:id" element={<CoachDetails />} />
            <Route path="/players" element={<Players />} />
            <Route path="/players/:id" element={<PlayerDetails />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/unauthorized" element={<Unauthorized />} />
            
            {/* Admin Routes */}
            <Route path="/admin" element={
              <ProtectedRoute requireAdmin>
                <AdminDashboard />
              </ProtectedRoute>
            } />
            <Route path="/admin/players/add" element={
              <ProtectedRoute requireAdmin>
                <AddPlayer />
              </ProtectedRoute>
            } />
            <Route path="/admin/coaches/add" element={
              <ProtectedRoute requireAdmin>
                <AddCoach />
              </ProtectedRoute>
            } />
            <Route path="/admin/gallery/add" element={
              <ProtectedRoute requireAdmin>
                <AddGallery />
              </ProtectedRoute>
            } />
            
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
