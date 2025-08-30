import { Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const EditProfilePage = () => {
    const [user, setUser] = useState({});
    const [token, setToken] = useState(localStorage.getItem("accessToken"));
    const [form, setForm] = useState({
        name: "",
        email: "",
        phone_number: "",
        role: "",
        password: "",
        c_password: ""
    });
    const [error, setError] = useState(false);

    useEffect(() => {
        const getData = async () => {
            if (!token) return;

            try {
                const res = await axios.get(
                    "https://sport-reservation-api-bootcamp.do.dibimbing.id/api/v1/me",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            apiKey: "YOUR_API_KEY_HERE",
                        },
                    }
                );
                setUser(res.data.data);
            } catch (error) {
                console.error("Gagal ambil data user:", error);
            }
        };

        getData();
    }, [token]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        const isPasswordEmpty = !form.password;
        const isConfirmEmpty = !form.c_password;
        const roleValue = form.role.trim().toLowerCase();
        const isRoleInvalid = roleValue && !["admin", "user"].includes(roleValue);

        if (isPasswordEmpty || isConfirmEmpty || isRoleInvalid) {
            setError({
                password: isPasswordEmpty,
                c_password: isConfirmEmpty,
                role: isRoleInvalid
            });
            return;
        }

        const payload = {
            name: form.name || user.name,
            email: form.email || user.email,
            phone_number: form.phone_number || user.phone_number || "",
            role: roleValue || user.role,
            password: form.password,
            c_password: form.c_password
        };

        try {
            await axios.post(
                `https://sport-reservation-api-bootcamp.do.dibimbing.id/api/v1/update-user/${user.id}`, // pake user.id
                payload,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        apiKey: "YOUR_API_KEY_HERE"
                    }
                }
            );
            toast.success("Profile updated successfully!", {
                position: "top-right",
                autoClose: 2000,
            });
            setError({ password: false, c_password: false, role: false });

            setTimeout(() => {
                window.location.href = "/profile";
            }, 2000);
        } catch (err) {
            toast.error("Update failed!", {
                position: "top-center",
                autoClose: 2000,
                theme: "colored"
            });
        }

    };

    return (
        <div className="">
            <ToastContainer />
            <div className="w-screen flex flex-col items-center">
                <div className="lg:w-[928px] md:w-[725px] xl:w-[1225px] h-screen flex justify-between">
                    <div className="w-[1px] h-auto bg-black"></div>
                    <div className="lg:w-[926px] xl:w-[1223px] md:w-[725px] flex flex-col items-center">
                        <div className="w-full h-[145px] outline-1 outline-black">
                            <img
                                src={
                                    !user.name || user.name.length === 0
                                        ? "/default-banner.jpg"
                                        : user.name.length % 2 === 0
                                            ? "/banner.jpg"
                                            : "/banner2.jpeg"
                                }
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="lg:w-[854px] xl:w-[1025px] md:w-[675px]">
                            <div className="w-full flex justify-between relative">
                                <div>
                                    <div className="xl:w-[200px] lg:w-[200px] md:w-[150px] xl:h-[200px] lg:h-[200px] md:h-[150px] bg-amber-700 outline-7 outline-[#E7E7E7] absolute -translate-y-9">
                                        <img
                                            src={
                                                !user.name || user.name.length === 0
                                                    ? "/default.png"
                                                    : user.name.length % 2 === 0
                                                        ? "/Kaoruko.jpg"
                                                        : "/yuzuha.jpg"
                                            }
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                </div>
                                <div className="lg:w-150 xl:w-185 md:w-122 mt-7 flex justify-between">
                                    <div className="lg:w-80 xl:w-120 md:w-65">
                                        <h1 id="cool" className="text-xl text-black">
                                            Hi Again 👋
                                        </h1>
                                        <input
                                            name="name"
                                            value={form.name}
                                            onChange={handleChange}
                                            placeholder={user.name}
                                            className="w-full h-15 pl-5 xl:text-4xl lg:text-4xl md:text-xl text-[#8A1818] mt-3 bg-[#DBDBDB] outline-1 outline-black rounded-2xl"
                                        />
                                        <div className="h-7 flex items-center mt-7 gap-3 justify-between">
                                            <input
                                                name="email"
                                                value={form.email}
                                                onChange={handleChange}
                                                placeholder={user.email}
                                                className="lg:w-35 xl:w-75 md:w-37 h-7 pl-3 text-xs text-[#8A1818] outline-1 outline-black rounded-md bg-[#DBDBDB]"
                                            />
                                            <div className="h-full w-[1px] bg-[#8A1818]"></div>
                                            <input
                                                name="phone_number"
                                                value={form.phone_number}
                                                onChange={handleChange}
                                                placeholder={user.phone_number || "20812398238282"}
                                                className="xl:w-35 lg:w-35 md:w-27 h-7 pl-3 text-xs text-[#8A1818] outline-1 outline-black rounded-md bg-[#DBDBDB]"
                                            />
                                        </div>
                                        <div className="h-6 flex items-center mt-7 gap-3 justify-between">
                                            <input
                                                type="password"
                                                name="password"
                                                value={form.password}
                                                onChange={handleChange}
                                                placeholder="Password"
                                                className={`w-35 py-2 text-xs pl-3 text-[#8A1818] rounded-md bg-[#DBDBDB] ${error && !form.password ? "outline-red-500" : "outline-black"
                                                    } outline-1`}
                                            />
                                            <div className="h-full w-[1px] bg-[#8A1818]"></div>
                                            <input
                                                type="password"
                                                name="c_password"
                                                value={form.c_password}
                                                onChange={handleChange}
                                                placeholder="Confirm Password"
                                                className={`lg:w-40 xl:w-75 py-2 text-xs pl-3 text-[#8A1818] rounded-md bg-[#DBDBDB] ${error && !form.c_password ? "outline-red-500" : "outline-black"
                                                    } outline-1`}
                                            />
                                        </div>
                                        {error && (!form.password || !form.c_password) && (
                                            <p className="text-red-500 text-xs mt-2">
                                                Please fill in both password fields
                                            </p>
                                        )}
                                        <div className="flex flex-col mt-7">
                                            <div className="flex justify-between items-center">
                                                <h1>Role:</h1>
                                                <input
                                                    name="role"
                                                    value={form.role}
                                                    onChange={handleChange}
                                                    placeholder={user.role}
                                                    className={`lg:w-65 xl:w-105 md:w-55 h-9 bg-[#DBDBDB] pl-3 text-xs text-[#8A1818] rounded-full ${error.role ? "outline-red-500" : "outline-black"
                                                        } outline-1`}
                                                />
                                            </div>
                                            {error.role && (
                                                <p className="text-red-500 text-xs mt-2 text-left">
                                                    Role must be either "admin" or "user"
                                                </p>
                                            )}
                                        </div>
                                        <button
                                            onClick={handleSubmit}
                                            className="px-7 py-1 bg-[#FFC800] mt-7 text-black rounded-full outline-1 outline-black"
                                        >
                                            Confirm
                                        </button>
                                        <p className="mt-5 text-xs">
                                            <span className="text-red-700 text-[15px]">*</span> Note: You don’t need to change all of your account information.
                                            Your existing data will be pre-filled, but you must re-enter or update your password.
                                        </p>
                                    </div>
                                    <div>
                                        <Link to={user?.role === "admin" ? "/admin-sport" : "/profile"}>
                                            <div className="flex justify-center items-center xl:px-10 lg:px-10 h-[30px] bg-[#8A1818] mb-3 hover:cursor-pointer">
                                                <h1 id="cool" className="text-[#E7E7E7] text-[12px]">
                                                    Return to Profile Page
                                                </h1>
                                            </div>
                                        </Link>

                                        <Link to={'/'}>
                                            <div className="flex justify-center items-center px-10 h-[30px] outline-1 outline-[#8A1818] bg-[#E7E7E7] cursor-pointer">
                                                <h1 id="cool" className="text-[#8A1818] text-[12px]">
                                                    Return to Home Page
                                                </h1>
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-full h-[1px] bg-black mt-15"></div>
                        <div className="w-full h-full bg-[#151515]"></div>
                    </div>
                    <div className="w-[1px] h-screen bg-black"></div>
                </div>
            </div>
        </div>
    );
};