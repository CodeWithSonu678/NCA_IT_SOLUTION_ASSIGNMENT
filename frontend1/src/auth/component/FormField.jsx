import React, { useState } from 'react'
import { registerHandle } from '../hooks/useAuth';
import toast from "react-hot-toast";

const FormField = () => {

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [mobile, setMobile] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();


        // 1. Name validation
        if (!username.trim()) {
            toast.error("Please enter your name!");
            return;
        }

        if (username.trim().length < 3) {
            toast.error("Name must be at least 3 characters long!");
            return;
        }

        // 2. Email validation
        if (!email.trim()) {
            toast.error("Please enter your email!");
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email.trim())) {
            toast.error("Please enter a valid email address!");
            return;
        }

        // 3. Mobile validation
        if (!mobile.trim()) {
            toast.error("Please enter your mobile number!");
            return;
        }

        const mobileRegex = /^[6-9]\d{9}$/;

        if (!mobileRegex.test(mobile.trim())) {
            toast.error("Enter a valid 10-digit Indian mobile number!");
            return;
        }

        // 4. Password validation
        if (!password) {
            toast.error("Please enter your password!");
            return;
        }

        if (password.length < 8) {
            toast.error("Password must be at least 8 characters long!");
            return;
        }

        if (!/[A-Z]/.test(password)) {
            toast.error("Password must contain at least one uppercase letter!");
            return;
        }

        if (!/[a-z]/.test(password)) {
            toast.error("Password must contain at least one lowercase letter!");
            return;
        }

        if (!/[0-9]/.test(password)) {
            toast.error("Password must contain at least one number!");
            return;
        }

        // 5. Confirm password validation
        if (!confirmPassword) {
            toast.error("Please confirm your password!");
            return;
        }

        if (password !== confirmPassword) {
            toast.error("Passwords do not match!");
            return;
        }

        // 6. API call
        try {
            const data = await registerHandle(
                username.trim(),
                email.trim().toLowerCase(),
                mobile.trim(),
                password
            );

            if (data?.success === true) {
                toast.success(data.message || "Registration successful!");

                // Optional: clear form after successful registration
                setUsername("");
                setEmail("");
                setMobile("");
                setPassword("");
                setConfirmPassword("");
            } else {
                toast.error(data?.message || "Registration failed!");
            }

        } catch (error) {
            console.error("Registration error:", error);

            toast.error(
                error.response?.data?.message ||
                error.message ||
                "Something went wrong!"
            );
        }


    };

    return (

        <form onSubmit={handleSubmit}>


            {/* name field here */}

            <div className="input-field">
                <label htmlFor="name">Name</label>
                <input id="name" type='text' placeholder='Enter your name..' value={username} onChange={(e) => setUsername(e.target.value)} />
            </div>

            {/* email field here */}
            <div className="input-field">
                <label htmlFor="email">Email</label>
                <input type='email' placeholder='Enter your email..' value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>

            {/* phone number field here */}
            <div className="input-field">
                <label htmlFor="mobile">Phone No.</label>
                <input id='mobile' type='tel' maxLength={10} minLength={10} placeholder='Enter your phone number..' value={mobile} onChange={(e) => setMobile(e.target.value)} />
            </div>

            {/* password field here */}
            <div className="input-field">
                <label htmlFor="password">Password</label>
                <input type='password' placeholder='Enter your password..' value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>

            {/* confirm field here */}
            <div className="input-field">
                <label htmlFor="confirmPassword">confirm Password</label>
                <input type='password' placeholder='re-enter your password...' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
            </div>

            <div className="submit-btn-section">
                <button type='submit'>Register</button>
            </div>

        </form>
    )
}

export default FormField
