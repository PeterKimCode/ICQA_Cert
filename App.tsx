import React, { createContext, useContext, useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { CertificateEditor } from './pages/CertificateEditor';
import { GuestSearch } from './pages/GuestSearch';
import { GuestView } from './pages/GuestView';
import { User, UserRole } from './types';
import { MOCK_USERS } from './constants';

// --- Auth Context ---
interface AuthContextType {
  user: User | null;
  login: (email: string, pass: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>(null!);

export const useAuth = () => useContext(AuthContext);

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check localStorage for session persistence logic (simplified)
    const stored = localStorage.getItem('icqa_user');
    if (stored) setUser(JSON.parse(stored));
  }, []);

  const login = (email: string, pass: string) => {
    const found = MOCK_USERS.find(u => u.email === email && u.password === pass);
    if (found) {
      // Remove password from state
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...safeUser } = found;
      setUser(safeUser);
      localStorage.setItem('icqa_user', JSON.stringify(safeUser));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('icqa_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// --- Protected Route ---
const ProtectedRoute: React.FC<{ children: React.ReactElement }> = ({ children }) => {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/" replace />;
  }
  return children;
};

// --- Main App ---
const App: React.FC = () => {
  return (
    <AuthProvider>
      <HashRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Login />} />
          <Route path="/guest" element={<GuestSearch />} />
          <Route path="/guest/view/:id" element={<GuestView />} />

          {/* Protected Routes (Staff/Admin) */}
          <Route element={<ProtectedRoute><Layout /></ProtectedRoute>}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/certificate/new" element={<CertificateEditor />} />
            <Route path="/certificate/edit/:id" element={<CertificateEditor />} />
          </Route>
        </Routes>
      </HashRouter>
    </AuthProvider>
  );
};

export default App;