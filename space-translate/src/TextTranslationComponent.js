import LanguageInputField from "./LanguageInputField";
import LanguageOutputField from "./LanguageOutputField";
import React, {useEffect, useState} from "react";
import {debounce} from "lodash";
import './TextTranslationComponent.sass';

export default function TextTranslationComponent({inputProp, outputProp, addWordTranslationPair}) {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');

    useEffect(() => {
        setInput(inputProp);
        setOutput(outputProp);
    }, [inputProp, outputProp]);

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
            if(input !== data.translatedText || ( input !== inputProp && output !== outputProp )  ){
                addWordTranslationPair(input, data.translatedText);
            }
        }catch (e) {
            console.log(e);
        }
    }

    const debouncedTranslation = debounce(fetchTranslation, 700);


    const speechToText = (text) => {
        setInput(text);
    }

    const handleInputChange = (event) => {
        setInput(event.target.value);
        setOutput(event.target.value);
    };

    return(
        <div className="translation-comp">
            <LanguageInputField inputValue={input} onInputChange={handleInputChange} speechToText = {speechToText}/>
            <LanguageOutputField outputValue={output}/>
        </div>
    );

}