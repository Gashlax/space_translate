import React, { useState } from "react";
import "./ErrorComponent.sass";

export default function ErrorComponent({ message }) {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) {
    return null;
  }

  return (
    <div className="error-container">
      <p>{message}</p>
      <button onClick={() => setIsVisible(false)}>Close</button>
    </div>
  );
}
