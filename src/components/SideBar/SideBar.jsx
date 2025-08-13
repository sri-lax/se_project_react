import "./SideBar.css";
import defaultAvatar from "../../assets/avatar.png";

function SideBar({ currentUser }) {
  const avatarSrc = currentUser?.avatar?.trim() || defaultAvatar;
  const displayName = currentUser?.name || "User";

  return (
    <div className="sidebar">
      <img
        src={avatarSrc}
        alt={`${displayName}'s avatar`}
        className="sidebar__avatar"
        aria-label="User avatar"
      />
      <p className="sidebar__username">{displayName}</p>
    </div>
  );
}

export default SideBar;
