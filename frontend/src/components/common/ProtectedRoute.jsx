import { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { authService } from '../../services/authService';
import { Loader2 } from 'lucide-react';

export default function ProtectedRoute({ children, allowedRoles = [] }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    let mounted = true;
    const checkAuth = async () => {
      try {
        const sessionUser = await authService.getUser();
        if (sessionUser) {
          const profile = await authService.getUserProfile(sessionUser.id);
          if (mounted) setUser({ ...sessionUser, ...profile });
        }
      } catch (err) {
        console.error('Auth error:', err);
      } finally {
        if (mounted) setLoading(false);
      }
    };
    checkAuth();
    return () => { mounted = false; };
  }, []);

  if (loading) {
    return (
      <div className="h-screen w-screen flex flex-col items-center justify-center bg-background text-primary">
        <Loader2 size={40} className="animate-spin mb-4" />
        <p className="font-bold text-sm">Memeriksa Sesi...</p>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}
