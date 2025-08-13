import "./ItemModal.css";
import { useContext, useEffect } from "react";

import closeButton from "../../assets/closeButton.svg";
import CurrentUserContext from "../../Contexts/CurrentUserContext";

function ItemModal({
  activeModal,
  onClose,
  card,
  onDeleteClick,
  isConfirmModalOpen,
}) {
  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    console.log("ItemModal mounted");
    console.log("Active modal:", activeModal);
    console.log("Selected card:", card);
    console.log("Current user:", currentUser);
  }, [activeModal, card, currentUser]);

  // Early return if no card is selected
  if (activeModal === "preview" && (!card || !card.imageUrl)) {
    return (
      <div className="modal modal_opened">
        <div className="modal__content">
          <p>Loading item data...</p>
          <button onClick={onClose} className="modal__close">
            <img src={closeButton} alt="close" />
          </button>
        </div>
      </div>
    );
  }

  // If modal shouldn't be open, return null
  if (activeModal !== "preview") {
    return null;
  }

  const isOwn = String(card.owner) === String(currentUser?._id);

  console.log("Card owner:", card.owner);
  console.log("Current user ID:", currentUser?._id);
  console.log("Is own item:", isOwn);

  return (
    <div
      className={`modal ${activeModal === "preview" ? "modal_opened" : ""} ${
        isConfirmModalOpen ? "modal_hidden" : ""
      }`}
    >
      <div className="modal__content modal__content_type_image">
        <button onClick={onClose} type="button" className="modal__close">
          <img src={closeButton} alt="close" />
        </button>
        <img src={card.imageUrl} alt="Modal Image" className="modal__image" />
        <div className="modal__footer">
          <h2 className="modal__caption">{card.name}</h2>
          <p className="modal__weather">Weather: {card.weather}</p>

          {isOwn && (
            <button
              className="modal__delete"
              onClick={() => {
                console.log("Delete button clicked!"); // ✅ Debug log
                onDeleteClick();
              }}
            >
              Delete item
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
export default ItemModal;
