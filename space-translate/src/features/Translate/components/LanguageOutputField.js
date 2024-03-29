import React from "react";
import { FaArrowRight } from "react-icons/fa6";

export default function LanguageOutputField({ outputValue, targetLanguage }) {
  return (
    <div className="output-container">
      <h3 className="heading">
        <FaArrowRight />
        {targetLanguage.toUpperCase()}
      </h3>
      <textarea
        readOnly="true"
        className="output-field"
        value={outputValue}
        placeholder="Translated text will appear here."
      />
    </div>
  );
}