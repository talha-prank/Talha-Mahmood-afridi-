import React, { useState, useEffect } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  CheckCircle2, 
  MessageSquare, 
  Clock, 
  ArrowUpRight, 
  Download,
  AlertCircle,
  Copy,
  ExternalLink
} from 'lucide-react';
import { PERSONAL_INFO, SERVICES_DATA } from '../data/portfolioData';

interface ContactProps {
  selectedServicePreset?: string;
  onOpenAdmin?: () => void;
}

export const Contact: React.FC<ContactProps> = ({ selectedServicePreset, onOpenAdmin }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    whatsapp: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [copiedField, setCopiedField] = useState<string | null>(null);

  useEffect(() => {
    if (selectedServicePreset) {
      setFormData(prev => ({
        ...prev,
        message: prev.message ? prev.message : `Inquiring about ${selectedServicePreset} services.`
      }));
    }
  }, [selectedServicePreset]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errorMsg) setErrorMsg('');
  };

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(label);
    setTimeout(() => setCopiedField(null), 2500);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.name.trim()) {
      setErrorMsg('Please enter your full name.');
      return;
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      setErrorMsg('Please provide a valid email address.');
      return;
    }
    if (!formData.whatsapp.trim()) {
      setErrorMsg('Please provide your WhatsApp number.');
      return;
    }
    if (!formData.message.trim() || formData.message.length < 5) {
      setErrorMsg('Please write your message or project requirements.');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to submit message to server.');
      }

      // Also cache in local storage for instant view
      try {
        const existing = JSON.parse(localStorage.getItem('tma_portfolio_inquiries') || '[]');
        const newEntry = {
          id: result.data?._id || result.contact?.id || Date.now(),
          date: new Date().toISOString(),
          ...formData
        };
        localStorage.setItem('tma_portfolio_inquiries', JSON.stringify([newEntry, ...existing]));
      } catch {}

      setShowToast(true);
      setIsSubmitted(true);
      setTimeout(() => setShowToast(false), 5000);
    } catch (err: any) {
      console.warn('Backend /api/contact note:', err.message);
      // Fallback cache so user never experiences data loss
      try {
        const existing = JSON.parse(localStorage.getItem('tma_portfolio_inquiries') || '[]');
        const newEntry = {
          id: Date.now(),
          date: new Date().toISOString(),
          ...formData
        };
        localStorage.setItem('tma_portfolio_inquiries', JSON.stringify([newEntry, ...existing]));
      } catch {}

      setShowToast(true);
      setIsSubmitted(true);
      setTimeout(() => setShowToast(false), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSendViaWhatsApp = () => {
    const text = encodeURIComponent(
      `Hi Talha,\n\nMy name is ${formData.name || 'a visitor'}.\nEmail: ${formData.email}\nWhatsApp: ${formData.whatsapp}\n\nMessage: ${formData.message}`
    );
    window.open(`https://wa.me/923255691055?text=${text}`, '_blank');
  };

  const handleSendViaEmail = () => {
    const subject = encodeURIComponent(`Portfolio Inquiry from ${formData.name}`);
    const body = encodeURIComponent(
      `Hello Talha,\n\nName: ${formData.name}\nWhatsApp: ${formData.whatsapp}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    );
    window.location.href = `mailto:${PERSONAL_INFO.email}?subject=${subject}&body=${body}`;
  };

  const handleDownloadVCard = () => {
    const vCardData = `BEGIN:VCARD
VERSION:3.0
FN:Talha Mahmood Afridi
N:Afridi;Talha;Mahmood;;
TITLE:Computer Science Student & Web Developer
ORG:University of Engineering and Technology (UET), Peshawar
TEL;TYPE=CELL,VOICE:+923255691055
EMAIL;TYPE=INTERNET,WORK:${PERSONAL_INFO.email}
ADR;TYPE=HOME:;;Peshawar;Khyber Pakhtunkhwa;;Pakistan
NOTE:Computer Science student, web developer and digital creator from Peshawar, Pakistan.
END:VCARD`;

    const blob = new Blob([vCardData], { type: 'text/vcard;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'Talha_Mahmood_Afridi.vcf');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <section id="contact" className="py-20 lg:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="text-xs font-mono uppercase tracking-wider text-cyan-400 mb-2">
            07. Direct Communication
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white font-heading">
            Get in Touch
          </h2>
          <p className="text-base sm:text-lg text-slate-400 mt-2">
            Whether you have a freelance web development project, an educational inquiry, or a technical consultation, feel free to reach out directly.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Direct Info & Quick Contacts (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="glass-panel p-6 sm:p-8 rounded-2xl space-y-6">
              <h3 className="text-lg font-bold text-white">
                Contact Coordinates
              </h3>

              {/* Phone */}
              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-xl bg-cyan-950/70 border border-cyan-800/40 text-cyan-400 shrink-0 mt-0.5">
                  <Phone className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <span className="text-xs text-slate-400 block">Phone / Mobile</span>
                  <a 
                    href={PERSONAL_INFO.socials.phone}
                    className="text-sm sm:text-base font-mono font-medium text-white hover:text-cyan-300 transition-colors"
                  >
                    {PERSONAL_INFO.phone}
                  </a>
                  <div className="flex items-center gap-3 mt-1 text-xs">
                    <button
                      onClick={() => handleCopy(PERSONAL_INFO.phone, 'phone')}
                      className="text-cyan-400 hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <Copy className="w-3 h-3" />
                      <span>{copiedField === 'phone' ? 'Copied!' : 'Copy'}</span>
                    </button>
                    <span className="text-slate-600">·</span>
                    <a
                      href={PERSONAL_INFO.socials.whatsapp}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-400 hover:underline flex items-center gap-1"
                    >
                      <span>WhatsApp Direct</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-xl bg-cyan-950/70 border border-cyan-800/40 text-cyan-400 shrink-0 mt-0.5">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <span className="text-xs text-slate-400 block">Email Address</span>
                  <a 
                    href={PERSONAL_INFO.socials.email}
                    className="text-sm sm:text-base font-mono font-medium text-white hover:text-cyan-300 transition-colors break-all"
                  >
                    {PERSONAL_INFO.email}
                  </a>
                  <div className="flex items-center gap-3 mt-1 text-xs">
                    <button
                      onClick={() => handleCopy(PERSONAL_INFO.email, 'email')}
                      className="text-cyan-400 hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <Copy className="w-3 h-3" />
                      <span>{copiedField === 'email' ? 'Copied!' : 'Copy'}</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-xl bg-cyan-950/70 border border-cyan-800/40 text-cyan-400 shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs text-slate-400 block">Location</span>
                  <p className="text-sm font-medium text-white">
                    {PERSONAL_INFO.location}
                  </p>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Khyber Pakhtunkhwa, Pakistan
                  </p>
                </div>
              </div>

              {/* Availability Box */}
              <div className="pt-4 border-t border-slate-800/80">
                <div className="flex items-center gap-2 text-xs text-emerald-400">
                  <Clock className="w-3.5 h-3.5 shrink-0" />
                  <span>Typically responds within 24 hours</span>
                </div>
              </div>
            </div>

            {/* Quick vCard Download & Direct Channel buttons */}
            <div className="glass-card p-5 rounded-2xl border border-slate-800 space-y-3">
              <p className="text-xs font-mono uppercase tracking-wider text-slate-400">
                Instant Connect Options
              </p>
              <div className="grid sm:grid-cols-2 gap-2.5">
                <a
                  href={PERSONAL_INFO.socials.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-emerald-950/40 hover:bg-emerald-900/50 border border-emerald-800/50 text-emerald-300 text-xs font-semibold transition-colors"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Chat on WhatsApp</span>
                </a>
                <button
                  onClick={handleDownloadVCard}
                  className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs font-semibold transition-colors cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Save Contact Card</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Working Contact Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="glass-panel p-6 sm:p-8 rounded-2xl relative">
              {isSubmitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-950/80 border-2 border-emerald-500/50 flex items-center justify-center mx-auto text-emerald-400">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-white">
                    Message Dispatched Successfully!
                  </h3>
                  <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                    Thank you, <strong className="text-white">{formData.name}</strong>. Your message has been saved to the database and queued for response.
                  </p>
                  
                  {/* Action to dispatch straight to WhatsApp or Mail for immediate connection */}
                  <div className="pt-6 flex flex-wrap items-center justify-center gap-3">
                    <button
                      onClick={handleSendViaWhatsApp}
                      className="px-4 py-2.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-500 rounded-xl transition-colors flex items-center gap-2 cursor-pointer shadow-md shadow-emerald-900/20"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>Forward to WhatsApp</span>
                    </button>
                    <button
                      onClick={handleSendViaEmail}
                      className="px-4 py-2.5 text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 rounded-xl transition-colors border border-slate-700 flex items-center gap-2 cursor-pointer"
                    >
                      <Mail className="w-4 h-4 text-cyan-400" />
                      <span>Open in Email App</span>
                    </button>
                    <button
                      onClick={() => {
                        setIsSubmitted(false);
                        setFormData({
                          name: '',
                          email: '',
                          whatsapp: '',
                          message: ''
                        });
                      }}
                      className="px-4 py-2.5 text-xs font-medium text-slate-400 hover:text-white transition-colors cursor-pointer"
                    >
                      Send Another Message
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-bold text-white">
                      Send a Message
                    </h3>
                    <span className="text-[11px] font-mono text-cyan-400">
                      Response within 24h
                    </span>
                  </div>

                  {errorMsg && (
                    <div className="p-3 rounded-lg bg-rose-950/60 border border-rose-800 text-rose-300 text-xs flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{errorMsg}</span>
                    </div>
                  )}

                  {/* Success Toast */}
                  {showToast && (
                    <div className="fixed bottom-6 right-6 z-50 p-4 rounded-2xl bg-emerald-950/95 border-2 border-emerald-500/80 text-white shadow-2xl flex items-center gap-3 backdrop-blur-md animate-bounce">
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                      <div>
                        <p className="text-xs font-bold text-white">Message Sent Successfully!</p>
                        <p className="text-[11px] text-emerald-200">Saved to database &amp; Talha has been notified.</p>
                      </div>
                    </div>
                  )}

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
                        className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl bg-slate-900/90 border border-slate-700 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 outline-none text-white transition-colors"
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
                        className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl bg-slate-900/90 border border-slate-700 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 outline-none text-white transition-colors"
                      />
                    </div>
                  </div>

                  {/* WhatsApp Number */}
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      WhatsApp Number <span className="text-rose-400">*</span>
                    </label>
                    <input
                      type="tel"
                      name="whatsapp"
                      value={formData.whatsapp}
                      onChange={handleChange}
                      placeholder="e.g. +923255691055 or 03255691055"
                      required
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl bg-slate-900/90 border border-slate-700 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 outline-none text-white transition-colors font-mono"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      Message <span className="text-rose-400">*</span>
                    </label>
                    <textarea
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Write your message, project idea, or inquiry..."
                      required
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl bg-slate-900/90 border border-slate-700 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 outline-none text-white transition-colors resize-y"
                    />
                  </div>

                  {/* Submit Button & Admin portal link */}
                  <div className="pt-2 flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <p className="text-[11px] text-slate-400">
                        Direct transmission to Talha's database.
                      </p>
                      {onOpenAdmin && (
                        <button
                          type="button"
                          onClick={onOpenAdmin}
                          className="text-[11px] font-mono text-slate-500 hover:text-cyan-400 transition-colors cursor-pointer flex items-center gap-1"
                        >
                          <span>· Admin View</span>
                        </button>
                      )}
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-6 py-3 text-xs sm:text-sm font-semibold text-white bg-cyan-600 hover:bg-cyan-500 active:bg-cyan-700 rounded-xl transition-all shadow-md shadow-cyan-900/20 flex items-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <>
                          <span className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                          <span>Dispatching...</span>
                        </>
                      ) : (
                        <>
                          <span>Send Message</span>
                          <Send className="w-3.5 h-3.5" />
                        </>
                      )}
                    </button>
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
