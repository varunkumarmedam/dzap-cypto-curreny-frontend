import { useEffect, useRef, useState } from "react";

const CoinsDropdown = ({
    options,
    label = "name",
    id = "id",
    selectedVal,
    handleChange
}) => {
    const [query, setQuery] = useState("");
    const [isOpen, setIsOpen] = useState(false);

    const inputRef = useRef(null);

    useEffect(() => {
        document.addEventListener("click", toggle);
        return () => document.removeEventListener("click", toggle);
    }, []);

    const selectOption = (option) => {
        setQuery(() => "");
        handleChange(option);
        setIsOpen((isOpen) => !isOpen);
    };

    function toggle(e) {
        setIsOpen(e && e.target === inputRef.current);
    }

    const getDisplayValue = () => {
        if (query) return query;
        if (selectedVal) return selectedVal;

        return "";
    };

    const filter = (options) => {
        return options.filter(
            (option) => option[label].toLowerCase().indexOf(query.toLowerCase()) > -1
        );
    };

    return (
        <div className="dropdown mr-2">
            <div className="control">
                <div className="selected-value">
                    <input
                        ref={inputRef}
                        type="text"
                        value={getDisplayValue()}
                        name="searchTerm"
                        onChange={(e) => {
                            setQuery(e.target.value);
                            handleChange({});
                        }}
                        onClick={toggle}
                    />
                </div>
                <div className={`arrow ${isOpen ? "open" : ""}`}></div>
            </div>

            <div className={`options ${isOpen ? "open" : ""}`}>
                {filter(options).map((option, index) => {
                    return (
                        <div
                            onClick={() => selectOption(option)}
                            className={`option ${option[label] === selectedVal ? "selected" : ""
                                }`}
                            key={`${id}-${index}`}
                        >
                            {option['logo'] && <img className="mr-2" src={option['logo']} height={'20'} />}
                            {option[label]}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default CoinsDropdown;
