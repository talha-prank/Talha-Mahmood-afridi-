'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

interface Contact {
  id: string;
  name: string;
  email: string;
  whatsapp: string;
  message: string;
  createdAt: string;
}

export default function AdminPage() {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState('');
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchContacts = async (token = 'admin123') => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/contacts', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) {
        setContacts(data.contacts || []);
      } else {
        setError(data.error || 'Failed to fetch contacts');
      }
    } catch (err: any) {
      setError(err?.message || 'Error loading contacts');
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin123') {
      setIsAuthenticated(true);
      setError('');
      fetchContacts('admin123');
    } else {
      setError('Invalid password. Access restricted to administrator (admin123).');
    }
  };

  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-[#070b14] text-slate-100 flex items-center justify-center p-4">
        <div className="w-full max-w-md p-8 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-white">Admin Control Center</h1>
            <p className="text-xs text-slate-400 mt-1">Talha Mahmood Afridi Portfolio</p>
          </div>

          {error && (
            <div className="mb-4 p-3 rounded-xl bg-rose-950/60 border border-rose-800 text-rose-300 text-xs">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-mono uppercase text-slate-300 mb-1.5">
                Admin Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password (admin123)"
                required
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:border-cyan-400 outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-cyan-600 hover:bg-cyan-500 font-semibold text-xs text-white uppercase tracking-wider transition-all"
            >
              Login
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-slate-800 text-center text-xs text-slate-500">
            <Link href="/" className="hover:text-cyan-400">
              ← Back to Portfolio
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#070b14] text-slate-100 p-6 sm:p-10">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 pb-6 border-b border-slate-800">
          <div>
            <span className="text-xs font-mono uppercase text-cyan-400">Admin Console</span>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mt-1">
              Received Contact Inquiries
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => fetchContacts()}
              className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200 hover:bg-slate-800"
            >
              {loading ? 'Refreshing...' : 'Refresh'}
            </button>
            <button
              onClick={() => setIsAuthenticated(false)}
              className="px-4 py-2 rounded-xl bg-rose-950/40 border border-rose-800 text-xs text-rose-300"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Total Count Card */}
        <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
          <div>
            <p className="text-xs font-mono uppercase text-slate-400">Total Messages in Database</p>
            <p className="text-4xl font-extrabold text-cyan-400 mt-1">{contacts.length}</p>
          </div>
          <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 px-3 py-1 rounded-lg border border-emerald-800">
            MongoDB: contacts
          </span>
        </div>

        {/* Messages Table */}
        <div className="rounded-2xl border border-slate-800 overflow-hidden bg-slate-900/40">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-900 text-slate-400 uppercase font-mono text-[11px] border-b border-slate-800">
                <tr>
                  <th className="px-5 py-3.5">Date</th>
                  <th className="px-5 py-3.5">Name</th>
                  <th className="px-5 py-3.5">Email</th>
                  <th className="px-5 py-3.5">WhatsApp</th>
                  <th className="px-5 py-3.5">Message</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/70">
                {contacts.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-5 py-8 text-center text-slate-500">
                      No messages recorded in database yet.
                    </td>
                  </tr>
                ) : (
                  contacts.map((c) => (
                    <tr key={c.id} className="hover:bg-slate-800/40">
                      <td className="px-5 py-4 font-mono text-slate-400 whitespace-nowrap">
                        {new Date(c.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-5 py-4 font-semibold text-white whitespace-nowrap">
                        {c.name}
                      </td>
                      <td className="px-5 py-4 text-cyan-400 whitespace-nowrap">
                        <a href={`mailto:${c.email}`}>{c.email}</a>
                      </td>
                      <td className="px-5 py-4 whitespace-nowrap">
                        <a
                          href={`https://wa.me/${c.whatsapp.replace(/[^0-9]/g, '')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-emerald-400 hover:underline font-mono"
                        >
                          {c.whatsapp}
                        </a>
                      </td>
                      <td className="px-5 py-4 max-w-md">
                        <div className="whitespace-pre-wrap">{c.message}</div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}
