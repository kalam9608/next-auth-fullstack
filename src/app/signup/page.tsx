"use client"
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';

export default function SignupPage() {
    const route = useRouter();
    const [user, setUser] = useState({
        username: "",
        email: "",
        password: ""
    })
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (user.username.length > 0 && user.email.length > 0 && user.password.length > 0) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true)
        }
    }, [user])

    const onSignup = async () => {
        try {

            setLoading(true);

            const response = await axios.post("/api/users/signup", user);

            console.log("success", response)

            route.push("/login")

        } catch (error: any) {
            console.log("sign up failed", error);
            toast.error(error.message)
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>{loading ? "proccessing" : "SignUp"}</h1>

            <label htmlFor="username">username</label>
            <hr />
            <input
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
                id='username'
                type="text"
                value={user.username}
                onChange={(e) => setUser({ ...user, username: e.target.value })}
                placeholder='user name'
            />

            <label htmlFor="email">email</label>
            <input
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
                id="email"
                type="text"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                placeholder="email"
            />
            <label htmlFor="password">password</label>
            <input
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
                id="password"
                type="password"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                placeholder="password"
            />
            <button
                onClick={onSignup}
                disabled={buttonDisabled}
                className={`${buttonDisabled || loading ? "cursor-not-allowed opacity-65" : ""} p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 cursor-pointer`}>{buttonDisabled ? "No signup" : "Signup"}</button>
            <Link href="/login">Visit login page</Link>
        </div>
    )
}

