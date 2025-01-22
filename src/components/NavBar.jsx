import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

function NavBar() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token'); // Clear token from localStorage
    navigate('/login'); // Redirect to login page
  };

  return (
    <>
      <div className="w-[100%] p-5 bg-white border-b-2">
        <div className="w-[100%] flex justify-between items-center">
          <h1 className="text-4xl font-bold text-blue-600 w-[40%]">
            Product Management
          </h1>
          <div className="flex gap-20 w-[60%] ml-[20%] pl-[30%]">
            <NavLink className="text-xl font-semibold" to="/">
              Home
            </NavLink>
            {!token ? (
              <>
                <NavLink className="text-xl font-semibold" to="/signup">
                  Signup
                </NavLink>
                <NavLink className="text-xl font-semibold" to="/login">
                  Login
                </NavLink>
              </>
            ) : (
              <button
                className="text-xl font-semibold text-red-600"
                onClick={handleLogout}
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default NavBar;
