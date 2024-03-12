import LanguageInputField from "./LanguageInputField";
import LanguageOutputField from "./LanguageOutputField";
import React, { useEffect, useState } from "react";
import { debounce } from "lodash";
import "./TextTranslationContainer.sass";
import ErrorComponent from "../../../components/ErrorComponent";

export default function TextTranslationContainer({
  historyInput,
  historyOutput,
  sourceLanguage,
  targetLanguage,
  saveSearchToHistory,
}) {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [
    isMicClosedAndReadyToSaveToHistory,
    setIsMicClosedAndReadyToSaveToHistory,
  ] = useState(true);
  const [onError, setOnError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    setInput(historyInput);
    setOutput(historyOutput);
  }, [historyInput, historyOutput]);

  useEffect(() => {
    if (input.trim()) {
      debouncedTranslation(input);
    }
    return () => {
      //cleanup
      debouncedTranslation.cancel();
    };
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
          api_key: "095f84a5-7b79-4d17-8719-a5c1de5e88e2",
        }),
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) {
        setOnError(true);
        setErrorMessage(
          "Error occurred while fetching translation from server. Please try again later.",
        );
      }
      const data = await response.json();

      setOutput(data.translatedText);
      if (
        input !== data.translatedText &&
        isMicClosedAndReadyToSaveToHistory &&
        !onError
      ) {
        saveSearchToHistory(
          input,
          data.translatedText,
          sourceLanguage,
          targetLanguage,
        );
      }
    } catch (e) {
      setOnError(true);
      setErrorMessage(
        "Error occurred while fetching translation from server. Please try again later.",
      );
      console.log(e);
    }
  };

  const debouncedTranslation = debounce(fetchTranslation, 700);

  const speechToText = (text, isMicClosedAndReadyToSaveToHistory) => {
    setIsMicClosedAndReadyToSaveToHistory(isMicClosedAndReadyToSaveToHistory);
    setInput(text);
    if (text !== "" && isMicClosedAndReadyToSaveToHistory && !onError) {
      setIsMicClosedAndReadyToSaveToHistory(true);
      saveSearchToHistory(input, output, sourceLanguage, targetLanguage);
    }
  };

  const handleInputChange = (event) => {
    setInput(event.target.value);
    setOutput(event.target.value);
    setOnError(false);
    setErrorMessage("");
  };

  return (
    <div className="translation-comp">
      {onError && <ErrorComponent message={errorMessage} />}
      <LanguageInputField
        inputValue={input}
        sourceLanguage={sourceLanguage}
        onInputChange={handleInputChange}
        speechToText={speechToText}
      />
      <LanguageOutputField
        outputValue={output}
        targetLanguage={targetLanguage}
      />
    </div>
  );
}
