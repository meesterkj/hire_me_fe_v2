import React, { useState } from "react";
import Sidebar from "./Sidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    // Base font and colors are set on body in index.css, so Layout mainly handles structure.
    // Ensure font-inter is applied if not inheriting properly.
    <div className="flex min-h-screen font-inter bg-nebula-bg-light">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="flex-grow flex flex-col">
        {/* Hamburger button for mobile */}
        <button
          onClick={toggleSidebar}
          className="md:hidden fixed top-4 left-4 z-30 bg-white p-2 rounded-md shadow-md text-nebula-blue-soft hover:text-nebula-blue-med focus:outline-none focus:ring-2 focus:ring-nebula-blue-soft"
          aria-label="Open sidebar"
        >
          <FontAwesomeIcon icon={faBars} size="lg" />
        </button>
        <main className="flex-grow p-4 md:p-8 pt-16 md:pt-8"> {/* Added pt-16 for mobile to avoid overlap with fixed hamburger button */}
          {children}
        </main>
      </div>
    </div>
  );
};
export default Layout;
