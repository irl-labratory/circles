import React, { useRef, useEffect } from 'react';
import { renderPopupEvent } from './helperFunc';

const Popup = ({ date, event, onClose, setShowPopup }) => {
  const popupRef = useRef(null);

console.log(event)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setShowPopup(true);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  const calculatePopupPosition = () => {
    const triggerElement = document.getElementById(`event-dot-${date}`);
    if (!triggerElement) return {};

    const triggerRect = triggerElement.getBoundingClientRect();
    const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    const position = {
      top: triggerRect.top + scrollTop + triggerRect.height,
      left: triggerRect.left + scrollLeft,
    };

    return position;
  };

  const popupPosition = calculatePopupPosition();
  const eventData = renderPopupEvent(event)


  return (
    <div
      className="popup-overlay"
      style={{ top: popupPosition.top, left: popupPosition.left }}
    >
      <div className="popup-content" ref={popupRef}>
        {eventData}
        <p>Date: {date.toDateString()}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default Popup;