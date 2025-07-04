// ConfirmationModal.jsx
import "./ConfirmationModal.css";

function ConfirmationModal({ onConfirm, onCancel }) {
  return (
    <div className="modal modal_opened">
      <div className="modal__content modal__content_delete">
        <p className="modal__caption">
          Are you sure you want to delete this item? This action is
          irreversible.
        </p>
        <div className="modal__actions">
          <button className="modal__confirm" onClick={onConfirm}>
            Yes, delete item
          </button>
          <button className="modal__cancel" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmationModal;
