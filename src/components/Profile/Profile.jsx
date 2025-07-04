import ClothesSection from "../ClothesSection/ClotheSection";
import SideBar from "../SideBar/SideBar";
import "./Profile.css";
function Profile({ onCardClick, clothingItems }) {
  return (
    <div className="profile">
      <section className="profile__sidebar">
        <SideBar />
      </section>
      <section className="profile__clothing-items">
        <ClothesSection
          onCardClick={onCardClick}
          clothingItems={clothingItems}
        />
      </section>
    </div>
  );
}
export default Profile;
