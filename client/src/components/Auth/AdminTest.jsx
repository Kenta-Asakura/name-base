// client/src/components/AdminTest.jsx
import { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

function AdminTest() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const { getAccessTokenSilently } = useAuth0();

  // !TEST
  const [tokenInfo, setTokenInfo] = useState(null);

  const testAdminAccess = async () => {
    try {
      setLoading(true);
      const token = await getAccessTokenSilently();
      console.log(token);

      const response = await fetch(`${import.meta.env.VITE_API_URL}/admin/test`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
        
      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error('Error testing admin access:', error);
      setResult({
        success: false,
        message: 'Error: ' + error.message
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card bg-base-100 shadow-xl mt-6">
      <div className="card-body">
        <h2 className="card-title">Admin Access Test</h2>
        <p className="mb-4">Click the button below to test if you have admin privileges:</p>
        
        <button 
          className="btn btn-primary w-full"
          onClick={testAdminAccess}
          disabled={loading}
        >
          {loading ? <span className="loading loading-spinner"></span> : 'Test Admin Access'}
        </button>
        
        {result && (
          <div className={`mt-4 p-4 rounded-lg ${result.success ? 'bg-success/20' : 'bg-error/20'}`}>
            <h3 className={`font-bold ${result.success ? 'text-success' : 'text-error'}`}>
              {result.success ? 'Success!' : 'Access Denied'}
            </h3>
            <p>{result.message}</p>
            {result.user && (
              <div className="mt-2 text-sm">
                <p>User ID: {result.user.sub}</p>
                <p>Email: {result.user.email}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminTest;