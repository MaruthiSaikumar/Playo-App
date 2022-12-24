import React from "react";
import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../features/auth/authSlice";

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/login");
  };

  return (
    <>
      <header className="header">
        <div className="logo">
          <Link to="/">Playo App</Link>
        </div>

        {user && (
          <React.Fragment>
            <div>
              <Link to="/">My Events</Link>
            </div>
            <div>
              <Link to="/allEvents">All Events</Link>
            </div>
            <div>
              <Link to="/aprovedEvents">Approved Events</Link>
            </div>
            <div>
              <Link to="/appliedEvents">Applied Events</Link>
            </div>
            <div>
              <Link to="/createEvent">Create a Event</Link>
            </div>
          </React.Fragment>
        )}

        <ul>
          {user ? (
            <li>
              <button className="btn" onClick={onLogout}>
                <FaSignOutAlt /> Logout
              </button>
            </li>
          ) : (
            <>
              <li>
                <Link to="/login">
                  <FaSignInAlt /> Login
                </Link>
              </li>
              <li>
                <Link to="/register">
                  <FaUser /> Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </header>
      <h1>Welcome {user && user.name} </h1>
    </>
  );
}

export default Header;
