import "./HistoryPanel.sass";
import React from "react";
import { FaArrowRight, FaXmark } from "react-icons/fa6";

export default function HistoryPanel({
  historyElementList,
  onHistoryClicked,
  toggleHistoryPanel,
}) {
  return (
    <div className={"split-panel"}>
      <div className="panel-content">
        <div className="history-header">
          <h2>History</h2>
          <button className="clear-button" onClick={toggleHistoryPanel}>
            <FaXmark />
          </button>
        </div>
        <ul className="history-list">
          {[...historyElementList].reverse().map((element) => (
            <li
              key={element.key}
              className="history-item"
              onClick={() =>
                onHistoryClicked(element.willBeTranslated, element.translation)
              }
            >
              <div className="language-desc">
                {element.langIn} <FaArrowRight /> {element.willBeTranslated}
              </div>
              <br />
              <div className="translation-part">
                {element.langOut} <FaArrowRight /> {element.translation}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
