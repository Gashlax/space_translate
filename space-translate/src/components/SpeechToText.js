import React, { useState, useEffect } from "react";
import { FaMicrophone, FaMicrophoneSlash } from "react-icons/fa6";
import "./SpeechToText.sass";

const SpeechToText = ({ onRecord }) => {
  const [isListening, setIsListening] = useState(false);
  const [error, setError] = useState(null);
  const [currentTranscript, setCurrentTranscript] = useState("");

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setError(
        "Speech recognition is not supported in this browser. Try Google Chrome.",
      );
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.onresult = (event) => {
      const currentTranscript = Array.from(event.results)
        .map((result) => result[0].transcript)
        .join("");
      onRecord(currentTranscript, false);
      setCurrentTranscript(currentTranscript);
    };
    recognition.onerror = (event) => {
      setError("Speech recognition error: " + event.error);
    };

    if (isListening) {
      setCurrentTranscript("");
      recognition.start();
    } else {
      recognition.stop();
      onRecord(currentTranscript, true);
      setCurrentTranscript("");
    }

    return () => {
      recognition.stop();
    };
  }, [isListening]);

  return (
    <div className="speech-container">
      <button
        className="microphone-button"
        onClick={() => setIsListening(!isListening)}
      >
        {isListening ? (
          <FaMicrophoneSlash style={{ color: "red", fontSize: "20px" }} />
        ) : (
          <FaMicrophone style={{ color: "green", fontSize: "20px" }} />
        )}
        <span className="tooltip-text">
          {isListening ? "Close Mic" : "Open Mic"}
        </span>
      </button>
      {error && <p>Error: {error}</p>}
    </div>
  );
};

export default SpeechToText;
