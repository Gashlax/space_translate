import React from "react";

export default function LanguageOutputField({outputValue}) {
    return(
        <div className="input-container">
            TR
             <textarea
                 className="input-field"
                 value={outputValue}
                 placeholder="Translated text will appear here."
             />
        </div>
    );


}