import { useLoaderData, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useApolloClient } from "@apollo/client";

export default function NavBar() {
  const user = useLoaderData();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const client = useApolloClient();

  const handleLogout = () => {
    localStorage.removeItem("splitwiseUser");
    client.resetStore();
    navigate("/login");
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div className="navbar">
      <div className="navbar-left">Splitmate</div>
      <div className="navbar-right">
        <div className="user-info" onClick={toggleDropdown}>
          {user.user.user.firstName}
        </div>
        {dropdownOpen && (
          <div className="dropdown-menu">
            <button onClick={handleLogout}>Logout</button>
          </div>
        )}
      </div>
    </div>
  );
}
