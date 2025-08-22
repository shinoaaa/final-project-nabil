import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const NavBar = () => {
    const [user, setUser] = useState({});
    const [token, setToken] = useState(localStorage.getItem("accessToken"));
    const [showConfirm, setShowConfirm] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const navigate = useNavigate();

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

    const handleLogout = () => {
        localStorage.removeItem("accessToken");
        setToken(null);
        setUser({});
        setShowConfirm(false);
        setShowDropdown(false);

        toast.success("Logout successful", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            theme: "colored",
        });

        setTimeout(() => {
            navigate("/login");
        }, 3000);
    };

    return (
        <div className="lg:w-[854px] xl:w-[1025px] h-[66px] relative">
            <ToastContainer />
            <div className="flex h-full items-center justify-between">
                <Link to={'/'}>
                    <h1 id="jersey" className="text-4xl text-[#8A1818] hover:cursor-pointer">
                        GN
                    </h1>
                </Link>
                <ul id="cool" className="ml-27 flex text-base gap-7">
                    <Link to={'/'}>
                        <li className="hover:cursor-default opacity-50 hover:opacity-90">Home</li>
                    </Link>
                    <Link to={"/activity"}>
                        <li className="scale opacity-50 hover:opacity-90">Activity</li>
                    </Link>
                    <Link to={'/merchant'}>
                        <li className="scale opacity-50 hover:opacity-90">Merchant</li>
                    </Link>
                </ul>
                <div className="flex h-[40px] items-center gap-2">
                    <h1 id="cool" className="text-base text-[#8A1818] mr-3">
                        {user.name}
                    </h1>

                    <div
                        className="pfp w-[40px] h-[40px] rounded-full outline-1 outline-black cursor-pointer"
                        onClick={() => setShowDropdown(!showDropdown)}
                    >
                        <img
                            src={
                                !user.name || user.name.length === 0
                                    ? "./public/default.png"
                                    : user.name.length % 2 === 0
                                        ? "./public/Kaoruko.jpg"
                                        : "./public/yuzuha.jpg"
                            }
                            className="w-full h-full object-cover rounded-full"
                        />
                    </div>
                    <img
                        src="./public/arrow-down.svg"
                        className="cursor-pointer hover:opacity-45"
                        onClick={() => setShowDropdown(!showDropdown)}
                    />
                </div>
            </div>

            <div
                className={`drop-down absolute w-[125px] h-20 flex flex-col bg-white z-10 right-0 -translate-y-2 outline-1 outline-black rounded-xl ${showDropdown ? "active" : ""
                    }`}
            >
                <ul id="cool" className="text-[12px] text-[#8A1818] mt-2 ml-3 leading-8">
                    <Link to={user?.role === "admin" ? "/admin-sport" : "/profile"}>
                        <li className="flex items-center gap-2 w-20">
                            <div className="w-[15px] h-[15px]">
                                <img
                                    src={
                                        user?.role === "admin"
                                            ? "./public/dashbaord.svg"
                                            : "./public/profile.svg"
                                    }
                                    alt=""
                                />
                            </div>
                            <h1>{user?.role === "admin" ? "Dashboard" : "Profile"}</h1>
                        </li>
                    </Link>
                    {!token && (
                        <Link to={"/login"}>
                            <li className="flex items-center gap-2 hover:cursor-pointer w-20">
                                <div className="w-[15px] h-[15px]">
                                    <img src="./public/login.svg" alt="" />
                                </div>
                                <h1>Login</h1>
                            </li>
                        </Link>
                    )}

                    {token && (
                        <li
                            className="flex items-center gap-2 hover:cursor-pointer w-20"
                            onClick={() => setShowConfirm(true)}
                        >
                            <div className="w-[15px] h-[15px]">
                                <img src="./public/logout.svg" alt="" />
                            </div>
                            <h1>Logout</h1>
                        </li>
                    )}
                </ul>
            </div>

            {showConfirm && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/50">
                    <div className="bg-white p-5 rounded-xl shadow-lg">
                        <p className="text-sm mb-4 text-black">Sure to LogOut?</p>
                        <div className="flex gap-3">
                            <button
                                onClick={handleLogout}
                                className="px-4 py-1 bg-[#8A1818] text-white rounded-lg text-sm"
                            >
                                Yes
                            </button>
                            <button
                                onClick={() => setShowConfirm(false)}
                                className="px-4 py-1 bg-gray-300 rounded-lg text-sm"
                            >
                                Decline
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};