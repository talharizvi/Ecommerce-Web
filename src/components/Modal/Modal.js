import '../Modal/Modal.css';
import { Link, Navigate, useNavigate } from 'react-router-dom'; 

export default function Modal({ onClose }) {
    const nav = useNavigate();
    const handleClose = () => {
        onClose();
        nav('/home'); // Navigate to the home page
      };
    return (
      <div className="modal-overlay">
        <div className="modal">
          <div className="modal-header">
            <button className="modal-close-btn" onClick={handleClose}>
              &times;
            </button>
          </div>
          <h2>Order Placed Successfully</h2>
          <p>Your order has been placed. Thank you for shopping with us!</p>
        </div>
      </div>
    );
  }