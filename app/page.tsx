"use client";

import Image from "next/image";
import { useState } from "react";
import { Eye, EyeOff, ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";

export default function RegistrationPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      router.push("/login");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex min-h-screen font-dmSans">
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-16 bg-white">
          <div className={"xl:pl-12.5"}>
              <div>
                  <h1 className={"font-bold text-3xl xl:text-[32px] leading-none"}>Create an account</h1>
                  <p className={"text-p2 text-sm leading-5.5"}>Sign up for Myafrimall and gain unlimited access to shipping to over 300 countries from Nigeria. Do you already have an account? <strong className={"text-primary underline"}><a href={"/login"}>Login</a></strong></p>
              </div>
              <div className={"mt-5 xl:mt-9"}>
                  {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                  <form onSubmit={handleSubmit} className={"grid mt-5 mb-2 space-y-3.5 xl:mt-9 xl:mb-6 xl:space-y-8"}>
                      <div className={"flex gap-4"}>
                          <div className={""}>
                              <label className={"text-p1 text-sm xl:text-[16px] leading-none"}>First name</label>
                              <input 
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                placeholder={"John"} 
                                type={"text"} 
                                className={"mt-2 px-4 w-full py-2 xl:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 placeholder:text-placeholder placeholder:text-sm xl:placeholder:text-[16px] focus:ring-primary/20 focus:border-primary transition-all"} 
                              />
                          </div>
                          <div className={""}>
                              <label className={"text-p1 text-sm xl:text-[16px] leading-none"}>Last name</label>
                              <input 
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                placeholder={"Doe"} 
                                type={"text"} 
                                className={"mt-2 px-4 w-full py-2 xl:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 placeholder:text-placeholder placeholder:text-sm xl:placeholder:text-[16px] focus:ring-primary/20 focus:border-primary transition-all"} 
                              />
                          </div>
                      </div>
                      <div>
                          <label className={"text-p1 text-sm xl:text-[16px] leading-none"}>Email</label>
                          <input 
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder={"user@example.com"} 
                            type={"email"} 
                            className={"mt-2 px-4 w-full py-2 xl:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 placeholder:text-placeholder placeholder:text-sm xl:placeholder:text-[16px] focus:ring-primary/20 focus:border-primary transition-all"} 
                          />
                      </div>
                      <div>
                          <label className={"text-p1 text-sm xl:text-[16px] leading-none"}>Phone Number</label>
                          <div className={"flex border border-gray-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary transition-all"}>
                              <div className={"flex items-center px-3 bg-white border-r border-gray-300 cursor-pointer hover:bg-gray-50"}>
                                  <span className={"text-sm text-placeholder"}>+234</span>
                                  <ChevronDown className={"w-4 h-4 ml-1 text-gray-400"} />
                              </div>
                              <input
                                  name="phone"
                                  value={formData.phone}
                                  onChange={handleChange}
                                  type="tel"
                                  placeholder="8012345678"
                                  className={"w-full px-4 py-2 focus:outline-none placeholder:text-placeholder placeholder:text-sm xl:placeholder:text-[16px]"}
                              />
                          </div>
                      </div>
                      <div>
                          <label className={"text-p1 text-sm xl:text-[16px] leading-none"}>Password</label>
                          <div className={"relative"}>
                              <input 
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                type={showPassword ? "text" : "password"} 
                                placeholder="Enter Password" 
                                className={"w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 placeholder:text-placeholder placeholder:text-sm xl:placeholder:text-[16px] focus:ring-primary/20 focus:border-primary transition-all pr-10"}
                              />
                              <button type="button" onClick={() => setShowPassword(!showPassword)}
                                  className={"absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"}>
                                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                              </button>
                          </div>
                      </div>

                      <button 
                        type="submit" 
                        disabled={loading}
                        className={"mt-2 xl:mt-8 rounded-lg border py-4 px-8 bg-primary text-white font-semibold text-sm leading-5 w-fit disabled:opacity-50"}
                      >
                          {loading ? "Creating account..." : "Create account"}
                      </button>
                  </form>
                  <p className={"text-sm leading-5.5"}>By clicking on create account you agree to our <strong><a className={"underline text-primary"}>privacy <br /> policy</a></strong> and <strong><a className={"underline text-primary"}>terms of use</a></strong></p>
              </div>
          </div>
      </div>
      <div className="hidden xl:pb-39.5 xl:pl-17.25 lg:flex w-1/2 bg-[url(/img/dotted-map.png)] bg-cover items-end">
          <div className={"block text-white"}>
              <p className={"font-semibold text-lg xl:text-2xl leading-8.75"}>Seamlessly Delivering to Over 300 <br /> Countries from Nigeria! </p>
              <p className={"text-sm xl:text-lg leading-7.5 font-normal"}>Access global markets with our quick shipping from Nigeria! Fast <br /> delivery and easy customs to 300+ countries.</p>
          </div>
      </div>
    </div>
  );
}

