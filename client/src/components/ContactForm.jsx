import React, { useState } from "react";
import axios from "axios";

const initialState = { name: "", email: "", message: "" };

function validate(values) {
  const errors = {};
  if (!values.name.trim()) errors.name = "Name is required";
  if (!values.email.trim()) errors.email = "Email is required";
  else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(values.email))
    errors.email = "Invalid email address";
  if (!values.message.trim()) errors.message = "Message is required";
  return errors;
}

function ContactForm() {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: undefined });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate(values);
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    setLoading(true);
    setServerError("");
    try {
      await axios.post(import.meta.env.VITE_API_URL, values);
      setSubmitted(true);
      setValues(initialState);
    } catch (err) {
      setServerError(err.response?.data?.error || "Submission failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="relative bg-[#050917]/75 border border-[#FF551D]/25 hover:border-[#FF551D]/45 backdrop-blur-2xl rounded-2xl shadow-[0_0_50px_rgba(255,85,29,0.15),0_0_80px_rgba(4,8,21,0.6)] px-8 py-10 w-full max-w-md text-center animate-fade-in flex flex-col items-center overflow-hidden transition-all duration-500">
        {/* Soft glowing gradient backdrops */}
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-[#FF551D] rounded-full blur-[100px] opacity-20 pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-green-500/10 rounded-full blur-[100px] opacity-20 pointer-events-none" />
        
        {/* Animated Checkmark inside a glowing circle */}
        <div className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center mb-6 shadow-[0_0_25px_rgba(34,197,94,0.15)] animate-bounce">
          <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
          </svg>
        </div>

        {/* Pulsating Linkable Official Logo */}
        <a
          href="https://shecanfoundation.org/"
          target="_blank"
          rel="noopener noreferrer"
          className="cursor-pointer group relative mb-6 block"
          title="Visit She Can Foundation Website"
        >
          <div className="absolute inset-0 rounded-full bg-[#FF551D] blur-[8px] opacity-30 group-hover:opacity-80 transition duration-500 animate-pulse" />
          <img
            src="/logo.jpg"
            alt="She Can Foundation Logo"
            className="relative w-20 h-20 rounded-full shadow-lg border-2 border-shecan_orange object-cover transition duration-500 group-hover:scale-105 group-hover:border-white"
          />
        </a>

        <h2 className="text-2xl font-bold text-white mb-3 tracking-wide">Form Submitted Successfully</h2>
        <p className="text-gray-300 text-sm leading-relaxed mb-8 max-w-sm">
          Thank you for reaching out! Your message has been received, and the She Can Foundation team will review it shortly.
        </p>
        
        <button
          className="px-6 py-2.5 rounded-lg border border-white/10 hover:border-white/20 bg-white/5 hover:bg-white/10 text-white font-medium transition duration-300 text-sm cursor-pointer"
          onClick={() => setSubmitted(false)}
        >
          Submit Another Response
        </button>
      </div>
    );
  }

  return (
    <form
      className="relative bg-[#050917]/75 border border-[#FF551D]/25 hover:border-[#FF551D]/45 backdrop-blur-2xl rounded-2xl shadow-[0_0_50px_rgba(255,85,29,0.15),0_0_80px_rgba(4,8,21,0.6)] px-8 py-10 w-full max-w-md animate-fade-in text-white overflow-hidden transition-all duration-500"
      onSubmit={handleSubmit}
      noValidate
    >
      {/* Soft glowing orange radial gradient on top-left of form card */}
      <div className="absolute -top-24 -left-24 w-48 h-48 bg-[#FF551D] rounded-full blur-[100px] opacity-25 pointer-events-none" />

      {/* Header section with clickable logo and glow */}
      <div className="flex flex-col items-center mb-6">
        <a
          href="https://shecanfoundation.org/"
          target="_blank"
          rel="noopener noreferrer"
          className="cursor-pointer group relative block"
          title="Click to visit www.shecanfoundation.org"
        >
          {/* Subtle neon hover glow behind the logo */}
          <div className="absolute inset-0 rounded-full bg-[#FF551D] blur-[8px] opacity-0 group-hover:opacity-85 transition duration-500" />
          <img
            src="/logo.jpg"
            alt="She Can Foundation Logo"
            className="relative w-24 h-24 rounded-full shadow-xl border-2 border-shecan_orange object-cover transition duration-500 group-hover:scale-105 group-hover:border-white"
          />
        </a>
        <h2 className="text-2xl font-bold text-white mt-4 text-center tracking-wide">
          Contact She Can Foundation
        </h2>
        <p className="text-gray-400 text-xs mt-1.5 text-center">
          Empowering women in tech. Click the logo to visit our site.
        </p>
      </div>

      {/* Name Input Field */}
      <div className="mb-5 group">
        <label
          className="block text-gray-300 font-semibold mb-1.5 text-sm tracking-wide group-focus-within:text-[#FF551D] transition-colors"
          htmlFor="name"
        >
          Full Name
        </label>
        <div className="relative flex items-center">
          <span className="absolute left-3.5 flex items-center pointer-events-none">
            <svg
              className="w-5 h-5 text-gray-400 group-focus-within:text-[#FF551D] transition-colors"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </span>
          <input
            className={`w-full bg-slate-900/50 text-white pl-11 pr-4 py-2.5 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#FF551D]/40 focus:border-[#FF551D] transition duration-300 ${
              errors.name ? "border-red-500/80 bg-red-950/10 focus:ring-red-500/30 focus:border-red-500" : "border-white/10 hover:border-white/20"
            }`}
            type="text"
            id="name"
            name="name"
            value={values.name}
            onChange={handleChange}
            disabled={loading}
            placeholder="e.g. Anamika S Nair"
          />
        </div>
        {errors.name && (
          <p className="text-red-400 text-xs mt-1.5 tracking-wide flex items-center">
            <svg className="w-3.5 h-3.5 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {errors.name}
          </p>
        )}
      </div>

      {/* Email Input Field */}
      <div className="mb-5 group">
        <label
          className="block text-gray-300 font-semibold mb-1.5 text-sm tracking-wide group-focus-within:text-[#FF551D] transition-colors"
          htmlFor="email"
        >
          Email Address
        </label>
        <div className="relative flex items-center">
          <span className="absolute left-3.5 flex items-center pointer-events-none">
            <svg
              className="w-5 h-5 text-gray-400 group-focus-within:text-[#FF551D] transition-colors"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </span>
          <input
            className={`w-full bg-slate-900/50 text-white pl-11 pr-4 py-2.5 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#FF551D]/40 focus:border-[#FF551D] transition duration-300 ${
              errors.email ? "border-red-500/80 bg-red-950/10 focus:ring-red-500/30 focus:border-red-500" : "border-white/10 hover:border-white/20"
            }`}
            type="email"
            id="email"
            name="email"
            value={values.email}
            onChange={handleChange}
            disabled={loading}
            placeholder="e.g. anaaanair@gmail.com"
          />
        </div>
        {errors.email && (
          <p className="text-red-400 text-xs mt-1.5 tracking-wide flex items-center">
            <svg className="w-3.5 h-3.5 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {errors.email}
          </p>
        )}
      </div>

      {/* Message Input Field */}
      <div className="mb-6 group">
        <label
          className="block text-gray-300 font-semibold mb-1.5 text-sm tracking-wide group-focus-within:text-[#FF551D] transition-colors"
          htmlFor="message"
        >
          Your Message
        </label>
        <div className="relative flex items-start">
          <span className="absolute left-3.5 top-3 flex items-center pointer-events-none">
            <svg
              className="w-5 h-5 text-gray-400 group-focus-within:text-[#FF551D] transition-colors"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
          </span>
          <textarea
            className={`w-full bg-slate-900/50 text-white pl-11 pr-4 py-2.5 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#FF551D]/40 focus:border-[#FF551D] transition duration-300 min-h-[120px] resize-none ${
              errors.message ? "border-red-500/80 bg-red-950/10 focus:ring-red-500/30 focus:border-red-500" : "border-white/10 hover:border-white/20"
            }`}
            id="message"
            name="message"
            value={values.message}
            onChange={handleChange}
            disabled={loading}
            placeholder="What would you like to say?"
          />
        </div>
        {errors.message && (
          <p className="text-red-400 text-xs mt-1.5 tracking-wide flex items-center">
            <svg className="w-3.5 h-3.5 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {errors.message}
          </p>
        )}
      </div>

      {/* Backend API connection warning / error feedback */}
      {serverError && (
        <div className="mb-4 p-3 rounded-lg border border-red-500/30 bg-red-950/20 text-red-400 text-sm text-center animate-shake">
          {serverError}
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full py-3 rounded-lg bg-gradient-to-r from-[#FF551D] to-[#FF8000] text-white font-semibold hover:shadow-[0_0_20px_rgba(255,85,29,0.45)] hover:scale-[1.02] active:scale-[0.98] transition duration-300 disabled:opacity-60 disabled:pointer-events-none flex items-center justify-center gap-2 group cursor-pointer"
        disabled={loading}
      >
        {loading ? (
          <>
            <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            <span>Submitting...</span>
          </>
        ) : (
          <>
            <span>Send Message</span>
            <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
            </svg>
          </>
        )}
      </button>
    </form>
  );
}

export default ContactForm;
