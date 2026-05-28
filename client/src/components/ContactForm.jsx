import React, { useState } from "react";
import axios from "axios";

const initialState = { name: "", email: "", message: "" };

function validate(values) {
  const errors = {};
  if (!values.name.trim()) errors.name = "Name is required";
  if (!values.email.trim()) errors.email = "Email is required";
  else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(values.email))
    errors.email = "Invalid email";
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
      setServerError(err.response?.data?.error || "Submission failed");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="bg-shecan_blue text-white rounded-xl shadow-2xl px-8 py-12 w-full max-w-md text-center animate-fade-in">
        <h2 className="text-2xl font-bold mb-4">Form Submitted Successfully</h2>
        <p>Thank you for reaching out to She Can Foundation!</p>
        <button
          className="mt-8 px-6 py-2 rounded bg-shecan_orange text-white font-semibold hover:bg-orange-600 transition"
          onClick={() => setSubmitted(false)}
        >
          Submit Another Response
        </button>
      </div>
    );
  }

  return (
    <form
      className="bg-white/90 backdrop-blur-lg rounded-xl shadow-2xl px-8 py-12 w-full max-w-md animate-fade-in"
      onSubmit={handleSubmit}
      noValidate
    >
      <h2 className="text-2xl font-bold text-shecan_blue mb-6 text-center">
        Contact She Can Foundation
      </h2>
      <div className="mb-4">
        <label
          className="block text-shecan_blue font-semibold mb-1"
          htmlFor="name"
        >
          Name
        </label>
        <input
          className={`w-full px-4 py-2 rounded border focus:outline-none focus:ring-2 focus:ring-shecan_orange ${errors.name ? "border-red-500" : "border-shecan_blue/30"}`}
          type="text"
          id="name"
          name="name"
          value={values.name}
          onChange={handleChange}
          disabled={loading}
        />
        {errors.name && (
          <p className="text-red-500 text-sm mt-1">{errors.name}</p>
        )}
      </div>
      <div className="mb-4">
        <label
          className="block text-shecan_blue font-semibold mb-1"
          htmlFor="email"
        >
          Email
        </label>
        <input
          className={`w-full px-4 py-2 rounded border focus:outline-none focus:ring-2 focus:ring-shecan_orange ${errors.email ? "border-red-500" : "border-shecan_blue/30"}`}
          type="email"
          id="email"
          name="email"
          value={values.email}
          onChange={handleChange}
          disabled={loading}
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email}</p>
        )}
      </div>
      <div className="mb-4">
        <label
          className="block text-shecan_blue font-semibold mb-1"
          htmlFor="message"
        >
          Message
        </label>
        <textarea
          className={`w-full px-4 py-2 rounded border focus:outline-none focus:ring-2 focus:ring-shecan_orange resize-none min-h-[100px] ${errors.message ? "border-red-500" : "border-shecan_blue/30"}`}
          id="message"
          name="message"
          value={values.message}
          onChange={handleChange}
          disabled={loading}
        />
        {errors.message && (
          <p className="text-red-500 text-sm mt-1">{errors.message}</p>
        )}
      </div>
      {serverError && (
        <p className="text-red-500 text-center mb-4">{serverError}</p>
      )}
      <button
        type="submit"
        className="w-full py-2 rounded bg-shecan_orange text-white font-semibold hover:bg-orange-600 transition disabled:opacity-60"
        disabled={loading}
      >
        {loading ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
}

export default ContactForm;
