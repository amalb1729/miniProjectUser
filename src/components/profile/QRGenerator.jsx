import React, { useState } from "react";
import { QRCodeCanvas } from "qrcode.react";

function QRGenerator({orderId}) {
  const [text, setText] = useState([`${orderId}`]);

  return (
    <div className="p-4">
      <QRCodeCanvas value={text} size={200} />
    </div>
  );
}

export default QRGenerator;
