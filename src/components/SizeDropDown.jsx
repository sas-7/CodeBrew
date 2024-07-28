import React from "react";
import Select from "react-select";

const sizeOptions = [
    { label: 'Small', value: 14 },
    { label: 'Medium', value: 17 },
    { label: 'Large', value: 20 }
];

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

const SizeDropDown = ({ onSelectChange }) => {
    return (
        <Select
            placeholder="Medium"
            options={sizeOptions}
            onChange={(selectedOption) => onSelectChange(selectedOption)}
            styles={customStyles}
        />
    );
};

export default SizeDropDown;
