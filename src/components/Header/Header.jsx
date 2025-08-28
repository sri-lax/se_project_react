import { Link, useLocation } from "react-router-dom";
import { useContext } from "react";
import "./Header.css";
import logo from "../../assets/logo.svg";
import { getInitials } from "../../utils/helpers";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import CurrentUserContext from "../../Contexts/CurrentUserContext";

function Header({
  handleAddClick,
  weatherData,
  isLoggedIn,
  onLogin,
  onRegister,
  onLogout,
}) {
  const currentUser = useContext(CurrentUserContext);
  const location = useLocation();
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });
  return (
    <header className="header">
      <div className="header__container">
        <Link to="/">
          <img className="header__logo" src={logo} alt="logo" />
        </Link>

        <p className="header__date-and-location">
          {currentDate},{weatherData.city}
        </p>
      </div>

      <div type="button" className="header__user-container">
        <ToggleSwitch />

        {isLoggedIn ? (
          <>
            <button
              onClick={handleAddClick}
              className="header__add-clothes-btn"
            >
              + Add clothes
            </button>{" "}
            <Link to="/profile" className="header__link">
              <div className="header__user-name">
                <p className="header__username">
                  {currentUser?.name || "User"}
                </p>
                {currentUser?.avatar ? (
                  <img
                    src={currentUser.avatar}
                    alt={`${currentUser.name}'s avatar`}
                    className="header__avatar"
                  />
                ) : (
                  <div
                    className="header__avatar-placeholder"
                    aria-label={`Avatar placeholder for ${
                      currentUser?.name || "User"
                    }`}
                    title={currentUser?.name || "User"}
                  >
                    {getInitials(currentUser?.name || "User")}
                  </div>
                )}
              </div>
            </Link>
            {/* Hide Logout button when on /profile */}
            {location.pathname !== "/profile" && (
              <button onClick={onLogout} className="header__auth-btn">
                Log Out
              </button>
            )}
          </>
        ) : (
          <>
            <button onClick={onRegister} className="header__auth-btn">
              Sign Up
            </button>
            <button onClick={onLogin} className="header__auth-btn">
              Log In
            </button>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
