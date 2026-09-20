import { useState } from "react";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8 border-l-4 border-red-600 pl-3">
        📬 Contact Us
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-4">Get in Touch</h2>
          <p className="text-gray-600 mb-4 text-sm">
            Have a question, feedback, or a news tip? Fill out the form and our
            team will get back to you as soon as possible.
          </p>

          {sent && (
            <p className="bg-green-100 text-green-700 px-4 py-2 rounded mb-4 text-sm">
              Thank you! Your message has been sent.
            </p>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              placeholder="Your Name"
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              placeholder="Your Email"
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              required
              rows="4"
              placeholder="Your Message"
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
            ></textarea>
            <button
              type="submit"
              className="w-full bg-red-600 text-white py-2 rounded font-semibold hover:bg-red-700 transition"
            >
              Send Message
            </button>
          </form>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-4">Contact Information</h2>
          <div className="space-y-4 text-sm text-gray-700">
            <p>
              <span className="font-semibold">📍 Address:</span>
              <br />
              123 News Street, Dhaka 1000, Bangladesh
            </p>
            <p>
              <span className="font-semibold">📧 Email:</span>
              <br />
              info@dailynews.com
            </p>
            <p>
              <span className="font-semibold">📞 Phone:</span>
              <br />
              +880 1234-567890
            </p>
            <p>
              <span className="font-semibold">🕐 Office Hours:</span>
              <br />
              Sunday - Thursday: 9:00 AM - 6:00 PM
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
