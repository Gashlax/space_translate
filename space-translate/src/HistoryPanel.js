import './HistoryPanel.css';
import React from 'react';

export default function HistoryPanel( {words} ) {
    return (
        <div className={"split-panel"}>
            <div className="panel-content">
                Right Panel Content
                {console.log(words)}
                 <ul>
                    {words.map((element, key) =>
                        <div key={element.key}>
                            <p>{element.word} - {element.translation}</p>
                        </div>
                     )}

                 </ul>

            </div>

        </div>
    );

}