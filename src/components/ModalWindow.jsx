import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DATA from '../Data';
import Shipment from '../Shipment';
import styles from '../style.module.css';

const Modal = ({ isVisible = false, title, content, footer, onClose }) => {
    const keydownHandler = ({ key }) => {
      switch (key) {
        case 'Escape':
          onClose();
          break;
        default:
      }
    };
  
    React.useEffect(() => {
      document.addEventListener('keydown', keydownHandler);
      return () => document.removeEventListener('keydown', keydownHandler);
    });
  
    return !isVisible ? null : (
      <div className="modal" onClick={onClose}>
        <div className="modal-dialog" onClick={e => e.stopPropagation()}>
          <div className="modal-header">
            <h3 className="modal-title">{title}</h3>
            <span className="modal-close" onClick={onClose}>
              &times;
            </span>
          </div>
          <div className="modal-body">
            <div className="modal-content">{content}</div>
          </div>
          {footer && <div className="modal-footer">{footer}</div>}
        </div>
      </div>
    );
  };

export default Modal;