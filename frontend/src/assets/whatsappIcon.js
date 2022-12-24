import React from 'react';

const WhatsappIcon = () => (
  <div
    className="whatsapp-icon"
    style={{ position: 'fixed', right: '10px', bottom: '10px', zIndex: '99999', maxWidth: '40%' }}
  >
    <a aria-label="Chat on WhatsApp" href="https://wa.me/13462457974">
      <img alt="Chat on WhatsApp" src="/static/svgs/WhatsAppButtonGreenLarge.svg" />
    </a>
  </div>
);

export default WhatsappIcon;
