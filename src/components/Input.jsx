import React from 'react';
import { classnames } from '../utils/general';

const Input = ({ input, setInput, darkMode }) => {
    return (
        <>
            <h1 className="font-bold text-xl bg-clip-text text-transparent bg-sky-400 mb-2">
                Input
            </h1>
            <textarea
                rows="5"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Input"
                className={classnames(
                    "focus:outline-none resize-none h-60 w-full border-2 border-sky-300 z-10 rounded-md px-4 py-2 hover:shadow transition duration-200 mt-2",
                    darkMode ? "bg-gray-800 text-white" : "bg-gray-200 text-black",
                )}
            ></textarea>
        </>
    );
}

export default Input;
