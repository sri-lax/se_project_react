import "./ModalWithForm.css";
import closebutton from "../../assets/closebutton.svg";
function ModalWithForm() {
  return (
    <div className="modal">
      <div className="modal__content">
        <h2 className="modal__title">New garment</h2>
        <button className="modal__close">
          <img src={closebutton} alt="close" />
        </button>
        <form className="modal__form">
          <label htmlFor="name" className="modal__label">
            Name{""}
            <input
              type="text"
              className="modal__input"
              id="name"
              placeholder="Name"
            />
          </label>

          <label htmlFor="imageUrl" className="modal__label">
            Image{""}
            <input
              type="text"
              className="modal__input"
              id="imageUrl"
              placeholder="Image URL"
            />
          </label>
          <fieldset className="modal__radio-buttons">
            <legend className="modal__legend">Select the weather type</legend>

            <label id="hot" className="modal__label modal__label_type_radio">
              <input type="radio" className="modal__radio-input" />
              Hot
            </label>

            <label id="warm" className="modal__label modal__label_type_radio">
              <input type="radio" className="modal__radio-input" />
              Warm
            </label>

            <label id="cold" className="modal__label modal__label_type_radio">
              <input type="radio" className="modal__radio-input" />
              Cold
            </label>
          </fieldset>
          <button type="submit" className="modal__submit">
            Add garment
          </button>
        </form>
      </div>
    </div>
  );
}
export default ModalWithForm;
