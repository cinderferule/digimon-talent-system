import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import KeystoneCard from '@/components/KeystoneCard';
import UserProfile from '@/components/UserProfile';

interface Keystone {
  id: string;
  name: string;
  color: string;
  imageUrl?: string;
}

export default function Home() {
  const [keystones, setKeystones] = useState<Keystone[]>([]);
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    fetchKeystones();
    const savedUsername = localStorage.getItem('username');
    if (savedUsername) {
      setUsername(savedUsername);
      setIsLoggedIn(true);
    }
    setLoading(false);
  }, []);

  const fetchKeystones = async () => {
    const { data, error } = await supabase
      .from('keystones')
      .select('*')
      .order('order', { ascending: true });

    if (error) {
      console.error('Error fetching keystones:', error);
      return;
    }

    setKeystones(data || []);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      localStorage.setItem('username', username);
      setIsLoggedIn(true);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-gray-900 to-black">
        <div className="text-white text-2xl">Loading...</div>
      </div>
    );
  }

  if (!isLoggedIn) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-gray-900 to-black">
        <div className="bg-gray-800 p-8 rounded-lg shadow-2xl w-96">
          <h1 className="text-3xl font-bold text-white mb-6 text-center">Digimon Talent System</h1>
          <form onSubmit={handleLogin}>
            <input
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white placeholder-gray-400 mb-4"
            />
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded-lg transition"
            >
              Enter
            </button>
          </form>
          <div className="mt-6 text-center">
            <Link href="/admin/login" className="text-blue-400 hover:text-blue-300 text-sm">
              Admin Panel
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black">
      <UserProfile username={username} />
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-white mb-2 text-center">Digimon Talent Trees</h1>
        <p className="text-gray-400 text-center mb-12">Select a keystone to view and customize your talent tree</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {keystones.map((keystone) => (
            <KeystoneCard key={keystone.id} keystone={keystone} username={username} />
          ))}
        </div>
      </div>
    </div>
  );
}
