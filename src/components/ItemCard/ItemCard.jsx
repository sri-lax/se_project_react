import "./ItemCard.css";
import { useContext } from "react";
import CurrentUserContext from "../../Contexts/CurrentUserContext";
import heartDefault from "../../assets/heartDefault.png";
import heartLiked from "../../assets/heartLiked.png";

function ItemCard({ item, onCardClick, onCardLike }) {
  const currentUser = useContext(CurrentUserContext);

  const handleCardClick = () => {
    console.log("Item clicked:", item);

    onCardClick(item);
  };

  const handleImageError = (e) => {
    e.target.src = "/fallback-image.png"; // Replace with your actual fallback image path
  };

  const isLiked = item.likes.some((id) => id === currentUser?._id);

  const handleLike = () => {
    onCardLike({ id: item._id, isLiked });
  };

  const heartIconClassName = isLiked
    ? "card__like-button-icon_active"
    : "card__like-button-icon";

  return (
    <div className="card">
      <div className="card__image-container">
        <img
          onClick={handleCardClick}
          src={item.imageUrl}
          alt={`Clothing item: ${item.name}`}
          className="card__image"
          onError={handleImageError}
        />

        <div className="card__overlay">
          <h2 className="card__name">{item.name}</h2>

          {currentUser && (
            <button
              onClick={handleLike}
              className="card__like-button"
              aria-label={isLiked ? "Unlike item" : "Like item"}
              aria-pressed={isLiked}
            >
              <img
                src={isLiked ? heartLiked : heartDefault}
                alt="like"
                className="card__like-button-icon"
              />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ItemCard;
