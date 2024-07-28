import React, { useState } from 'react';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../config/firebase';
import { setDoc, doc } from 'firebase/firestore';
import { msgg} from './ToastMsg';


const LoginForm = ({ setShowModal }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [error, setError] = useState('');

    const handleAuth = async (e) => {
        e.preventDefault();
        try {
            if (isLogin) {
                await signInWithEmailAndPassword(auth, email, password);
                msgg('Logged in successfully!');
            } else {
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                const user = userCredential.user;
                await setDoc(doc(db, "users", user.uid), {
                    username,
                    email
                });
                msgg('Account created successfully!');
            }
            setShowModal(false);
        } catch (err) {
            setError(err.message);
            msgg();
        }
    };

    return (
        <div>
            <form onSubmit={handleAuth} className="space-y-4">
                <h2 className="text-2xl font-semibold">{isLogin ? "Login" : "Sign Up"}</h2>
                {error && <p className="text-red-500">{error}</p>}
                {!isLogin && (
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Username</label>
                        <input
                            type="text"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required={!isLogin}
                        />
                    </div>
                )}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                        type="email"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Password</label>
                    <input
                        type="password"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md"
                    >
                        {isLogin ? "Login" : "Sign Up"}
                    </button>
                </div>
                <div className="text-center">
                    {isLogin ? (
                        <p>
                            Don't have an account?{" "}
                            <button
                                type="button"
                                className="text-blue-500 hover:underline"
                                onClick={() => setIsLogin(!isLogin)}
                            >
                                Sign Up
                            </button>
                        </p>
                    ) : (
                        <p>
                            Already have an account?{" "}
                            <button
                                type="button"
                                className="text-blue-500 hover:underline"
                                onClick={() => setIsLogin(!isLogin)}
                            >
                                Login
                            </button>
                        </p>
                    )}
                </div>
            </form>
        </div>
    );
};

export default LoginForm;