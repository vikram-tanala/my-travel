import Navbar from "./nav";
import { useState } from "react";

export default function Contact() {
    const baseUrl = import.meta.env.VITE_B_URL;

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await fetch(`${baseUrl}/api/user/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (res.ok) {
      alert("Message sent successfully!");
      setFormData({ username: "", email: "", message: "" });
    } else {
      console.error(data);
      alert("Failed to send message");
    }
  } catch (err) {
    console.error(err);
    alert("Network error");
  }
};

  return (
    <div className="min-h-screen font-roboto">
      <Navbar />

      {/* Hero */}
      <div className="relative bg-indigo-600 py-16">
        <div className="max-w-6xl mx-auto px-6 text-white">
          <h1 className="text-4xl font-bold mb-2">Contact Us</h1>
          <p className="text-indigo-100 max-w-xl">
            Have questions or need assistance? We’re here to help you.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="bg-gray-50 py-16 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10">

          {/* Contact Info */}
          <div className="bg-white rounded-2xl shadow p-8">
            <h3 className="text-xl font-semibold text-slate-800 mb-4">
              📍 Get in Touch
            </h3>
            <p className="text-slate-600 mb-4">
              Travel Trip Support Team
            </p>
            <p className="text-slate-600 mb-2">📧 support@traveltrip.com</p>
            <p className="text-slate-600 mb-2">📞 +91 98765 43210</p>
            <p className="text-slate-600">
              🕘 Mon – Sat, 9:00 AM – 6:00 PM
            </p>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-2xl shadow p-8">
            <h3 className="text-xl font-semibold text-slate-800 mb-6">
              ✉️ Send a Message
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
            <input
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Your Name"
              className="w-full border rounded-lg px-4 py-2"
            />
            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your Email"
              className="w-full border rounded-lg px-4 py-2"
            />
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your Message"
              className="w-full border rounded-lg px-4 py-2"
            />
            <button className="bg-indigo-600 text-white px-6 py-2 rounded-lg">
              Send Message
            </button>
          </form>
          </div>

        </div>
      </div>
    </div>
  );
}
