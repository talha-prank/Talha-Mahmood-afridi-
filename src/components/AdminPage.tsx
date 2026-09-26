import React, { useState, useEffect } from 'react';
import { X, Lock, RefreshCw, Trash2, Database, Shield, AlertCircle } from 'lucide-react';

interface AdminPageProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
}

export const AdminPage: React.FC<AdminPageProps> = ({ isOpen, onClose }) => {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [contacts, setContacts] = useState<ContactSubmission[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [dbStatus, setDbStatus] = useState<string>('checking...');

  useEffect(() => {
    if (isOpen) {
      checkHealth();
    }
  }, [isOpen]);

  const checkHealth = async () => {
    try {
      const res = await fetch('/api/health');
      const data = await res.json();
      setDbStatus(data.database || 'active');
    } catch {
      setDbStatus('active');
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin123' || password === 'admin') {
      setIsAuthenticated(true);
      fetchContacts();
    } else {
      setError('Invalid password. Default is admin123');
    }
  };

  const fetchContacts = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/admin/contacts?password=admin123');
      const data = await res.json();
      if (data.contacts) {
        setContacts(data.contacts);
      } else {
        setContacts([]);
      }
    } catch (err: any) {
      setError(err?.message || 'Error loading contacts');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
      <div className="relative w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-800 bg-slate-950/60">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/10 flex items-center justify-center text-cyan-400">
              <Shield className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">
                Admin Console — Contacts Database
              </h3>
              <p className="text-[11px] font-mono text-slate-400">
                Database Engine: <span className="text-cyan-400">{dbStatus}</span>
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1">
          {!isAuthenticated ? (
            <div className="max-w-sm mx-auto py-12 text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 mx-auto">
                <Lock className="w-6 h-6" />
              </div>
              <h4 className="text-base font-bold text-white">Admin Authentication</h4>
              <p className="text-xs text-slate-400">Enter password to view MongoDB contact inquiries.</p>
              
              <form onSubmit={handleLogin} className="space-y-3">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password (default: admin123)"
                  className="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-950 border border-slate-700 text-white outline-none focus:border-cyan-400"
                />
                {error && <p className="text-xs text-rose-400">{error}</p>}
                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl text-xs font-semibold bg-cyan-500 hover:bg-cyan-400 text-slate-950 cursor-pointer"
                >
                  Unlock Database
                </button>
              </form>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <span className="text-xs font-mono text-slate-400">
                  Total Records: {contacts.length}
                </span>
                <button
                  onClick={fetchContacts}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs flex items-center gap-1.5 cursor-pointer"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
                  <span>Refresh</span>
                </button>
              </div>

              {contacts.length === 0 ? (
                <div className="text-center py-12 text-slate-500 text-xs font-mono">
                  No contact submissions in database yet.
                </div>
              ) : (
                <div className="space-y-3">
                  {contacts.map((c, i) => (
                    <div
                      key={c.id || i}
                      className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-white text-xs sm:text-sm">{c.name}</span>
                        <span className="text-[11px] font-mono text-slate-500">
                          {c.createdAt ? new Date(c.createdAt).toLocaleString() : 'Recent'}
                        </span>
                      </div>
                      <div className="text-xs text-cyan-400 font-mono">{c.email}</div>
                      <p className="text-xs text-slate-300 leading-relaxed bg-slate-900/60 p-3 rounded-lg border border-slate-800/80">
                        {c.message}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
