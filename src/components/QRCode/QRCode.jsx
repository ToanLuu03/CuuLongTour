import React from "react";

const QRCodeComponent = ({ url }) => {
  const encodedUrl = encodeURIComponent(url); // encode url cho QR code
  const qrSrc = `https://quickchart.io/qr?text=${encodedUrl}&size=200`; // sử dụng dịch vụ QuickChart để tạo QR code

  return (
    <div style={{ textAlign: "center" }}>
      <p style={{ fontSize: "14px", marginBottom: 8 }}>See More Here</p>
      <img
        src={qrSrc}
        alt="QR Code"
        width={120}
        height={120}
        style={{ border: "1px solid #ccc", borderRadius: 4 }}
      />
    </div>
  );
};

export default QRCodeComponent;
