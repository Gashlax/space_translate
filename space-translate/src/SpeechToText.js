import React, { useState, useEffect } from 'react';

const SpeechToText = ( {onRecord} ) => {
    const [isListening, setIsListening] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) {
            setError('Speech recognition is not supported in this browser. Try Google Chrome.');
            return;
        }

        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.onresult = (event) => {
            const currentTranscript = Array.from(event.results)
                .map(result => result[0].transcript)
                .join('');
            onRecord(currentTranscript);
        };
        recognition.onerror = (event) => {
            setError('Speech recognition error: ' + event.error);
        };

        if (isListening) {
            recognition.start();
        } else {
            recognition.stop();
        }

        return () => {
            recognition.stop();
        };
    }, [isListening]);

    return (
        <div>
            <button onClick={() => setIsListening(!isListening)}>
                {isListening ? 'Stop Listening' : 'Start Listening'}
            </button>
            {error && <p>Error: {error}</p>}
        </div>
    );
};

export default SpeechToText;
