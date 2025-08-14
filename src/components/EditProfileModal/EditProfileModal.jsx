import "./EditProfileModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useState, useEffect } from "react";

export default function EditProfileModal({
  onClose,
  isOpen,
  activeModal,
  onEditProfileSubmit,
  currentUser,
}) {
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");

  useEffect(() => {
    if (isOpen && currentUser) {
      setName(currentUser.name || "");
      setAvatar(currentUser.avatar || "");
    }
  }, [isOpen, currentUser]);

  const handleNameChange = (e) => setName(e.target.value);
  const handleAvatarChange = (e) => setAvatar(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    onEditProfileSubmit({ name, avatar });
  };

  return (
    <ModalWithForm
      buttonText="Save changes"
      title="Edit Profile"
      activeModal={activeModal}
      onClose={onClose}
      isOpen={isOpen}
      onSubmit={handleSubmit}
    >
      <label htmlFor="name" className="modal__label">
        Name
        <input
          type="text"
          className="modal__input"
          id="edit-name"
          placeholder="Your name"
          required
          minLength="1"
          maxLength="30"
          value={name}
          onChange={handleNameChange}
        />
      </label>

      <label htmlFor="avatar" className="modal__label">
        Avatar URL
        <input
          type="url"
          className="modal__input"
          id="edit-avatar"
          placeholder="Avatar image URL"
          required
          value={avatar}
          onChange={handleAvatarChange}
        />
      </label>
    </ModalWithForm>
  );
}
