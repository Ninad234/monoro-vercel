import React, { useState } from "react";
import axios from "axios";
import toast from 'react-hot-toast';

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post('http://localhost:4001/contact', form);
      toast.success("Thank you for contacting us! We'll get back to you soon.");
      setForm({ name: '', email: '', message: '' });
    } catch (error) {
      toast.error("Failed to send message. Please try again later.");
    }
    setLoading(false);
  };

  return (
    <div className="w-full px-4 md:px-8 py-12 min-h-screen flex flex-col items-center justify-center bg-white">
      <h1 className="text-4xl font-bold mb-6 text-center">Contact Us</h1>
      <div className="flex flex-col md:flex-row gap-12 w-full max-w-4xl">
        <form onSubmit={handleSubmit} className="flex-1 bg-gray-100 rounded-lg p-8 shadow">
          <div className="mb-4">
            <label className="block mb-1 font-semibold">Name</label>
            <input type="text" name="name" value={form.name} onChange={handleChange} className="input input-bordered w-full" required />
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-semibold">Email</label>
            <input type="email" name="email" value={form.email} onChange={handleChange} className="input input-bordered w-full" required />
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-semibold">Message</label>
            <textarea name="message" value={form.message} onChange={handleChange} className="textarea textarea-bordered w-full" rows={5} required />
          </div>
          <button type="submit" className="btn btn-primary w-full" disabled={loading}>{loading ? 'Sending...' : 'Send Message'}</button>
        </form>
        <div className="flex-1 flex flex-col justify-center items-center bg-white rounded-lg p-8 shadow">
          <h2 className="text-2xl font-semibold mb-4">Our Contact Info</h2>
          <p className="mb-2">Email: <span className="font-mono">monoro@gmail.com</span></p>
          <p className="mb-2">Phone: <span className="font-mono">+1 555-770-7727</span></p>
          <p>Address: <span className="font-mono">123 Fashion Ave, Mumbai, India</span></p>
        </div>
      </div>
    </div>
  );
};

export default Contact; 