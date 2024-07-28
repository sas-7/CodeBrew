import React from "react";

const Output = ({ output, darkMode }) => {
    const getOutput = () => {
        let statusId = output?.status?.id;

        if (statusId === 6) {
            return (
                <pre className="px-2 py-1 font-normal text-xs text-red-500">
                    {atob(output?.compile_output)}
                </pre>
            );
        } else if (statusId === 3) {
            return (
                <pre className="px-2 py-1 font-normal text-xs text-green-500">
                    {atob(output.stdout) !== null
                        ? `${atob(output.stdout)}`
                        : null}
                </pre>
            );
        } else if (statusId === 5) {
            return (
                <pre className="px-2 py-1 font-normal text-xs text-red-500">
                    {`Time Limit Exceeded`}
                </pre>
            );
        } else {
            return (
                <pre className="px-2 py-1 font-normal text-xs text-red-500">
                    {atob(output?.stderr)}
                </pre>
            );
        }
    };
    return (
        <>
            <h1 className="font-bold text-xl bg-clip-text text-transparent bg-sky-400 mb-2">
                Output
            </h1>
            <div className={`w-full h-56 rounded-md border-2 border-sky-300 text-white font-normal text-sm overflow-y-auto ${darkMode ? "bg-gray-800" : "bg-gray-200"}`}>
                {output ? <>{getOutput()}</> : null}
            </div>
        </>
    );
};

export default Output;