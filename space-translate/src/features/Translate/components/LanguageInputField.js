import React from "react";
import "./LanguageField.sass";
import SpeechToText from "../../../components/SpeechToText";
import { FaArrowRight } from "react-icons/fa6";

export default function LanguageInputField({
  inputValue,
  sourceLanguage,
  onInputChange,
  speechToText,
}) {
  return (
    <div className="input-container">
      <h3 className="heading">
        {sourceLanguage.toUpperCase()}
        <FaArrowRight />
      </h3>
      <textarea
        className="input-field"
        onChange={onInputChange}
        value={inputValue}
        placeholder="Type something to translate"
      />
      <SpeechToText onRecord={speechToText} />
    </div>
  );
}