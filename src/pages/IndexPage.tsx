import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const IndexPage: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [organisation, setOrganisation] = useState("");
  const [position, setPosition] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const validateForm = (): boolean => {
    if (!name.trim()) { setError("Name is required."); return false; }
    if (!email.trim()) { setError("Email is required."); return false; }
    if (!/\S+@\S+\.\S+/.test(email)) { setError("Email is invalid."); return false; }
    if (!organisation.trim()) { setError("Organisation is required."); return false; }
    if (!position.trim()) { setError("Position is required."); return false; }
    setError(null);
    return true;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validateForm()) {
      return;
    }
    try {
      const response = await fetch("/api/chat/start", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, organisation, position }),
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.error || `Error: ${response.statusText}`);
        return;
      }
      if (data.userId) {
        localStorage.setItem("nebulaUser", JSON.stringify({ userId: data.userId, name }));
        navigate("/chat");
      } else {
        setError(data.error || "Failed to start chat session. Please try again.");
      }
    } catch (err) {
      console.error("API call failed:", err);
      setError("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 font-inter bg-nebula-bg-light text-nebula-blue-dark">
      <div className="w-full max-w-2xl mx-auto p-8 rounded-lg shadow-xl bg-nebula-bg-form">
        <h1 className="text-5xl md:text-6xl font-bold text-center mb-8 text-nebula-blue-med">Have you met Nebula?</h1>
        <p className="text-center text-lg md:text-xl mb-10 text-nebula-blue-light">
          Welcome to the AI that will try to convince you to hire Nebula.
        </p>
        <div className="bg-white p-6 md:p-8 rounded-lg shadow-md">
          <h2 className="text-3xl font-semibold text-center mb-6 text-nebula-blue-med">Start by telling me who you are</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-1 text-nebula-blue-light">Name:</label>
              <input type="text" id="name" name="name" placeholder="Your Name" value={name} onChange={(e) => setName(e.target.value)}
                     className="mt-1 block w-full px-4 py-2 rounded-md text-nebula-blue-dark bg-nebula-bg-input border border-nebula-blue-border focus:ring-2 focus:ring-nebula-blue-soft focus:border-transparent outline-none" />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1 text-nebula-blue-light">Email:</label>
              <input type="email" id="email" name="email" placeholder="Your Email" value={email} onChange={(e) => setEmail(e.target.value)}
                     className="mt-1 block w-full px-4 py-2 rounded-md text-nebula-blue-dark bg-nebula-bg-input border border-nebula-blue-border focus:ring-2 focus:ring-nebula-blue-soft focus:border-transparent outline-none" />
            </div>
            <div>
              <label htmlFor="organisation" className="block text-sm font-medium mb-1 text-nebula-blue-light">Organisation:</label>
              <input type="text" id="organisation" name="organisation" placeholder="Your Organisation" value={organisation} onChange={(e) => setOrganisation(e.target.value)}
                     className="mt-1 block w-full px-4 py-2 rounded-md text-nebula-blue-dark bg-nebula-bg-input border border-nebula-blue-border focus:ring-2 focus:ring-nebula-blue-soft focus:border-transparent outline-none" />
            </div>
            <div>
              <label htmlFor="position" className="block text-sm font-medium mb-1 text-nebula-blue-light">Position:</label>
              <input type="text" id="position" name="position" placeholder="Your Position" value={position} onChange={(e) => setPosition(e.target.value)}
                     className="mt-1 block w-full px-4 py-2 rounded-md text-nebula-blue-dark bg-nebula-bg-input border border-nebula-blue-border focus:ring-2 focus:ring-nebula-blue-soft focus:border-transparent outline-none" />
            </div>

            {error && (
              <div className="text-center text-red-500 text-sm p-2 bg-red-100 rounded-md">
                {error}
              </div>
            )}

            <div className="text-center pt-4">
              <button type="submit"
                      className="bg-nebula-blue-soft hover:bg-nebula-blue-med text-white font-bold py-3 px-8 rounded-full shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-nebula-blue-soft focus:ring-opacity-50 transition-colors duration-300">
                Enter &rarr;
              </button>
            </div>
          </form>
        </div>
        <p className="text-center text-sm mt-10 text-nebula-text-muted">&copy; 2025 Nebula. All rights reserved. Whatever that means...</p>
      </div>
    </div>
  );
};
export default IndexPage;
