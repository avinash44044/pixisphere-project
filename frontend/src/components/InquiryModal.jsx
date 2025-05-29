import { useState } from 'react';

const InquiryModal = ({ isOpen, onClose, photographerName }) => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Inquiry submitted:', { ...formData, photographerName });
    setFormData({ name: '', email: '', message: '' });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Send Inquiry to {photographerName}</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Your Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <input
            type="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
          <textarea
            placeholder="Your Message"
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          ></textarea>
          <div className="buttons">
            <button type="button" className="cancel" onClick={onClose}>Cancel</button>
            <button type="submit" className="send">Send</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InquiryModal;