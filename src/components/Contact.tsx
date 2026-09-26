import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, AlertCircle, Shield } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface ContactProps {
  onOpenAdmin?: () => void;
}

export const Contact: React.FC<ContactProps> = ({ onOpenAdmin }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errorMsg) setErrorMsg('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const rawText = await res.text();
      let data: any = null;

      try {
        data = JSON.parse(rawText);
      } catch {
        if (rawText.trim().startsWith('<') || res.status === 404) {
          throw new Error(
            `Endpoint returned HTML (Status ${res.status}). The /api/contact route was not found on this deployment. Please verify that 'api/contact.js' and 'vercel.json' are pushed to your repository and that MONGODB_URI is set in Vercel settings.`
          );
        }
        throw new Error(`Invalid response received from server (${res.status}): ${rawText.slice(0, 120)}`);
      }

      if (res.ok && (data.success || data.id || data.saved)) {
        try {
          alert('Message Sent Successfully!');
        } catch {
          // safe fallback for restricted sandbox iframe
        }
        setShowToast(true);
        setIsSubmitted(true);
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setShowToast(false), 5000);
      } else {
        setErrorMsg(data.error || data.message || 'Failed to submit message to database.');
      }
    } catch (err: any) {
      console.error('Contact submit error:', err);
      setErrorMsg(err?.message || 'Error submitting message.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 lg:py-28 relative border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="text-xs font-mono uppercase tracking-wider text-cyan-400 mb-2">
            05. Direct Transmission
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white font-heading">
            Get in Touch
          </h2>
          <p className="text-base sm:text-lg text-slate-400 mt-2">
            Have a project in mind, an inquiry, or looking to collaborate? Send a message directly to my MongoDB database.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-12">
          
          {/* Contact Details Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-6">
              <h3 className="text-base font-bold text-white pb-3 border-b border-slate-800">
                Contact Channels
              </h3>

              {/* Email */}
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-400 shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-slate-400">Direct Email</div>
                  <a
                    href={`mailto:${PERSONAL_INFO.email}`}
                    className="text-sm font-medium text-white hover:text-cyan-400 transition-colors"
                  >
                    {PERSONAL_INFO.email}
                  </a>
                </div>
              </div>

              {/* WhatsApp */}
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-slate-400">WhatsApp / Direct Phone</div>
                  <a
                    href="https://wa.me/923255691055"
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm font-medium text-white hover:text-emerald-400 transition-colors font-mono"
                  >
                    {PERSONAL_INFO.whatsappDisplay}
                  </a>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-slate-400">Base Location</div>
                  <p className="text-sm font-medium text-white">
                    {PERSONAL_INFO.location}
                  </p>
                </div>
              </div>

            </div>

            {/* Availability Box */}
            <div className="p-5 rounded-2xl bg-cyan-950/20 border border-cyan-500/30">
              <div className="flex items-center gap-2 text-cyan-300 font-semibold text-xs mb-1">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                <span>Fast Response Guaranteed</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Messages submit directly to MongoDB Atlas and trigger dispatch to Talha's inbox within 24 hours.
              </p>
            </div>
          </div>

          {/* Form Column */}
          <div className="lg:col-span-7">
            <div className="p-8 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-2xl relative">
              
              {/* Toast */}
              {showToast && (
                <div className="mb-6 p-4 rounded-xl bg-emerald-950/90 border border-emerald-500/80 text-white flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  <div>
                    <p className="text-xs font-bold text-white">Message Sent Successfully!</p>
                    <p className="text-[11px] text-emerald-200">Stored in MongoDB database.</p>
                  </div>
                </div>
              )}

              {errorMsg && (
                <div className="mb-6 p-4 rounded-xl bg-rose-950/80 border border-rose-800 text-rose-300 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {isSubmitted && !showToast ? (
                <div className="text-center py-10 space-y-4">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-white">Thank You!</h3>
                  <p className="text-xs text-slate-400 max-w-sm mx-auto">
                    Your message has been stored in MongoDB. Talha will respond shortly.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="mt-4 px-4 py-2 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-white transition-colors cursor-pointer"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    {/* Name */}
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1.5">
                        Name <span className="text-rose-400">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="e.g. Ahmad Khan"
                        required
                        className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl bg-slate-900 border border-slate-700 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 outline-none text-white transition-colors"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1.5">
                        Email <span className="text-rose-400">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="e.g. ahmad@example.com"
                        required
                        className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl bg-slate-900 border border-slate-700 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 outline-none text-white transition-colors"
                      />
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      Message <span className="text-rose-400">*</span>
                    </label>
                    <textarea
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Write your project details or message..."
                      required
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl bg-slate-900 border border-slate-700 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 outline-none text-white transition-colors resize-y"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2 flex items-center justify-between">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-6 py-3 rounded-xl font-semibold text-xs sm:text-sm bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-lg shadow-cyan-500/25 transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <span>Submitting to Database...</span>
                      ) : (
                        <>
                          <span>Transmit Message</span>
                          <Send className="w-4 h-4" />
                        </>
                      )}
                    </button>

                    {onOpenAdmin && (
                      <button
                        type="button"
                        onClick={onOpenAdmin}
                        className="text-[11px] font-mono text-slate-500 hover:text-cyan-400 flex items-center gap-1 cursor-pointer"
                      >
                        <Shield className="w-3.5 h-3.5" />
                        <span>Admin Console</span>
                      </button>
                    )}
                  </div>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
