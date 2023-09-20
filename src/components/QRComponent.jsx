import React from 'react';
import QRCode from 'react-qr-code';
import '../styles/qrStyles.css';
import codexLight from '../assets/codex_light.png';

function QRComponent({ qrValue }) {
  return (
    <div id="qr-container">
      <div className="glitch">
        <img id="codex-light" src={codexLight} alt="codex logo" />
      </div>
      <div className="rectangle">
        <QRCode
          style={{ background: 'white', padding: '16px' }}
          value={qrValue}
        />
      </div>
    </div>
  );
}

export default QRComponent;
