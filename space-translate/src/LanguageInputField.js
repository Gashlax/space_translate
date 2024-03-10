import React from 'react';
import './LanguageField.sass'
import SpeechToText from "./SpeechToText";

export default function LanguageInputField({inputValue, onInputChange, speechToText}) {

    return (
        <div className="input-container">
            ENG
            <textarea
                className="input-field"
                onChange={onInputChange}
                value={inputValue}
                placeholder="Type something to translate"
            />
            <SpeechToText onRecord = {speechToText}/>
        </div>

    );
}