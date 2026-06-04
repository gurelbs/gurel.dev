'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, CheckCircle2, AlertTriangle, RefreshCcw, Mail, User } from 'lucide-react';
import { submitContactForm, type ActionResponse } from '../app/actions';

export default function ContactForm() {
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [touched, setTouched] = React.useState({
    name: false,
    email: false,
    subject: false,
    message: false,
  });

  const [errors, setErrors] = React.useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [response, setResponse] = React.useState<ActionResponse | null>(null);

  // Synchronous client validators for high accessibility responsiveness
  const validateField = (name: string, value: string) => {
    let error = '';
    const trimmed = value.trim();

    if (name === 'name') {
      if (!trimmed) error = 'Full name is required';
      else if (trimmed.length < 2) error = 'Name must be at least 2 characters';
    }

    if (name === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!trimmed) error = 'Email is required';
      else if (!emailRegex.test(trimmed)) error = 'Please enter a valid email address';
    }

    if (name === 'subject') {
      if (!trimmed) error = 'Subject is required';
      else if (trimmed.length < 3) error = 'Subject must be at least 3 characters';
    }

    if (name === 'message') {
      if (!trimmed) error = 'Message is required';
      else if (trimmed.length < 10) error = 'Message must be at least 10 characters';
    }

    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (touched[name as keyof typeof touched]) {
      validateField(name, value);
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    validateField(name, value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Touch all fields
    setTouched({
      name: true,
      email: true,
      subject: true,
      message: true,
    });

    // Validate all fields
    let isValid = true;
    const currentErrors = { name: '', email: '', subject: '', message: '' };

    if (!formData.name.trim()) {
      currentErrors.name = 'Full name is required';
      isValid = false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      currentErrors.email = 'Email is required';
      isValid = false;
    } else if (!emailRegex.test(formData.email)) {
      currentErrors.email = 'Please enter a valid email';
      isValid = false;
    }
    if (!formData.subject.trim()) {
      currentErrors.subject = 'Subject is required';
      isValid = false;
    }
    if (!formData.message.trim() || formData.message.trim().length < 10) {
      currentErrors.message = 'Message must be at least 10 characters';
      isValid = false;
    }

    setErrors(currentErrors);

    if (!isValid) return;

    setIsSubmitting(true);
    setResponse(null);

    try {
      const res = await submitContactForm(formData);
      setResponse(res);
      if (res.success) {
        // Clear forms on success env
        setFormData({ name: '', email: '', subject: '', message: '' });
        setTouched({ name: false, email: false, subject: false, message: false });
      }
    } catch (err) {
      setResponse({
        success: false,
        message: 'Network error or connection loss. Please try compiling again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-slate-800/30 p-6 sm:p-8 rounded-3xl border border-slate-700/40 tracking-normal" id="contacts-form-module">
      <AnimatePresence mode="wait">
        {response?.success ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="text-center py-8 space-y-4"
            key="contact-success"
            id="success-alert-container"
          >
            <div className="inline-flex items-center justify-center p-3.5 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-cyan-400 mb-2">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold font-sans text-white">Transmission Successful</h3>
            <p className="text-slate-300 text-sm max-w-sm mx-auto font-sans leading-relaxed">
              {response.message}
            </p>
            <p className="text-[11px] text-slate-500 font-mono">
              Saved into local database storage layer successfully.
            </p>
            <button
              onClick={() => setResponse(null)}
              className="mt-4 px-5 py-2 text-xs font-semibold bg-slate-800/80 border border-slate-700/60 text-slate-300 hover:text-white rounded-full hover:border-slate-500 transition cursor-pointer select-none"
              id="form-retry-button-success"
            >
              Send Another Message
            </button>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4" key="contact-form" id="actual-html-contact-form">
            <h3 className="text-lg sm:text-xl font-extrabold font-sans text-slate-100 pb-1 mb-1 shadow-none">
              Secure Communications Port
            </h3>
            
            {response && !response.success && (
              <div className="p-3 bg-red-950/40 border border-red-900/40 text-red-400 text-xs rounded-xl flex items-start gap-2 mb-4">
                <AlertTriangle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <p className="font-sans">{response.message}</p>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Full Name */}
              <div className="space-y-1.5" id="input-group-name">
                <label className="text-xs sm:text-sm font-bold tracking-wider text-slate-400 uppercase flex items-center gap-1.5 font-mono">
                  <User className="w-4 h-4 text-slate-500" /> NAME
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  className={`w-full bg-slate-950/60 border rounded-2xl px-4 py-3 text-sm font-medium text-white focus:outline-none focus:border-cyan-500 transition font-mono ${
                    touched.name && errors.name ? 'border-red-500/70' : 'border-slate-800/80 focus:shadow-md focus:shadow-cyan-500/5'
                  }`}
                  placeholder="Gurel Ben Shabat"
                  id="contact-input-name"
                />
                {touched.name && errors.name && (
                  <p className="text-[11px] text-red-400 font-sans">{errors.name}</p>
                )}
              </div>

              {/* Email Address */}
              <div className="space-y-1.5" id="input-group-email">
                <label className="text-xs sm:text-sm font-bold tracking-wider text-slate-400 uppercase flex items-center gap-1.5 font-mono">
                  <Mail className="w-4 h-4 text-slate-500" /> EMAIL PORT
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  className={`w-full bg-slate-950/60 border rounded-2xl px-4 py-3 text-sm font-medium text-white focus:outline-none focus:border-cyan-500 transition font-mono ${
                    touched.email && errors.email ? 'border-red-500/70' : 'border-slate-800/80 focus:shadow-md focus:shadow-cyan-500/5'
                  }`}
                  placeholder="name@domain.com"
                  id="contact-input-email"
                />
                {touched.email && errors.email && (
                  <p className="text-[11px] text-red-400 font-sans">{errors.email}</p>
                )}
              </div>
            </div>

            {/* Subject */}
            <div className="space-y-1.5" id="input-group-subject">
              <label className="text-xs sm:text-sm font-bold tracking-wider text-slate-400 uppercase font-mono">SUBJECT / PACKET HEADER</label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                onBlur={handleBlur}
                className={`w-full bg-slate-950/60 border rounded-2xl px-4 py-3 text-sm font-medium text-white focus:outline-none focus:border-cyan-500 transition font-mono ${
                  touched.subject && errors.subject ? 'border-red-500/70' : 'border-slate-800/80 focus:shadow-md focus:shadow-cyan-500/5'
                }`}
                placeholder="Software Engineering Collaboration"
                id="contact-input-subject"
              />
              {touched.subject && errors.subject && (
                <p className="text-[11px] text-red-400 font-sans">{errors.subject}</p>
              )}
            </div>

            {/* Message payload */}
            <div className="space-y-1.5" id="input-group-message">
              <label className="text-xs sm:text-sm font-bold tracking-wider text-slate-400 uppercase font-mono">MESSAGE PAYLOAD</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                onBlur={handleBlur}
                rows={4}
                className={`w-full bg-slate-950/60 border rounded-2xl px-4 py-3 text-sm font-medium text-white focus:outline-none focus:border-cyan-500 transition font-mono ${
                  touched.message && errors.message ? 'border-red-500/70' : 'border-slate-800/80 focus:shadow-md focus:shadow-cyan-500/5'
                }`}
                placeholder="Type your system query or message here..."
                id="contact-input-message"
              />
              {touched.message && errors.message && (
                <p className="text-[11px] text-red-400 font-sans">{errors.message}</p>
              )}
            </div>

            {/* Submit CTA button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-2 px-5 py-4 rounded-2xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs sm:text-sm uppercase tracking-widest shadow-xl shadow-cyan-900/25 transition select-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed outline-none"
              id="contact-submit-btn"
            >
              {isSubmitting ? (
                <>
                  <RefreshCcw className="w-3.5 h-3.5 animate-spin" />
                  <span>TRANSMITTING DATA PKT...</span>
                </>
              ) : (
                <>
                  <Send className="w-3.5 h-3.5" />
                  <span>DISPATCH SYSTEM LOG</span>
                </>
              )}
            </button>
          </form>
        )}
      </AnimatePresence>
    </div>
  );
}
