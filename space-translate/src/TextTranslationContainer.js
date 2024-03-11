import LanguageInputField from "./LanguageInputField";
import LanguageOutputField from "./LanguageOutputField";
import React, {useEffect, useState} from "react";
import {debounce} from "lodash";
import './TextTranslationContainer.sass';

export default function TextTranslationContainer({
                                                     inputProp,
                                                     outputProp,
                                                     sourceLanguage,
                                                     targetLanguage,
                                                     addWordTranslationPair
                                                 }) {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [isReadyToSave, setIsReadyToSave] = useState(true);

    useEffect(() => {
        setInput(inputProp);
        setOutput(outputProp);
    }, [inputProp, outputProp]);

    useEffect(() => {
        if (input.trim()) {
            debouncedTranslation(input);
        }
        return () => {
            //cleanup
            debouncedTranslation.cancel();
        }
    }, [input]);

    const fetchTranslation = async (input) => {
        try {
            const response = await fetch("https://libretranslate.com/translate", {
                method: "POST",
                body: JSON.stringify({
                    q: input,
                    source: sourceLanguage,
                    target: targetLanguage,
                    format: "text",
                    api_key: "095f84a5-7b79-4d17-8719-a5c1de5e88e2"
                }),
                headers: {"Content-Type": "application/json"}
            });
            const data = await response.json();

            setOutput(data.translatedText);
            if (input !== data.translatedText && isReadyToSave) {
                addWordTranslationPair(input, data.translatedText);
            }
        } catch (e) {
            console.log(e);
        }
    }

    const debouncedTranslation = debounce(fetchTranslation, 700);


    const speechToText = (text, isReadyToSave) => {
        setIsReadyToSave(isReadyToSave)
        setInput(text);
        if (text !== "" && isReadyToSave) {
            setIsReadyToSave(true);
            addWordTranslationPair(input, output);
        }
    }

    const handleInputChange = (event) => {
        setInput(event.target.value);
        setOutput(event.target.value);
    };

    return (
        <div className="translation-comp">
            <LanguageInputField inputValue={input} sourceLanguage={sourceLanguage} onInputChange={handleInputChange}
                                speechToText={speechToText}/>
            <LanguageOutputField outputValue={output} targetLanguage={targetLanguage}/>
        </div>
    );

}