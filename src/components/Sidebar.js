import React from 'react';
import { FaHome, FaSearch, FaUser, FaSignOutAlt } from 'react-icons/fa';

const Sidebar = ({ onLogout, setView }) => {
  return (
    <div className="sidebar">
      <ul>
        <SidebarItem icon={<FaHome />} text="Home" onClick={() => setView("home")} />
        <SidebarItem icon={<FaSearch />} text="Search" onClick={() => setView("search")} />
        <SidebarItem icon={<FaUser />} text="Perfil" onClick={() => console.log("Perfil")} />
        <SidebarItem icon={<FaSignOutAlt />} text="Logout" onClick={onLogout} />
      </ul>
    </div>
  );
};

const SidebarItem = ({ icon, text, onClick }) => (
  <li onClick={onClick} className="sidebar-item">
    {icon}
    <span>{text}</span>
  </li>
);

export default Sidebar;
