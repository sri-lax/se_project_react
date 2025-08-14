import "./AddItemModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useState, useEffect } from "react";
export default function AddItemModal({
  onClose,
  isOpen,
  activeModal,
  onAddItemModalSubmit,
}) {
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [weather, setWeather] = useState("");

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleImageUrlChange = (e) => {
    setImageUrl(e.target.value);
  };

  const handleWeatherChange = (e) => {
    setWeather(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("🧾 Submitting:", { name, imageUrl, weather });

    onAddItemModalSubmit({ name, imageUrl, weather });
  };

  // ✅ Reset fields only when modal opens
  useEffect(() => {
    if (isOpen) {
      setName("");
      setImageUrl("");
      setWeather("");
    }
  }, [isOpen]);

  return (
    <ModalWithForm
      buttonText="Add garment"
      title="New garment"
      activeModal={activeModal}
      onClose={onClose}
      isOpen={isOpen}
      onSubmit={handleSubmit}
    >
      <label htmlFor="name" className="modal__label">
        Name{""}
        <input
          type="text"
          className="modal__input"
          id="name"
          placeholder="Name"
          required
          minLength="1"
          maxLength="30"
          onChange={handleNameChange}
          value={name}
        />
      </label>

      <label htmlFor="imageUrl" className="modal__label">
        Image{""}
        <input
          type="url"
          className="modal__input"
          id="imageUrl"
          placeholder="Image URL"
          required
          onChange={handleImageUrlChange}
          value={imageUrl}
        />
      </label>
      <fieldset className="modal__radio-buttons">
        <legend className="modal__legend">Select the weather type</legend>

        <label id="hot" className="modal__label modal__label_type_radio">
          <input
            type="radio"
            className="modal__radio-input"
            id="weather-hot"
            name="weather"
            value="hot"
            onChange={handleWeatherChange}
            checked={weather === "hot" ? true : false}
          />
          Hot
        </label>

        <label id="warm" className="modal__label modal__label_type_radio">
          <input
            type="radio"
            className="modal__radio-input"
            id="weather-warm"
            name="weather"
            value="warm"
            onChange={handleWeatherChange}
            checked={weather === "warm" ? true : false}
          />
          Warm
        </label>

        <label id="cold" className="modal__label modal__label_type_radio">
          <input
            type="radio"
            className="modal__radio-input"
            id="weather-cold"
            name="weather"
            value="cold"
            onChange={handleWeatherChange}
            checked={weather === "cold" ? true : false}
          />
          Cold
        </label>
      </fieldset>
    </ModalWithForm>
  );
}
