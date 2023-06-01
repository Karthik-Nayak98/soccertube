import { PropTypes } from 'prop-types';
import { createContext, useContext, useState } from 'react';

const SidebarContext = createContext();
const SideBarUpdater = createContext();

// Custom hook for state value and function
export function useSideBar() {
  return useContext(SidebarContext);
}

export function useSideBarUpdate() {
  return useContext(SideBarUpdater);
}

function SidebarProvider({ children }) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <SidebarContext.Provider value={isSidebarOpen}>
      <SideBarUpdater.Provider value={toggleSidebar}>
        {children}
      </SideBarUpdater.Provider>
    </SidebarContext.Provider>
  );
}

SidebarProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default SidebarProvider;
