import './HistoryPanel.sass';
import React from 'react';

export default function HistoryPanel( {words, onHistoryClicked} ) {
    return (
        <div className={"split-panel"}>
            <div className="panel-content">
                History
                 <ul>
                    {words.map((element) =>
                        <div key={element.key} onClick={() => onHistoryClicked(element.word, element.translation)}>
                            <p>{element.word} - {element.translation}</p>
                        </div>
                     )}

                 </ul>

            </div>

        </div>
    );

}