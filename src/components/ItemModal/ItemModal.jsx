import "./ItemModal.css";
import closeButton from "../../assets/closeButton.svg";

function ItemModal({
  activeModal,
  onclose,
  card,
  onDeleteClick,
  isConfirmModalOpen,
}) {
  return (
    <div
      className={`modal ${activeModal === "preview" ? "modal_opened" : ""} ${
        isConfirmModalOpen ? "modal_hidden" : ""
      }`}
    >
      <div className="modal__content modal__content_type_image">
        <button onClick={onclose} type="button" className="modal__close">
          <img src={closeButton} alt="close" />
        </button>
        <img src={card.imageUrl} alt="Modal Image" className="modal__image" />
        <div className="modal__footer">
          <h2 className="modal__caption">{card.name}</h2>
          <p className="modal__weather">Weather: {card.weather}</p>

          <button className="modal__delete" onClick={onDeleteClick}>
            Delete item
          </button>
        </div>
      </div>
    </div>
  );
}
export default ItemModal;
