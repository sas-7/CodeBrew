import React, { useState, useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import Playground from "../components/Playground";
import axios from "axios";
import { languageOptions } from "../config/languageOptions";
import Output from "../components/Output";
import Input from "../components/Input";
import LanguagesDropdown from "../components/LanguagesDropDown";
import { PlayIcon, SunIcon, MoonIcon, UserIcon, SaveIcon, ClipboardListIcon } from "@heroicons/react/solid";
import logo from "../assets/logo.png";
import SizeDropDown from "../components/SizeDropDown";
import Modal from "../components/Modal";
import LoginForm from "../components/LoginForm";
import SaveCode from "../components/SaveCode";
import SavedCodesList from "../components/SavedCodesList";
import { ToastContainer } from "react-toastify";
import { msgg } from '../components/ToastMsg';
import "react-toastify/dist/ReactToastify.css";
import { auth } from "../config/firebase";

const Homepage = () => {
    const [code, setCode] = useState(languageOptions[0].sampleCode);
    const [input, setInput] = useState("");
    const [output, setOutput] = useState(null);
    const [processing, setProcessing] = useState(false);
    const [language, setLanguage] = useState(languageOptions[0]);
    const [fontSize, setFontSize] = useState(17);
    const [isDarkMode, setIsDarkMode] = useState(() => {
        return localStorage.getItem("theme") === "dark";
    });
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [user, setUser] = useState(null);
    const [showSaveCodeModal, setShowSaveCodeModal] = useState(false);
    const [showSavedCodesModal, setShowSavedCodesModal] = useState(false);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => unsubscribe();
    }, []);

    const onSelectChange = (sl) => {
        setLanguage(sl);
        setCode(sl.sampleCode);
    };

    const onSizeChange = (selectedOption) => {
        setFontSize(selectedOption.value);
    };

    const onChange = (action, data) => {
        switch (action) {
            case "code": {
                setCode(data);
                break;
            }
            default: {
                console.warn("case not handled!", action, data);
            }
        }
    };

    const handleCompile = () => {
        setProcessing(true);
        const formData = {
            language_id: language.id,
            source_code: btoa(code),
            stdin: btoa(input),
        };
        const options = {
            method: "POST",
            url: "https://judge0-ce.p.rapidapi.com/submissions",
            params: { base64_encoded: "true", fields: "*" },
            headers: {
                "content-type": "application/json",
                "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
                "X-RapidAPI-Key": "80a09b51a4mshe25ee6c99088d4ep1f07b6jsna91844957d65",
            },
            data: formData,
        };

        axios
            .request(options)
            .then(function (response) {
                const token = response.data.token;
                checkStatus(token);
            })
            .catch((err) => {
                let error = err.response ? err.response.data : err;
                let status = err.response.status;
                console.log("status", status);
                if (status === 429) {
                    console.log("too many requests", status);
                    msgg(
                        `You have exceeded your daily limit of 100 requests. Please try again tomorrow. `
                    );
                }
                setProcessing(false);
                console.log("catch block...", error);
            });
    };

    const checkStatus = async (token) => {
        const options = {
            method: "GET",
            url: "https://judge0-ce.p.rapidapi.com/submissions/" + token,
            params: { base64_encoded: "true", fields: "*" },
            headers: {
                "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
                "X-RapidAPI-Key": "cfe24155d7mshf65ac705516be00p116166jsn6a653052f073",
            },
        };
        try {
            let response = await axios.request(options);
            let statusId = response.data.status?.id;

            if (statusId === 1 || statusId === 2) {
                setTimeout(() => {
                    checkStatus(token);
                }, 2000);
                return;
            } else {
                setProcessing(false);
                setOutput(response.data);
                console.log("response.data", response.data);
                msgg(`Compiled Successfully!`);
                return;
            }
        } catch (err) {
            console.log("err", err);
            setProcessing(false);
            msgg();
        }
    };

    const toggleDarkMode = () => {
        setIsDarkMode((prevMode) => {
            const newMode = !prevMode;
            localStorage.setItem("theme", newMode ? "dark" : "light");
            return newMode;
        });
    };

    const handleLogout = () => {
        signOut(auth)
            .then(() => {
                console.log("User signed out");
                setShowLoginModal(false);
                msgg('Logged out successfully!');
            })
            .catch((error) => {
                console.error("Error signing out: ", error);
                msgg('Failed to log out');
            });
    };

    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, [isDarkMode]);

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            <div className={`flex flex-col h-screen bg-background-light text-text-light dark:bg-background-dark dark:text-text-dark`}>
                <div className="flex flex-wrap justify-between items-center px-4 py-2 mt-3">
                    <img src={logo} alt="Website Logo" className="h-11 w-auto" />
                    <LanguagesDropdown onSelectChange={onSelectChange} className="mx-auto" />
                    <SizeDropDown onSelectChange={onSizeChange} />
                    <div
                        id="runButton"
                        className="flex items-center cursor-pointer bg-sky-300 text-white font-semibold hover:text-black py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                        onClick={handleCompile}
                    >
                        <PlayIcon className={`h-6 w-6 ${processing ? "animate-spin" : ""} mr-2`} />
                        Run
                    </div>
                    <button onClick={toggleDarkMode} className="focus:outline-none">
                        {isDarkMode ? <SunIcon className="h-6 w-6 text-yellow-500" /> : <MoonIcon className="h-6 w-6 text-gray-800" />}
                    </button>
                    <button
                        onClick={() => {
                            console.log("Login icon clicked");
                            setShowLoginModal(true);
                        }}
                        className="focus:outline-none ml-4"
                    >
                        <UserIcon className="h-6 w-6 text-gray-800 dark:text-white" />
                    </button>
                    <button
                        onClick={() => {
                            setShowSaveCodeModal(true);
                        }}
                        className="focus:outline-none ml-4"
                    >
                        <SaveIcon className="h-6 w-6 text-gray-800 dark:text-white" />
                    </button>
                    <button
                        onClick={() => {
                            setShowSavedCodesModal(true);
                        }}
                        className="focus:outline-none ml-4"
                    >
                        <ClipboardListIcon className="h-6 w-6 text-gray-800 dark:text-white" />
                    </button>
                </div>

                <div className="flex flex-row flex-grow px-4 py-4 space-x-4">
                    <div className="flex flex-col w-full h-full">
                        <Playground
                            code={code}
                            onChange={onChange}
                            language={language?.value}
                            theme={isDarkMode ? "vs-dark" : "vs-light"}
                            fontSize={fontSize}
                        />
                    </div>

                    <div className="flex flex-shrink-0 w-[30%] flex-col">
                        <Input input={input} setInput={setInput} darkMode={isDarkMode} />
                        <div className="flex flex-col mt-4">
                            <Output output={output} darkMode={isDarkMode} />
                        </div>
                    </div>
                </div>
            </div>

            {showLoginModal && (
                <Modal setShowModal={setShowLoginModal}>
                    {user ? (
                        <div className="text-center">
                            <p className="mb-4">Logged in as {user.email}</p>
                            <button
                                onClick={handleLogout}
                                className="w-full bg-red-500 text-white py-2 px-4 rounded-md"
                            >
                                Logout
                            </button>
                        </div>
                    ) : (
                        <LoginForm setShowModal={setShowLoginModal} />
                    )}
                </Modal>
            )}

            {showSaveCodeModal && (
                <Modal setShowModal={setShowSaveCodeModal}>
                    <SaveCode setShowSaveCodeModal={setShowSaveCodeModal} code={code} language={language} />
                </Modal>
            )}

            {showSavedCodesModal && (
                <Modal setShowModal={setShowSavedCodesModal}>
                    <SavedCodesList />
                </Modal>
            )}
        </>
    );
};

export default Homepage;
