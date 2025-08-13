import "./ModalWithForm.css";
import closeButton from "../../assets/closeButton.svg";
function ModalWithForm({
  children,
  buttonText,
  title,
  isOpen,
  onClose,
  onSubmit,
}) {
  return (
    <div
      className={`modal ${isOpen ? "modal_opened" : ""}`}
      role="dialog"
      aria-labelledby="modal-title"
      aria-modal="true"
    >
      <div className="modal__content modal__content_type_image">
        <h2 className="modal__title" id="modal-title">
          {title}{" "}
        </h2>
        <button onClick={onClose} type="button" className="modal__close">
          <img src={closeButton} alt="close" className="close__button" />
        </button>

        <form
          onSubmit={onSubmit}
          className="modal__form"
          name={`${title.toLowerCase().replace(/\s+/g, "-")}-form`}
          id={`${title.toLowerCase().replace(/\s+/g, "-")}-form`}
        >
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
