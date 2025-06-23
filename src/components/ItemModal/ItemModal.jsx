import "./ItemModal.css";
import closeButton from "../../assets/closeButton.svg";
function ItemModal({ activeModal, onclose, card }) {
  return (
    <div className={`modal ${activeModal === "preview" && "modal_opened"}`}>
      <div className="modal__content modal__content_type_image">
        <button onClick={onclose} type="button" className="modal__close">
          <img src={closeButton} alt="close" />
        </button>
        <img src={card.link} alt="Modal Image" className="modal__image" />
        <div className="modal__footer">
          <h2 className="modal__caption">{card.name}</h2>
          <p className="modal__weather">Weather: {card.weather}</p>
        </div>
      </div>
    </div>
  );
}
export default ItemModal;
