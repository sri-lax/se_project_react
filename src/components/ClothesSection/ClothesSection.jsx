import "./ClothesSection.css";
import { defaultClothingItems } from "../../utils/constants";
import ItemCard from "../ItemCard/ItemCard";
function ClothesSection({ onCardClick, clothingItems }) {
  return (
    <div className="cloth-section">
      <div className="cloth__section-header">
        <p className="cloth__item">Your items</p>
        <button className="clothSection__button">+ Add new</button>
      </div>
      <ul className="clothes-section__items">
        {clothingItems.map((item) => {
          return (
            <ItemCard key={item._id} item={item} onCardClick={onCardClick} />
          );
        })}
      </ul>
    </div>
  );
}
export default ClothesSection;
