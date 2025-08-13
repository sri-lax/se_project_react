import { useState, useEffect } from "react";
import "./RegisterModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

export default function RegisterModal({ isOpen, onClose, onRegister }) {
  console.log("isOpen:::" + isOpen);
  const [formData, setFormData] = useState({
    name: "",
    avatar: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    // alert("clicked::");
    // console.log("data:::" + e);
    e.preventDefault();
    onRegister(formData);
  };

  useEffect(() => {
    if (isOpen) {
      setFormData({
        name: "",
        avatar: "",
        email: "",
        password: "",
      });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <ModalWithForm
      title="Register"
      buttonText="Sign Up"
      onClose={onClose}
      isOpen={isOpen}
      onSubmit={handleSubmit}
    >
      <label htmlFor="name" className="modal__label">
        Name
        <input
          type="text"
          name="name"
          id="name"
          className="modal__input"
          placeholder="Name"
          required
          onChange={handleChange}
          value={formData.name}
        />
      </label>

      <label htmlFor="avatar" className="modal__label">
        Avatar URL
        <input
          type="url"
          name="avatar"
          id="avatar"
          className="modal__input"
          placeholder="Avatar URL"
          onChange={handleChange}
          value={formData.avatar}
        />
      </label>

      <label htmlFor="email" className="modal__label">
        Email
        <input
          type="email"
          name="email"
          id="email"
          className="modal__input"
          placeholder="Email"
          required
          onChange={handleChange}
          value={formData.email}
        />
      </label>

      <label htmlFor="password" className="modal__label">
        Password
        <input
          type="password"
          name="password"
          id="password"
          className="modal__input"
          placeholder="Password"
          required
          onChange={handleChange}
          value={formData.password}
        />
      </label>
    </ModalWithForm>
  );
}
