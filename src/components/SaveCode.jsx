import React, { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db, auth } from "../config/firebase";
import { msgg } from "./ToastMsg";

const SaveCode = ({ setShowSaveCodeModal, code, language }) => {
    const [codeName, setCodeName] = useState("");

    const saveCode = async () => {
        if (!auth.currentUser) {
            msgg("You need to be logged in to save your code.");
            console.log("Code saved successfully!"); 
            return;
        }

        try {
            await addDoc(collection(db, "codes"), {
                uid: auth.currentUser.uid,
                code: code,
                language: language.value,
                codeName: codeName,
                createdAt: new Date(),
            });
            console.log("Code saved successfully!"); 
            msgg("Code saved successfully!");
            setShowSaveCodeModal(false);
        } catch (e) {
            console.error("Error adding document: ", e);
            msgg("Failed to save code.");
        }
    };

    return (
        <div className="text-center">
            <h2 className="text-xl text-sky-400 font-semibold mb-4">Save Your Code</h2>
            <input
                type="text"
                placeholder="Enter code name"
                value={codeName}
                onChange={(e) => setCodeName(e.target.value)}
                className="w-full mb-4 p-2 border border-gray-300 rounded"
            />
            <button
                onClick={saveCode}
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-md"
            >
                Save
            </button>
        </div>
    );
};

export default SaveCode;
