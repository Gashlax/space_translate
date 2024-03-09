
export default function LanguageInputField({inputValue, onInputChange}) {

    return (
        <div>
            <input
                type = "text"
                name="inputField"
                onChange={onInputChange}
                value={inputValue}
            />
        </div>

    );
}