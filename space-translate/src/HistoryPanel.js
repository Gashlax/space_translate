import './HistoryPanel.sass';
import React from 'react';
import {FaArrowRight, FaXmark} from "react-icons/fa6";


export default function HistoryPanel( {words, onHistoryClicked, toggleHistoryPanel} ) {
    return (
        <div className={"split-panel"}>
            <div className="panel-content">
                <div className="history-header">
                    <h2>History</h2>
                    <button className="clear-button" onClick={toggleHistoryPanel}><FaXmark /></button>
                </div>
                 <ul className="history-list">
                    {[...words].reverse().map((element) =>
                        <div key={element.key} onClick={() => onHistoryClicked(element.word, element.translation)}>
                            <p className="language-desc">{element.langIn} <FaArrowRight /> {element.langOut}</p>
                            <p className="translation-part">{element.word} <FaArrowRight /> {element.translation}</p>
                        </div>
                     )}

                 </ul>

            </div>

        </div>
    );

}