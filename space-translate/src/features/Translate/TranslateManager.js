import './TranslateManager.sass';
import React, {useEffect, useState} from 'react';
import HistoryPanel from "../History/HistoryPanel";
import {FaHistory} from "react-icons/fa";
import TextTranslationContainer from "./components/TextTranslationContainer";

export default function TranslateManager() {

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
                langIn: "en",
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
            {isHistoryPanelOpen && <HistoryPanel words={words} onHistoryClicked={onHistoryElementClicked}
                                                 toggleHistoryPanel={toggleHistoryPanel}/>}
            <div className="main-content">
                <TextTranslationContainer historyInput={historyInput} historyOutput={historyOutput} sourceLanguage={"en"}
                                          targetLanguage={"tr"} addWordTranslationPair={addWordTranslationPair}/>
                <button className="history-button" onClick={toggleHistoryPanel}>
                    <FaHistory/>
                    <span className="tooltip-text">History</span>
                </button>
            </div>
        </div>

    );

}