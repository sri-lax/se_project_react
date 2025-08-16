import { useContext } from "react";
import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";
import CurrentUserContext from "../../Contexts/CurrentUserContext";

function ClothesSection({
  onCardClick,
  clothingItems,
  onAddClick,
  onCardLike,
}) {
  const currentUser = useContext(CurrentUserContext);
  const userItems = clothingItems.filter(
    (item) => item.owner === currentUser?._id
  );

  return (
    <div className="cloth-section">
      <div className="cloth__section-header">
        <p className="cloth__item">Your items</p>
        <button className="clothSection__button" onClick={onAddClick}>
          + Add new
        </button>
      </div>
      {userItems.length === 0 ? (
        <p className="clothes-section__empty">No items yet. Add something!</p>
      ) : (
        <ul className="clothes-section__items">
          {userItems.map((item, index) => (
            <li
              key={item._id || `${item.name}-${index}`}
              className="clothes-section__item"
            >
              <ItemCard
                item={item}
                onCardClick={onCardClick}
                onCardLike={onCardLike}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ClothesSection;
