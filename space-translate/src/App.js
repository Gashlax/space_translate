import './App.css';
import React, {useEffect, useState} from 'react';
import HistoryPanel from "./HistoryPanel";
import {FaHistory} from "react-icons/fa";
import TextTranslationComponent from "./TextTranslationComponent";

function App() {
    const [isHistoryPanelOpen, setHistoryPanelOpen] = useState(false);
    const [words, setWords] = useState([]);
    const [historyInput, setHistoryInput] = useState('');
    const [historyOutput, setHistoryOutput] = useState('');

    useEffect(() => {
      const storedWords = JSON.parse(localStorage.getItem('words'));
      if (storedWords) {
        setWords(storedWords);
      }
    }, []);

    const addWordTranslationPair = (word, translated) => {
        const updateWords = [
            ...words,
            {
                key: words.length + 1,
                word: word,
                translation: translated,
                langIn: "eng",
                langOut: "tr"
            }
        ];
        setWords(updateWords);
        localStorage.setItem('words', JSON.stringify(updateWords));
    };

    const toggleHistoryPanel = () => {
        setHistoryPanelOpen(!isHistoryPanelOpen);
    };

    const onHistoryElementClicked = (word, translation) => {
        setHistoryInput(word);
        setHistoryOutput(translation);
    }


    return (
        <div className={`container ${isHistoryPanelOpen ? 'pushed' : ''}`}>
            <header className="header">
                <h1>Space Translate</h1>
            </header>
            {isHistoryPanelOpen && <HistoryPanel words={words} onHistoryClicked={onHistoryElementClicked} toggleHistoryPanel = {toggleHistoryPanel}/>}
            <div className="main-content">
                <TextTranslationComponent inputProp={historyInput} outputProp={historyOutput} addWordTranslationPair={addWordTranslationPair} onHistoryElementClicked={onHistoryElementClicked}/>
                <button className="historty-button" onClick={toggleHistoryPanel}><FaHistory /></button>
            </div>
        </div>

    );
}

export default App;
