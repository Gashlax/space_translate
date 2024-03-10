import './HistoryPanel.sass';
import React from 'react';
import {FaArrowRight, FaXmark} from "react-icons/fa6";


export default function HistoryPanel( {words, onHistoryClicked} ) {
    return (
        <div className={"split-panel"}>
            <div className="panel-content">
                <div className="history-header">
                    <h2>History</h2>
                    <button className="clear-button"><FaXmark /></button>
                </div>
                 <ul className="history-list">
                    {words.map((element) =>
                        <div key={element.key} onClick={() => onHistoryClicked(element.word, element.translation)}>
                            <p>{element.langIn} <FaArrowRight /> {element.langOut}</p>
                            <p>{element.word} <FaArrowRight /> {element.translation}</p>
                        </div>
                     )}

                 </ul>

            </div>

        </div>
    );

}