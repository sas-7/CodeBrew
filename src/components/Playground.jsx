import React, { useState, useEffect } from "react";
import Editor from "@monaco-editor/react";
import { languageOptions } from "../config/languageOptions";

const Playground = ({ onChange, language, code, theme, fontSize }) => {
    const [value, setValue] = useState(code || "");
    useEffect(() => {
        const selectedLanguage = languageOptions.find(
          (option) => option.value === language
        );
        setValue(
          selectedLanguage ? selectedLanguage.sampleCode : " "
        );
      }, [language]);
    const handleEditorChange = (value) => {
        setValue(value);
        onChange("code", value);
    };

    return (
        <div className="overlay rounded-md overflow-hidden w-full h-full shadow-4xl">
            <Editor
                height="88vh"
                width={`100%`}
                language={language || "cpp"}
                value={value}
                theme={theme}
                options={{ fontSize: fontSize }}
                onChange={handleEditorChange}
            />
        </div>
    );
};
export default Playground;