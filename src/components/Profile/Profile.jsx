import ClothesSection from "../ClothesSection/ClothesSection";
import SideBar from "../SideBar/SideBar";
import "./Profile.css";
import { useContext } from "react";
import CurrentUserContext from "../../Contexts/CurrentUserContext";

function Profile({
  onCardClick,
  clothingItems,
  onAddClick,
  onLogout,
  onEditProfileClick,
  onCardLike,
}) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <div className="profile">
      <section className="profile__sidebar">
        <SideBar />

        {currentUser && (
          <div className="profile__user-info">
            <button
              onClick={onEditProfileClick}
              className="profile__edit-button"
            >
              Change profile data
            </button>
            <button onClick={onLogout} className="profile__logout-button">
              Log Out
            </button>
          </div>
        )}
      </section>
      <section className="profile__clothing-items">
        <ClothesSection
          onCardClick={onCardClick}
          clothingItems={clothingItems}
          onAddClick={onAddClick}
          onCardLike={onCardLike}
        />
      </section>
    </div>
  );
}

export default Profile;
