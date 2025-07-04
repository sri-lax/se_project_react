import "./ModalWithForm.css";
import closeButton from "../../assets/closeButton.svg";
function ModalWithForm({
  children,
  buttonText,
  title,
  isOpen,
  onclose,
  onSubmit,
}) {
  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__content modal__content_type_image">
        <h2 className="modal__title">{title}</h2>
        <button onClick={onclose} type="button" className="modal__close">
          <img src={closeButton} alt="close" className="close__button" />
        </button>
        <form onSubmit={onSubmit} className="modal__form">
          {children}
          <button type="submit" className="modal__submit">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}
export default ModalWithForm;
