import React, { useState } from "react";
import authService from "../appwrite/auth";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../store/authSlice";
import { Button, Input, Logo } from "./index.js";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";

function Signup() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [error, setError] = useState("");

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const create = async (data) => {
        setError("");
        try {
            const newUser = await authService.createAccount(data);
            if (newUser) {
                const currentUserData = await authService.getCurrentUser();
                if (currentUserData) {
                    dispatch(login(currentUserData)); // Update Redux store
                    navigate("/");
                }
            }
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-lg p-10 mx-auto bg-white border border-gray-300 shadow-md rounded-xl">
                {/* Logo */}
                <div className="flex justify-center mb-4">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
                </div>

                {/* Heading */}
                <h2 className="text-2xl font-bold leading-tight text-center">Sign up to create an account</h2>

                {/* Already have an account */}
                <p className="mt-2 text-base text-center text-gray-600">
                    Already have an account?&nbsp;
                    <Link to="/login" className="font-medium text-blue-600 hover:underline">
                        Sign In
                    </Link>
                </p>

                {/* Error Message */}
                {error && <p className="mt-4 text-center text-red-600">{error}</p>}

                {/* Signup Form */}
                <form onSubmit={handleSubmit(create)} className="mt-6">
                    <div className="space-y-5">
                        {/* Full Name Input */}
                        <div>
                            <Input
                                label="Full Name:"
                                placeholder="Enter your full name"
                                {...register("name", { required: "Full name is required" })}
                            />
                            {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>}
                        </div>

                        {/* Email Input */}
                        <div>
                            <Input
                                label="Email:"
                                placeholder="Enter your email"
                                type="email"
                                {...register("email", {
                                    required: "Email is required",
                                    pattern: {
                                        value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                                        message: "Invalid email address",
                                    },
                                })}
                            />
                            {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>}
                        </div>

                        {/* Password Input */}
                        <div>
                            <Input
                                label="Password:"
                                type="password"
                                placeholder="Enter your password"
                                {...register("password", {
                                    required: "Password is required",
                                    minLength: {
                                        value: 6,
                                        message: "Password must be at least 6 characters long",
                                    },
                                })}
                            />
                            {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>}
                        </div>

                        {/* Submit Button */}
                        <Button type="submit" className="w-full text-white bg-blue-600 hover:bg-blue-700">
                            Create Account
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Signup;
