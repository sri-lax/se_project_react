import ClothesSection from "../ClothesSection/ClothesSection";
import SideBar from "../SideBar/SideBar";
import "./Profile.css";

function Profile({
  onCardClick,
  clothingItems,
  onAddClick,
  currentUser,
  onLogout,
  onEditProfileClick,
}) {
  return (
    <div className="profile">
      <section className="profile__sidebar">
        <SideBar currentUser={currentUser} />

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
        />
      </section>
    </div>
  );
}

export default Profile;
