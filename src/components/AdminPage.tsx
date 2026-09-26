import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  Trash2, 
  MessageSquare, 
  Mail, 
  RefreshCw, 
  Download, 
  Search, 
  Clock, 
  Database, 
  ArrowLeft, 
  CheckCircle2, 
  AlertCircle,
  ExternalLink,
  Phone,
  User,
  Inbox
} from 'lucide-react';

interface ContactRecord {
  id: string;
  name: string;
  email: string;
  whatsapp: string;
  message: string;
  createdAt: string | Date;
}

interface AdminPageProps {
  onBackToPortfolio: () => void;
}

export const AdminPage: React.FC<AdminPageProps> = ({ onBackToPortfolio }) => {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem('tma_admin_auth') === 'admin123';
  });
  const [authError, setAuthError] = useState('');
  const [contacts, setContacts] = useState<ContactRecord[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [dbStatus, setDbStatus] = useState<string>('Checking...');
  const [actionSuccess, setActionSuccess] = useState<string | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin123') {
      setIsAuthenticated(true);
      sessionStorage.setItem('tma_admin_auth', 'admin123');
      setAuthError('');
      fetchContacts('admin123');
    } else {
      setAuthError('Invalid password. Access restricted to administrator (admin123).');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('tma_admin_auth');
    setPassword('');
  };

  const fetchContacts = async (token = 'admin123') => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/admin/contacts', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!res.ok) {
        throw new Error('Failed to load contacts');
      }

      const data = await res.json();
      if (data.success) {
        setContacts(data.contacts || []);
        setDbStatus(data.database || 'Active');
      }
    } catch (err: any) {
      console.error('Failed to fetch admin contacts:', err);
      // Fallback to local storage if API route is loading
      try {
        const local = JSON.parse(localStorage.getItem('tma_portfolio_inquiries') || '[]');
        if (local.length > 0) {
          setContacts(local.map((item: any) => ({
            id: String(item.id || item._id),
            name: item.name,
            email: item.email,
            whatsapp: item.whatsapp || item.phone || 'N/A',
            message: item.message,
            createdAt: item.date || item.createdAt || new Date().toISOString()
          })));
          setDbStatus('Local Storage Cache');
        }
      } catch {
        // Ignored
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchContacts();
    }
  }, [isAuthenticated]);

  const handleDeleteContact = async (id: string, name: string) => {
    if (!window.confirm(`Are you sure you want to delete message from ${name}?`)) {
      return;
    }

    try {
      const res = await fetch(`/api/admin/contacts/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': 'Bearer admin123'
        }
      });

      if (res.ok) {
        setContacts(prev => prev.filter(c => c.id !== id));
        setActionSuccess(`Message from ${name} deleted.`);
        setTimeout(() => setActionSuccess(null), 3000);
      }
    } catch (err) {
      // Also delete from local fallback
      setContacts(prev => prev.filter(c => c.id !== id));
      try {
        const local = JSON.parse(localStorage.getItem('tma_portfolio_inquiries') || '[]');
        const updated = local.filter((item: any) => String(item.id) !== id);
        localStorage.setItem('tma_portfolio_inquiries', JSON.stringify(updated));
      } catch {}
    }
  };

  const exportToCSV = () => {
    if (contacts.length === 0) return;
    const headers = ['ID', 'Name', 'Email', 'WhatsApp', 'Message', 'Created At'];
    const rows = contacts.map(c => [
      `"${c.id}"`,
      `"${c.name.replace(/"/g, '""')}"`,
      `"${c.email.replace(/"/g, '""')}"`,
      `"${c.whatsapp.replace(/"/g, '""')}"`,
      `"${c.message.replace(/"/g, '""').replace(/\n/g, ' ')}"`,
      `"${new Date(c.createdAt).toLocaleString()}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `talha_portfolio_contacts_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredContacts = contacts.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.whatsapp.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.message.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // If not authenticated, render clean password login screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#070b14] text-slate-100 flex items-center justify-center p-4">
        <div className="w-full max-w-md p-8 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl shadow-cyan-950/40 relative overflow-hidden">
          <div className="text-center mb-8">
            <div className="w-14 h-14 rounded-2xl bg-cyan-950/80 border border-cyan-800/60 flex items-center justify-center mx-auto text-cyan-400 mb-4 shadow-lg shadow-cyan-900/30">
              <Lock className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-white font-heading">
              Admin Control Center
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Talha Mahmood Afridi Portfolio · Messages Database
            </p>
          </div>

          {authError && (
            <div className="mb-4 p-3 rounded-xl bg-rose-950/60 border border-rose-800 text-rose-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{authError}</span>
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
                placeholder="Enter password (default: admin123)"
                required
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 outline-none transition-colors"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-cyan-600 hover:bg-cyan-500 font-semibold text-xs text-white uppercase tracking-wider transition-all shadow-md shadow-cyan-900/30 cursor-pointer"
            >
              Authenticate &amp; View Database
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-slate-800 flex justify-between items-center text-xs text-slate-500">
            <span>Passcode: <code className="text-cyan-400 font-mono">admin123</code></span>
            <button
              onClick={onBackToPortfolio}
              className="hover:text-cyan-300 flex items-center gap-1 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Portfolio</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 p-4 sm:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Top Header & Navigation */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <button
              onClick={onBackToPortfolio}
              className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition-colors cursor-pointer"
              title="Return to Main Portfolio"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono uppercase text-cyan-400 bg-cyan-950/70 border border-cyan-800/60 px-2 py-0.5 rounded">
                  ADMIN CONSOLE
                </span>
                <span className="text-xs text-slate-400">· Protected View</span>
              </div>
              <h1 className="text-2xl font-bold tracking-tight text-white font-heading mt-1">
                Incoming Contacts &amp; Inquiries Database
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => fetchContacts()}
              disabled={isLoading}
              className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-cyan-400 ${isLoading ? 'animate-spin' : ''}`} />
              <span>Refresh</span>
            </button>

            <button
              onClick={exportToCSV}
              className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-cyan-400" />
              <span>Export CSV</span>
            </button>

            <button
              onClick={handleLogout}
              className="px-3.5 py-2 rounded-xl bg-rose-950/40 hover:bg-rose-900/50 text-rose-300 border border-rose-800 text-xs font-medium transition-colors cursor-pointer"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Action toast notification */}
        {actionSuccess && (
          <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-800 text-emerald-300 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{actionSuccess}</span>
          </div>
        )}

        {/* Database & Message Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
            <div>
              <p className="text-xs font-mono uppercase text-slate-400">Total Inquiries Received</p>
              <p className="text-3xl font-extrabold text-white mt-1">{contacts.length}</p>
              <p className="text-[11px] text-cyan-400 mt-0.5">Contacts collection</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-cyan-950/60 border border-cyan-800/40 flex items-center justify-center text-cyan-400">
              <Inbox className="w-6 h-6" />
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
            <div>
              <p className="text-xs font-mono uppercase text-slate-400">Active Storage Provider</p>
              <p className="text-base font-bold text-emerald-400 mt-1">{dbStatus}</p>
              <p className="text-[11px] text-slate-400 mt-0.5">MongoDB /contacts model</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-emerald-950/60 border border-emerald-800/40 flex items-center justify-center text-emerald-400">
              <Database className="w-6 h-6" />
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
            <div>
              <p className="text-xs font-mono uppercase text-slate-400">Security Credentials</p>
              <p className="text-base font-bold text-white mt-1">Bearer Auth Active</p>
              <p className="text-[11px] text-slate-400 mt-0.5">Protected route /api/admin/*</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-purple-950/60 border border-purple-800/40 flex items-center justify-center text-purple-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by name, email, WhatsApp number, or keyword in message..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900/90 border border-slate-800 text-xs sm:text-sm text-white placeholder-slate-500 focus:border-cyan-400 outline-none transition-colors"
          />
        </div>

        {/* Contacts Table */}
        <div className="glass-panel rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-900/90 text-slate-400 uppercase font-mono text-[11px] border-b border-slate-800">
                <tr>
                  <th scope="col" className="px-5 py-3.5">Date / Time</th>
                  <th scope="col" className="px-5 py-3.5">Sender Profile</th>
                  <th scope="col" className="px-5 py-3.5">WhatsApp</th>
                  <th scope="col" className="px-5 py-3.5">Message Content</th>
                  <th scope="col" className="px-5 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/70">
                {filteredContacts.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-5 py-12 text-center text-slate-500">
                      {searchTerm ? 'No messages match your search query.' : 'No contact messages recorded yet.'}
                    </td>
                  </tr>
                ) : (
                  filteredContacts.map((contact) => {
                    const formattedDate = new Date(contact.createdAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    });
                    const rawWhatsapp = contact.whatsapp.replace(/[^0-9]/g, '');

                    return (
                      <tr key={contact.id} className="hover:bg-slate-800/40 transition-colors">
                        {/* Date */}
                        <td className="px-5 py-4 whitespace-nowrap font-mono text-slate-400">
                          <div className="flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5 text-cyan-400" />
                            <span>{formattedDate}</span>
                          </div>
                        </td>

                        {/* Sender */}
                        <td className="px-5 py-4">
                          <div className="font-semibold text-white">{contact.name}</div>
                          <a
                            href={`mailto:${contact.email}`}
                            className="text-[11px] text-cyan-400 hover:underline block truncate max-w-xs"
                          >
                            {contact.email}
                          </a>
                        </td>

                        {/* WhatsApp */}
                        <td className="px-5 py-4 whitespace-nowrap">
                          <a
                            href={`https://wa.me/${rawWhatsapp}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-950/60 hover:bg-emerald-900/60 text-emerald-300 font-mono text-[11px] border border-emerald-800/60 transition-colors"
                          >
                            <MessageSquare className="w-3 h-3" />
                            <span>{contact.whatsapp}</span>
                            <ExternalLink className="w-2.5 h-2.5 opacity-60" />
                          </a>
                        </td>

                        {/* Message Preview */}
                        <td className="px-5 py-4">
                          <div className="max-w-md max-h-24 overflow-y-auto text-xs text-slate-300 bg-slate-950/60 p-2.5 rounded-lg border border-slate-800 whitespace-pre-wrap leading-relaxed">
                            {contact.message}
                          </div>
                        </td>

                        {/* Actions */}
                        <td className="px-5 py-4 whitespace-nowrap text-right space-x-2">
                          <a
                            href={`mailto:${contact.email}?subject=${encodeURIComponent(`Re: Inquiry from ${contact.name}`)}`}
                            className="inline-flex p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-cyan-400 transition-colors"
                            title="Reply by Email"
                          >
                            <Mail className="w-4 h-4" />
                          </a>
                          <a
                            href={`https://wa.me/${rawWhatsapp}?text=${encodeURIComponent(`Hi ${contact.name}, thank you for reaching out via my portfolio!`)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex p-1.5 rounded-lg bg-emerald-950 hover:bg-emerald-900 text-emerald-300 transition-colors"
                            title="Open WhatsApp Chat"
                          >
                            <MessageSquare className="w-4 h-4" />
                          </a>
                          <button
                            onClick={() => handleDeleteContact(contact.id, contact.name)}
                            className="inline-flex p-1.5 rounded-lg bg-rose-950/60 hover:bg-rose-900/60 text-rose-300 transition-colors cursor-pointer"
                            title="Delete Message Record"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};
