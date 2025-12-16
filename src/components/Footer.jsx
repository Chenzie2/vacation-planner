import { useState } from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactMessage, setContactMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ message: "", type: "" });

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    if (!contactName || !contactEmail || !contactMessage) return;

    setIsSubmitting(true);
    setSubmitStatus({ message: "", type: "" });

    try {
      const response = await fetch("http://localhost:3000/contacts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: contactName, email: contactEmail, message: contactMessage, submittedAt: new Date().toISOString() }),
      });

      if (!response.ok) throw new Error("Failed to submit");

      setSubmitStatus({ message: "Message sent successfully!", type: "success" });
      setContactName(""); setContactEmail(""); setContactMessage("");
    } catch (error) {
      setSubmitStatus({ message: "Failed to send. Try again later.", type: "error" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="bg-gray-900 text-gray-300 mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-3 gap-8">
        <div>
          <Link to="/" className="text-white text-2xl font-bold hover:text-indigo-400 transition">Dream Vacation Planner</Link>
          <p className="mt-2 text-gray-400">Plan your perfect getaway to destinations worldwide.</p>
        </div>

        <div>
          <h4 className="text-gray-400 font-semibold mb-4 uppercase tracking-wider">Quick Links</h4>
          <ul className="space-y-2">
            <li><Link to="/" className="hover:text-white transition">Home</Link></li>
            <li><Link to="/explore" className="hover:text-white transition">Explore</Link></li>
            <li><Link to="/my-trip" className="hover:text-white transition">My Trip</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-gray-400 font-semibold mb-4 uppercase tracking-wider">Contact Us</h4>
          <form onSubmit={handleContactSubmit} className="space-y-3">
            <input type="text" placeholder="Name" value={contactName} onChange={e => setContactName(e.target.value)} className="w-full px-3 py-2 rounded-md bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-indigo-500" required />
            <input type="email" placeholder="Email" value={contactEmail} onChange={e => setContactEmail(e.target.value)} className="w-full px-3 py-2 rounded-md bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-indigo-500" required />
            <textarea placeholder="Message" value={contactMessage} onChange={e => setContactMessage(e.target.value)} rows="3" className="w-full px-3 py-2 rounded-md bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-indigo-500" required />
            {submitStatus.message && <div className={`text-sm p-2 rounded ${submitStatus.type === "success" ? "bg-green-800 text-green-200" : "bg-red-800 text-red-200"}`}>{submitStatus.message}</div>}
            <button type="submit" disabled={isSubmitting} className={`w-full py-2 px-4 rounded-md text-white font-semibold transition ${isSubmitting ? "bg-gray-600 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-500"}`}>
              {isSubmitting ? "Sending..." : "Send"}
            </button>
          </form>
        </div>
      </div>

      <div className="bg-gray-800 py-4 text-center text-sm text-gray-500">
        © {currentYear} Dream Vacation Planner. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
