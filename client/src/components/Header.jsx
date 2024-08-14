import React, { useState } from "react";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {logout} from "../store/authSlice.js"

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const authStatus = useSelector((state) => state.auth.status);
  // console.log(authStatus);
  const dispatch=useDispatch()
  const handleLogout = async () => {
    const logoutUser = await axios.post(
      "http://localhost:8000/api/v1/users/logout",
      {},
      {
        withCredentials: true, // Include credentials (cookies) in the request
      }
    );
    dispatch(logout())

    // console.log(logoutUser);
  };
  return (
    <nav className="bg-slate-300 shadow-md">
      <div className="max-w-full  px-2 sm:px-4 lg:px-4">
        <div className="relative flex items-center justify-between h-14 ">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className={`${isOpen ? "hidden" : "block"} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
              <svg
                className={`${isOpen ? "block" : "hidden"} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="flex-1 flex items-center justify-center sm:items-center sm:justify-between">
            <div className="flex-shrink-0">
              <div className="w-14 h-14">
                <img className="w-full h-full" src={logo} alt="logo" />
              </div>
            </div>
            <div className="hidden sm:block sm:ml-6">
              <div className="flex space-x-2">
                <Link
                  href="#"
                  className="text-gray-800 hover:bg-gray-500 font-['Roboto_Condensed'] hover:text-white px-2 py-2 rounded-md text-lg font-bold uppercase"
                >
                  Home
                </Link>
                <Link
                  to="/properties"
                  className="text-gray-800 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-lg font-['Roboto_Condensed'] font-bold uppercase"
                >
                  Properties
                </Link>
                <Link
                  href="#"
                  className="text-gray-800 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-lg font-['Roboto_Condensed'] font-bold uppercase"
                >
                  About
                </Link>
                <Link
                  href="#"
                  className="text-gray-800 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-lg font-['Roboto_Condensed'] font-bold uppercase"
                >
                  Contact
                </Link>

                {authStatus ? (
                  <Link
                    to="/"
                    onClick={handleLogout}
                    className="text-gray-800 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-lg font-['Roboto_Condensed'] font-bold uppercase"
                  >
                    Logout
                  </Link>
                )  : (
                  <Link 
                    to="/login"
                     className="text-gray-800   hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-lg font-['Roboto_Condensed'] font-bold uppercase"
                   >
                     Login
                   </Link>
                 )}
                {/* {authStatus && (
                  <Link
                    to="/"
                    onClick={handleLogout}
                    className="text-gray-800 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-lg font-['Roboto_Condensed'] font-bold uppercase"
                  >
                    Logout
                  </Link>
                )}
                {!authStatus && (
                  <Link
                    to="/login"
                    className="text-gray-800   hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-lg font-['Roboto_Condensed'] font-bold uppercase"
                  >
                    Login
                  </Link>
                )} */}


              
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className={`${isOpen ? "block" : "hidden"} sm:hidden `}
        id="mobile-menu"
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:static absolute z-10 bg-white w-full flex flex-col items-center">
          <Link
            href="#"
            className="text-gray-800 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
          >
            Home
          </Link>
          <Link
            href="#"
            className="text-gray-800 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
          >
            Properties
          </Link>
          <Link
            href="#"
            className="text-gray-800 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
          >
            About
          </Link>
          <Link
            href="#"
            className="text-gray-800 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
          >
            Contact
          </Link>
          <Link
            href="#"
            className="text-gray-800 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
          >
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Header;
