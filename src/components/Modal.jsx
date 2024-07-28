import React from "react";
import { XIcon } from "@heroicons/react/solid";

const Modal = ({ setShowModal, children }) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="relative bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-11/12 md:w-1/2 lg:w-1/3">
                <button
                    onClick={() => setShowModal(false)}
                    className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
                >
                    <XIcon className="h-6 w-6" />
                </button>
                {children}
            </div>
        </div>
    );
};

export default Modal;
