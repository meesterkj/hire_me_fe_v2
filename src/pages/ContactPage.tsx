import React, { useState } from "react";
import Layout from "../components/Layout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faPhone, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { faLinkedin, faGithub, faTwitter } from "@fortawesome/free-brands-svg-icons";

const ContactPage: React.FC = () => {
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactMessage, setContactMessage] = useState("");
  const [formMessage, setFormMessage] = useState<string | null>(null);

  const handleContactSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!contactName.trim() || !contactEmail.trim() || !contactMessage.trim()) {
      setFormMessage("Please fill in all fields.");
      return;
    }
    console.log("Contact form submitted (mock):", { contactName, contactEmail, contactMessage });
    setFormMessage("Your message has been sent (mock)!");
    setContactName("");
    setContactEmail("");
    setContactMessage("");
    setTimeout(() => setFormMessage(null), 3000);
  };

  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center p-4 font-inter"> {/* Assuming Layout provides bg/text color */}
        <div className="w-full max-w-3xl mx-auto p-8 rounded-lg shadow-xl bg-nebula-bg-form">
          <h1 className="text-5xl md:text-6xl font-bold text-center mb-8 text-nebula-blue-med">Contact Nebula</h1>
          <p className="text-center text-lg md:text-xl mb-10 text-nebula-blue-light">
            Have a question, a project idea, or just want to say hello? I'd love to hear from you!
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
            <div className="bg-white p-6 md:p-8 rounded-lg shadow-md text-nebula-blue-light">
              <h2 className="text-3xl font-semibold mb-6 text-nebula-blue-med">Get in Touch</h2>
              <ul className="space-y-4 text-lg">
                <li>
                  <FontAwesomeIcon icon={faEnvelope} className="mr-3 text-nebula-blue-soft" /> Email: <a href="mailto:contact@nebula.com" className="hover:underline text-nebula-blue-soft">contact@nebula.com</a>
                </li>
                <li>
                  <FontAwesomeIcon icon={faPhone} className="mr-3 text-nebula-blue-soft" /> Phone: +1 (123) 456-7890
                </li>
                <li>
                  <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-3 text-nebula-blue-soft" /> Location: Your City, Your Country
                </li>
              </ul>
              <div className="mt-8">
                <h3 className="text-2xl font-semibold mb-4 text-nebula-blue-med">Connect on Socials</h3>
                <div className="flex space-x-6">
                  <a href="#" className="text-nebula-blue-soft hover:text-nebula-blue-med transition-colors duration-200 text-3xl">
                    <FontAwesomeIcon icon={faLinkedin} />
                  </a>
                  <a href="#" className="text-nebula-blue-soft hover:text-nebula-blue-med transition-colors duration-200 text-3xl">
                    <FontAwesomeIcon icon={faGithub} />
                  </a>
                  <a href="#" className="text-nebula-blue-soft hover:text-nebula-blue-med transition-colors duration-200 text-3xl">
                    <FontAwesomeIcon icon={faTwitter} />
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 md:p-8 rounded-lg shadow-md">
              <h2 className="text-3xl font-semibold mb-6 text-nebula-blue-med">Send a Message</h2>
              <form onSubmit={handleContactSubmit} className="space-y-6">
                <div>
                  <label htmlFor="contact-name" className="block text-sm font-medium mb-1 text-nebula-blue-light">Name:</label>
                  <input type="text" id="contact-name" name="name" placeholder="Your Name" value={contactName} onChange={(e) => setContactName(e.target.value)}
                         className="mt-1 block w-full px-4 py-2 rounded-md text-nebula-blue-dark bg-nebula-bg-input border border-nebula-blue-border focus:ring-2 focus:ring-nebula-blue-soft focus:border-transparent outline-none"/>
                </div>
                <div>
                  <label htmlFor="contact-email" className="block text-sm font-medium mb-1 text-nebula-blue-light">Email:</label>
                  <input type="email" id="contact-email" name="email" placeholder="Your Email" value={contactEmail} onChange={(e) => setContactEmail(e.target.value)}
                         className="mt-1 block w-full px-4 py-2 rounded-md text-nebula-blue-dark bg-nebula-bg-input border border-nebula-blue-border focus:ring-2 focus:ring-nebula-blue-soft focus:border-transparent outline-none"/>
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-1 text-nebula-blue-light">Message:</label>
                  <textarea id="message" name="message" rows={5} placeholder="Your message..." value={contactMessage} onChange={(e) => setContactMessage(e.target.value)}
                            className="mt-1 block w-full px-4 py-2 rounded-md text-nebula-blue-dark bg-nebula-bg-input border border-nebula-blue-border focus:ring-2 focus:ring-nebula-blue-soft focus:border-transparent outline-none"></textarea>
                </div>
                {formMessage && (
                  <div className={`text-center text-sm p-2 rounded-md ${formMessage.includes("Please fill") ? "text-red-500 bg-red-100" : "text-green-500 bg-green-100"}`}>
                    {formMessage}
                  </div>
                )}
                <div className="text-center pt-4">
                  <button type="submit"
                          className="bg-nebula-blue-soft hover:bg-nebula-blue-med text-white font-bold py-3 px-8 rounded-full shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-nebula-blue-soft focus:ring-opacity-50 transition-colors duration-300">
                    Send Message
                  </button>
                </div>
              </form>
            </div>
          </div>
          <p className="text-center text-sm mt-10 text-nebula-text-muted">&copy; 2025 Nebula. All rights reserved.</p>
        </div>
      </div>
    </Layout>
  );
};
export default ContactPage;
