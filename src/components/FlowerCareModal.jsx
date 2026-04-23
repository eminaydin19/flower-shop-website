import React from 'react';
import { X } from 'lucide-react';

const FlowerCareModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <>
      <div className="modal-overlay" onClick={onClose}></div>
      <div className="care-modal">
        <button className="close-cart-btn modal-close" onClick={onClose}><X /></button>
        <h2>Flower Care Guide</h2>
        <p className="modal-subtitle">Keep your blooms fresh and vibrant for days to come.</p>
        
        <div className="care-steps">
          <div className="care-step">
            <div className="step-icon">1</div>
            <div>
              <h4>Trim the Stems</h4>
              <p>Cut 1-2 cm off the bottom of each stem at a 45-degree angle to maximize water absorption.</p>
            </div>
          </div>
          <div className="care-step">
            <div className="step-icon">2</div>
            <div>
              <h4>Fresh Water Daily</h4>
              <p>Change the water completely every day and thoroughly wash the vase to prevent bacteria.</p>
            </div>
          </div>
          <div className="care-step">
            <div className="step-icon">3</div>
            <div>
              <h4>Location Matters</h4>
              <p>Keep your arrangement away from direct sunlight, heating vents, and ripening fruit.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default FlowerCareModal;
