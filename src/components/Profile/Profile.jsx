import ClothSection from "../ClothSection/ClothSection";
import SideBar from "../SideBar/SideBar";
import "./Profile.css";
function Profile({ onCardClick, clothingItems }) {
  return (
    <div className="profile">
      <section className="profile__sidebar">
        <SideBar />
      </section>
      <section className="profile__clothing-items">
        <ClothSection onCardClick={onCardClick} clothingItems={clothingItems} />
      </section>
    </div>
  );
}
export default Profile;
