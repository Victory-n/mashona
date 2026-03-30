"use client";

import React, { useState } from "react";
import { Eye, EyeOff, ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";
import { validateLogin } from "@/app/lib/auth";

export default function LoginPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const handleSubmit = (e: React.SubmitEvent) => {
        e.preventDefault();
        setError("");

        if (!email || !password) {
            setError("Please enter your email and password.");
            return;
        }

        const user = validateLogin(email, password);

        if (!user) {
            setError("Invalid email or password. Please try again.");
            return;
        }

        router.push(`/dashboard?userId=${user.id}`);
    };

    return (
        <div className="flex min-h-screen font-dmSans">
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-16 bg-white">
                <div className={"xl:pl-12.5"}>
                    <div>
                        <h1 className={"font-bold text-3xl xl:text-[32px] leading-none"}>
                            Sign in to your account
                        </h1>
                        <p className={"text-p2 text-sm leading-5.5"}>
                            Log in to Myafrimall to enjoy seamless shipping to over 300{" "}
                            <br /> countries right from Nigeria. Don&apos;t have an account
                            yet?{" "}
                            <strong className={"text-primary underline"}>
                                <a href={"/"}>Sign Up</a>
                            </strong>
                        </p>
                    </div>

                    <div className={"mt-5 xl:mt-9"}>
                        <form
                            onSubmit={handleSubmit}
                            className={
                                "grid mt-5 mb-2 space-y-3.5 xl:mt-9 xl:mb-6 xl:space-y-8"
                            }
                        >
                            <div>
                                <label
                                    className={"text-p1 text-sm xl:text-[16px] leading-none"}
                                >
                                    Email
                                </label>
                                <input
                                    placeholder={"user@example.com"}
                                    type={"email"}
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className={
                                        "mt-2 px-4 w-full py-2 xl:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 placeholder:text-placeholder placeholder:text-sm xl:placeholder:text-[16px] focus:ring-primary/20 focus:border-primary transition-all"
                                    }
                                />
                            </div>

                            <div>
                                <label
                                    className={"text-p1 text-sm xl:text-[16px] leading-none"}
                                >
                                    Password
                                </label>
                                <div className={"relative"}>
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Enter Password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className={
                                            "w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 placeholder:text-placeholder placeholder:text-sm xl:placeholder:text-[16px] focus:ring-primary/20 focus:border-primary transition-all pr-10"
                                        }
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className={
                                            "absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                        }
                                    >
                                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                    </button>
                                </div>
                            </div>

                            {error && (
                                <p className={"text-red-500 text-sm leading-5"}>{error}</p>
                            )}

                            <button
                                type="submit"
                                className={
                                    "mt-2 xl:mt-8 rounded-lg border py-4 px-8 bg-primary text-white font-semibold text-sm leading-5 w-fit hover:bg-primary/90 transition-colors"
                                }
                            >
                                Login
                            </button>
                        </form>

                        <p className={"text-sm leading-5.5"}>
                            By clicking on create account you agree to our{" "}
                            <strong>
                                <a className={"underline text-primary"}>
                                    privacy <br /> policy
                                </a>
                            </strong>{" "}
                            and{" "}
                            <strong>
                                <a className={"underline text-primary"}>terms of use</a>
                            </strong>
                        </p>

                        {/* Demo credentials hint */}
                        <div className={"mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200"}>
                            <p className={"text-xs text-gray-500 font-medium mb-2"}>Demo accounts:</p>
                            <p className={"text-xs text-gray-400"}>bunmi@myafrimall.com / bunmi123</p>
                            <p className={"text-xs text-gray-400"}>mercy@myafrimall.com / mercy123</p>
                            <p className={"text-xs text-gray-400"}>tunde@myafrimall.com / tunde123</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="hidden xl:pb-39.5 xl:pl-17.25 lg:flex w-1/2 bg-[url(/img/dotted-map.png)] bg-cover items-end">
                <div className={"block text-white"}>
                    <p className={"font-semibold text-lg xl:text-2xl leading-8.75"}>
                        Effortlessly Track Your Shipments <br /> from Nigeria!
                    </p>
                    <p className={"text-sm xl:text-lg leading-7.5 font-normal"}>
                        Monitor your shipments from Nigeria! Enjoy swift delivery and{" "}
                        <br /> seamless customs processing
                    </p>
                </div>
            </div>
        </div>
    );
}