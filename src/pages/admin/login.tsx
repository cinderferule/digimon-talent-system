import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function AdminLogin() {
  const [pin, setPin] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const adminUsername = 'cinderferule';
    const adminPin = process.env.NEXT_PUBLIC_ADMIN_PIN || '1234';

    if (username === adminUsername && pin === adminPin) {
      document.cookie = 'admin_auth=true; path=/';
      localStorage.setItem('admin_username', username);
      router.push('/admin/dashboard');
    } else {
      setError('Invalid username or PIN');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-gray-900 to-black">
      <div className="bg-gray-800 p-8 rounded-lg shadow-2xl w-96">
        <h1 className="text-3xl font-bold text-white mb-6 text-center">Admin Panel</h1>
        {error && <div className="bg-red-500 text-white p-3 rounded-lg mb-4">{error}</div>}
        
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white placeholder-gray-400 mb-4"
          />
          <input
            type="password"
            placeholder="PIN"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white placeholder-gray-400 mb-6"
          />
          <button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 rounded-lg transition"
          >
            Login
          </button>
        </form>

        <div className="mt-6 text-center">
          <Link href="/" className="text-blue-400 hover:text-blue-300 text-sm">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
