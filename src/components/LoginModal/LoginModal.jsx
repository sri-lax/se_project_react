import { useState, useEffect } from "react";
import "./LoginModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

export default function LoginModal({
  isOpen,
  onClose,
  onLogin,
  loginError,
  setLoginError,
}) {
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setLoginError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(formData);
  };

  useEffect(() => {
    if (isOpen) {
      setFormData({ email: "", password: "" });
      setLoginError("");
    }
  }, [isOpen]);

  //  Only render modal if isOpen is true
  if (!isOpen) return null;

  return (
    <ModalWithForm
      title="Log In"
      buttonText="Log In"
      onClose={onClose}
      isOpen={isOpen}
      onSubmit={handleSubmit}
    >
      <label htmlFor="email" className="modal__label">
        Email
        <input
          type="email"
          name="email"
          id="email"
          className="modal__input"
          placeholder="youremail@gmail.com"
          required
          onChange={handleChange}
          value={formData.email}
          autoFocus
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

      {loginError && <p className="modal__error">{loginError}</p>}
    </ModalWithForm>
  );
}
