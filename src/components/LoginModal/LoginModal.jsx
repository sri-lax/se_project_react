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
  const [emailError, setEmailError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginError("");
    setFormData({ ...formData, [name]: value });

    // Clear error if user starts typing again
    if (submitted && name === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (emailRegex.test(value)) {
        setEmailError("");
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setEmailError(" (this is not a email address)");
      return;
    }

    onLogin(formData);
  };

  useEffect(() => {
    if (isOpen) {
      setFormData({ email: "", password: "" });
      setLoginError("");
      setEmailError("");
      setSubmitted(false);
    }
  }, [isOpen, setLoginError]);

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
        Email{" "}
        {emailError && <span className="modal__input-hint">{emailError}</span>}
        <div className="modal__input-wrapper">
          <input
            type="text"
            name="email"
            id="email"
            className={`modal__input ${
              emailError ? "modal__input--invalid" : ""
            }`}
            placeholder="youremail@gmail.com"
            required
            onChange={handleChange}
            value={formData.email}
            autoFocus
          />
        </div>
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
