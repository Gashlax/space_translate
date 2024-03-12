import "./TranslateManager.sass";
import React, { useEffect, useState } from "react";
import HistoryPanel from "../History/HistoryPanel";
import { FaHistory } from "react-icons/fa";
import TextTranslationContainer from "./components/TextTranslationContainer";

export default function TranslateManager() {
  const [isHistoryPanelOpen, setHistoryPanelOpen] = useState(false);
  const [historyElementList, setHistoryElementList] = useState([]);
  const [historyInput, setHistoryInput] = useState("");
  const [historyOutput, setHistoryOutput] = useState("");

  useEffect(() => {
    const storedWords = JSON.parse(localStorage.getItem("historyList"));
    if (storedWords) {
      setHistoryElementList(storedWords);
    }
  }, []);

  const saveSearchToHistory = (
    willBeTranslated,
    translated,
    langIn,
    langOut,
  ) => {
    const updatedHistoryElementList = [
      ...historyElementList,
      {
        key: historyElementList.length + 1,
        willBeTranslated: willBeTranslated,
        translation: translated,
        langIn: langIn,
        langOut: langOut,
      },
    ];
    setHistoryElementList(updatedHistoryElementList);
    localStorage.setItem(
      "historyList",
      JSON.stringify(updatedHistoryElementList),
    );
  };

  const toggleHistoryPanel = () => {
    setHistoryPanelOpen(!isHistoryPanelOpen);
  };

  const onHistoryElementClicked = (word, translation) => {
    setHistoryInput(word);
    setHistoryOutput(translation);
  };

  return (
    <div className={`container ${isHistoryPanelOpen ? "pushed" : ""}`}>
      <header className="header">
        <h1>Space Translate</h1>
      </header>
      {isHistoryPanelOpen && (
        <HistoryPanel
          historyElementList={historyElementList}
          onHistoryClicked={onHistoryElementClicked}
          toggleHistoryPanel={toggleHistoryPanel}
        />
      )}
      <div className="main-content">
        <TextTranslationContainer
          historyInput={historyInput}
          historyOutput={historyOutput}
          sourceLanguage={"en"}
          targetLanguage={"tr"}
          saveSearchToHistory={saveSearchToHistory}
        />
        <button className="history-button" onClick={toggleHistoryPanel}>
          <FaHistory />
          <span className="tooltip-text">History</span>
        </button>
      </div>
    </div>
  );
}
