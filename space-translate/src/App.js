import './App.css';
import LanguageInputField from './LanguageInputField.js';
import LanguageOutputField from './LanguageOutputField.js';
import React, { useState } from 'react';
import HistoryPanel from "./HistoryPanel";


function App() {
    const [input, setInput] = useState('');
    const [isHistoryPanelOpen, setHistoryPanelOpen] = useState(false);
      const [words, setWords] = useState([]);


    const addWordTranslationPair = (word, translated) => {
      const updateWords = [
            // copy the current users state
            ...words,
            // now you can add a new object to add to the array
            {
              key: words.length+1,
              word: word,
              translation: translated,
              // with a type of member
              langIn: "tr",
              langOut: "eng"
            }
          ];
      setWords(updateWords);
    };

    const handleInputChange = (event) => {
        setInput(event.target.value);
    };

    const toggleHistoryPanel = () => {
        setHistoryPanelOpen(!isHistoryPanelOpen);
        addWordTranslationPair("example", "sample");
    };


  return (
  <div>
    <LanguageInputField inputValue={input} onInputChange={handleInputChange}/>
    <div onClick={toggleHistoryPanel}>History</div>
    {isHistoryPanelOpen && <HistoryPanel words = {words} />}
    <LanguageOutputField inputValue = {input} />
  </div>

  );
}

export default App;
