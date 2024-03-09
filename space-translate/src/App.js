import './App.css';
import LanguageInputField from './LanguageInputField.js';
import LanguageOutputField from './LanguageOutputField.js';
import React, {useEffect, useState} from 'react';
import HistoryPanel from "./HistoryPanel";
import { debounce } from 'lodash';
import SpeechToText from "./SpeechToText";


function App() {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [isHistoryPanelOpen, setHistoryPanelOpen] = useState(false);
    const [words, setWords] = useState([]);

    useEffect(() => {
        if (input.trim()) {  // Only call debouncedTranslation if input is not just whitespace
            debouncedTranslation(input);
        }
        return () => {
            //cleanup
            debouncedTranslation.cancel();
        }
    }, [input]);

    const fetchTranslation = async (input) => {
        console.log(input);
        try {
            const response = await fetch("https://libretranslate.com/translate", {
                method: "POST",
                body: JSON.stringify({
                    q: input,
                    source: "en",
                    target: "tr",
                    format: "text",
                    api_key: "095f84a5-7b79-4d17-8719-a5c1de5e88e2"
                }),
                headers: { "Content-Type": "application/json" }
            });
            const data = await response.json();
            console.log(data);

            setOutput(data.translatedText);
            if(input !== data.translatedText ){
                addWordTranslationPair(input, data.translatedText);
            }
        }catch (e) {
            console.log(e);
        }
    }

    const debouncedTranslation = debounce(fetchTranslation, 500);

    const addWordTranslationPair = (word, translated) => {
        const updateWords = [
            ...words,
            {
                key: words.length + 1,
                word: word,
                translation: translated,
                langIn: "tr",
                langOut: "eng"
            }
        ];
        setWords(updateWords);
    };

    const speechToText = (text) => {
        setInput(text);
    }


    const handleInputChange = (event) => {
        setInput(event.target.value);
        setOutput(event.target.value);
    };

    const toggleHistoryPanel = () => {
        setHistoryPanelOpen(!isHistoryPanelOpen);
        addWordTranslationPair("example", "sample");
    };

    const onHistoryClicked = (word, translation) => {
        setInput(word);
        setOutput(translation);
    }


    return (
        <div>
            <LanguageInputField inputValue={input} onInputChange={handleInputChange}/>
            <div onClick={toggleHistoryPanel}>History</div>
            {isHistoryPanelOpen && <HistoryPanel words={words} onHistoryClicked={onHistoryClicked}/>}
            <SpeechToText onRecord = {speechToText}/>
            <LanguageOutputField outputValue={output}/>
        </div>

    );
}

export default App;
