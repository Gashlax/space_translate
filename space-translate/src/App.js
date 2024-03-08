import './App.css';
import LanguageInputField from './LanguageInputField.js';
import LanguageOutputField from './LanguageOutputField.js';
import React, { useState } from 'react';
import HistoryPanel from "./HistoryPanel";


function App() {
    const [input, setInput] = useState('');
    const [isHistoryPanelOpen, setHistoryPanelOpen] = useState(false);

    const handleInputChange = (event) => {
        setInput(event.target.value);
    };

    const toggleHistoryPanel = () => {
        setHistoryPanelOpen(!isHistoryPanelOpen);
    };


  return (
  <div>
    <LanguageInputField inputValue={input} onInputChange={handleInputChange}/>
     <div onClick={toggleHistoryPanel}>History</div>
      {isHistoryPanelOpen && <HistoryPanel />}
    <LanguageOutputField inputValue = {input} />
  </div>

  );
}

export default App;
