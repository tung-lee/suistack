import { useEffect, useState } from 'react';
import { FaBars, FaWallet, FaTools, FaBook } from 'react-icons/fa';
import './animation.css';
import { useCustomWallet } from '../../contexts/CustomWallet';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { redirectToAuthUrl, isConnected, emailAddress,logout } = useCustomWallet();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="fixed left-5 top-[10rem] z-50">
      <button
        onClick={toggleSidebar}
        className={`bg-custom-gradient text-white p-3 rounded-full transition-transform duration-300 ${
          isOpen ? 'rotate-180' : ''
        }`}
      >
        <FaBars />
      </button>

      <div className={`absolute left-0 w-30 bg-white/90 backdrop-blur-sm text-blue-500 
        shadow-lg h-[300px] transition-all duration-300 ease-in-out  rounded-lg
        ${isOpen ? 'animate-slideDown' : 'animate-slideUp'}`}
      >
        <div className="flex flex-col py-4 justify-between h-full">
          <button  className="flex items-center px-4 py-2 " onClick={() => {
              // redirectToAuthUrl();
              if(!isConnected) {
                redirectToAuthUrl();
              }else{
                logout();
              }
              
          }}>
            <FaWallet className="mr-2" />
            {isConnected ? emailAddress : "Wallet"}
          </button>
          <button className="flex items-center px-4 py-2 ">
            <FaTools className="mr-2" />
            Build
          </button>
          <button className="flex items-center px-4 py-2 ">
            <FaBook className="mr-2" />
            Scenario
          </button>
          <button className="flex items-center px-4 py-2 ">
            <FaBook className="mr-2" />
            Publish
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
