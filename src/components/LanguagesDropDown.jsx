import React from "react";
import Select from "react-select";
import { languageOptions } from "../config/languageOptions";

const customStyles = {
    control: (provided) => ({
        ...provided,
        backgroundColor: "white",
    }),
    option: (provided, state) => ({
        ...provided,
        color: state.isSelected ? "white" : "black",
        backgroundColor: state.isSelected ? "blue" : "white",
        "&:hover": {
            backgroundColor: "lightgray",
        },
    }),
    singleValue: (provided) => ({
        ...provided,
        color: "black",
    }),
};

const LanguagesDropdown = ({ onSelectChange }) => {
    return (
        <Select
            placeholder={`C++`}
            options={languageOptions}
            defaultValue={languageOptions[0]}
            onChange={(selectedOption) => onSelectChange(selectedOption)}
            styles={customStyles}
        />
    );
};

export default LanguagesDropdown;
