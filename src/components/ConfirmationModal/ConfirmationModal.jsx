// ConfirmationModal.jsx
import "./ConfirmationModal.css";

function ConfirmationModal({ isOpen, onConfirm, onCancel }) {
  if (!isOpen) return null;

  return (
    <div
      className={`modal ${isOpen ? "modal_opened" : ""}`}
      role="dialog"
      aria-labelledby="confirmation-title"
      aria-modal="true"
    >
      <div className="modal__content modal__content_delete">
        <p className="modal__caption" id="confirmation-title">
          Are you sure you want to delete this item? This action is
          irreversible.
        </p>
        <div className="modal__actions">
          <button type="button" className="modal__confirm" onClick={onConfirm}>
            Yes, delete item
          </button>
          <button type="button" className="modal__cancel" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmationModal;
