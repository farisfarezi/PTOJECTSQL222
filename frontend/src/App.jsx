import { useState, useEffect } from 'react';
import AppRoutes from './routes/AppRoutes';

function App() {
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Check if Supabase credentials are available
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
      setError(
        'Supabase credentials not configured. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY environment variables.'
      );
      return;
    }

    setIsReady(true);
  }, []);

  if (error) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#f3f4f6',
        padding: '20px',
      }}>
        <div style={{
          maxWidth: '600px',
          backgroundColor: 'white',
          padding: '40px',
          borderRadius: '8px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          textAlign: 'center',
        }}>
          <h1 style={{ color: '#dc2626', marginBottom: '16px' }}>⚠️ Configuration Error</h1>
          <p style={{ color: '#6b7280', marginBottom: '20px' }}>{error}</p>
          <p style={{ color: '#6b7280', fontSize: '14px' }}>
            Contact the administrator or check the deployment configuration.
          </p>
        </div>
      </div>
    );
  }

  if (!isReady) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#f3f4f6',
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: '40px',
            height: '40px',
            border: '4px solid #e5e7eb',
            borderTop: '4px solid #3b82f6',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 20px',
          }} />
          <p style={{ color: '#6b7280' }}>Loading...</p>
        </div>
        <style>{`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <AppRoutes />
  );
}

export default App;
