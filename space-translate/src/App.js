import './App.css';
import LanguageInputField from './LanguageInputField.js';
import LanguageOutputField from './LanguageOutputField.js';
import React, { useState } from 'react';


function App() {
    const [input, setInput] = useState('');

    const handleInputChange = (event) => {
        setInput(event.target.value);
    };


  return (
  <div>
    <LanguageInputField inputValue={input} onInputChange={handleInputChange}/>
    <LanguageOutputField inputValue = {input} />
  </div>

  );
}

export default App;
