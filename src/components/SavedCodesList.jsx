import React, { useEffect, useState } from 'react';
import { collection, query, where, onSnapshot, deleteDoc, doc } from 'firebase/firestore';
import { db, auth } from '../config/firebase';
import { msgg } from './ToastMsg';

const SavedCodesList = () => {
    const [savedCodes, setSavedCodes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!auth.currentUser) return;

        const q = query(collection(db, "codes"), where("uid", "==", auth.currentUser.uid));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const codes = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
            setSavedCodes(codes);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const handleCopyCode = (code) => {
        navigator.clipboard.writeText(code);
        msgg('Code copied to clipboard!');
    };

    const handleDeleteCode = async (id) => {
        await deleteDoc(doc(db, "codes", id));
        setSavedCodes((prevCodes) => prevCodes.filter((code) => code.id !== id));
        msgg('Code deleted successfully!');
    };

    return (
        <div className="p-6 rounded-lg shadow-lg max-w-lg w-full">
            <h2 className="text-xl text-sky-400 font-semibold mb-4">Saved Codes</h2>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <ul>
                    {savedCodes.map((code) => (
                        <li key={code.id} className="mb-2 flex justify-between items-center text-sky-500">
                            <span>{code.codeName}.{code.language}</span>
                            <div className="flex space-x-2">
                                <button
                                    onClick={() => handleCopyCode(code.code)}
                                    className="bg-blue-500 text-white py-1 px-2 rounded"
                                >
                                    Copy
                                </button>
                                <button
                                    onClick={() => handleDeleteCode(code.id)}
                                    className="bg-red-500 text-white py-1 px-2 rounded"
                                >
                                    Delete
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default SavedCodesList;
