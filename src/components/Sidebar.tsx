import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload, faComments, faEnvelope, faTimes } from "@fortawesome/free-solid-svg-icons";

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  const linkClasses = "text-lg font-semibold text-nebula-blue-med hover:text-nebula-blue-soft transition-colors duration-200 flex items-center py-2 px-3 rounded-md";
  const iconClasses = "mr-3 w-5 h-5"; // Fixed width for icons

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-10 md:hidden transition-opacity duration-300
                    ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        onClick={toggleSidebar}
      ></div>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-white shadow-lg p-6 flex flex-col z-20
                    w-64 transform transition-transform duration-300 ease-in-out font-inter
                    ${isOpen ? "translate-x-0" : "-translate-x-full"}
                    md:translate-x-0 md:static md:shadow-none md:w-60 md:flex-shrink-0 text-nebula-blue-dark`}
      >
        <div className="flex justify-end mb-8 md:hidden">
          <button onClick={toggleSidebar} className="text-nebula-blue-med hover:text-nebula-blue-soft text-2xl focus:outline-none">
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>
        <div className="mb-8 text-center md:text-left">
          <Link to="/" className="text-2xl font-bold text-nebula-blue-med hover:text-nebula-blue-soft">
            Nebula AI
          </Link>
        </div>
        <nav className="flex-grow">
          <ul className="space-y-2">
            <li>
              <a href="/static/sample.pdf" download="sample.pdf" className={linkClasses}>
                <FontAwesomeIcon icon={faDownload} className={iconClasses} /> Download CV
              </a>
            </li>
            <li>
              <Link to="/chat" onClick={isOpen && window.innerWidth < 768 ? toggleSidebar : undefined} className={linkClasses}>
                <FontAwesomeIcon icon={faComments} className={iconClasses} /> Chat
              </Link>
            </li>
            <li>
              <Link to="/contact" onClick={isOpen && window.innerWidth < 768 ? toggleSidebar : undefined} className={linkClasses}>
                <FontAwesomeIcon icon={faEnvelope} className={iconClasses} /> Contact
              </Link>
            </li>
          </ul>
        </nav>
        <div className="mt-auto text-center text-xs text-nebula-text-muted">
          <p>&copy; 2025 Nebula App</p>
        </div>
      </div>
    </>
  );
};
export default Sidebar;
