import { Link } from "react-router-dom"
import axios from "axios";
import { useState, useEffect } from "react";
import { FilterSport } from "./component/FilterSport2";

export const SportAdminDashboard = () => {
    const tag = [
        { sport1: ["Runner", "Football", "Basketball"] },
        { sport2: ["Runner", "Soccer", "Swim"] }
    ]


    const [user, setUser] = useState({});
    const [token, setToken] = useState(localStorage.getItem("accessToken"));

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
                console.log(res)
                setUser(res.data.data);
            } catch (error) {
                console.error("Gagal ambil data user:", error);
            }
        };

        getData();
    }, [token]);

    return (
        <div className="overflow-x-hidden">
            <div className="w-screen flex flex-col items-center">
                <div className="lg:w-[928px] xl:w-[1225px] flex justify-between">
                    <div className="w-[1px] h-auto bg-black"></div> {/* <--- ini garis bjier*/}
                    <div className="lg:w-[926px] xl:w-[1223px] flex flex-col items-center mb-7">
                        <div className="w-full h-[145px] outline-1 outline-black">
                            <img src={
                                !user.name || user.name.length === 0
                                    ? "./public/default-banner.jpg"
                                    : user.name.length % 2 === 0
                                        ? "./public/banner.jpg"
                                        : "./public/banner2.jpeg"
                            } className="w-full h-full object-cover" />
                        </div>
                        <div className="lg:w-[854px] xl:w-[1025px]">
                            <div className="w-full flex justify-between relative">
                                <div>
                                    <div className="w-[200px] h-[200px] bg-amber-700 outline-7 outline-[#E7E7E7] absolute -translate-y-9">
                                        <img src={
                                            !user.name || user.name.length === 0
                                                ? "./public/default.png"
                                                : user.name.length % 2 === 0
                                                    ? "./public/Kaoruko.jpg"
                                                    : "./public/yuzuha.jpg"
                                        } className="w-full h-full object-cover" />
                                    </div>
                                </div>
                                <div className="lg:w-150 xl:w-190 mt-7 flex justify-between">
                                    <div>
                                        <h1 id="cool" className="text-xl text-black">
                                            Hi Again 👋
                                        </h1>
                                        <h1 id="cool" className="text-5xl text-[#8A1818] mt-3">
                                            {user.name}
                                        </h1>
                                        <div className="h-5 flex items-center mt-3 gap-3">
                                            <h1 className="text-base text-[#8A1818] h-7 items-center">
                                                {user.email}
                                            </h1>
                                            <div className="h-full w-[1px] bg-[#8A1818]"></div>
                                            <h1 className="text-base text-[#8A1818]">
                                                20812398238282
                                            </h1>
                                        </div>
                                        <h1 className="text-base mt-5 opacity-65">
                                            Your Tag:
                                        </h1>
                                        <ul className="mt-2 flex gap-2">
                                            {user.name && user.name.length % 2 !== 0
                                                ? tag[0].sport1.map((sport, index) => (
                                                    <div key={index} className="inline-block px-5 py-1 bg-[#FFC800] rounded-full">
                                                        <h1 id="cool" className="text-base text-black">{sport}</h1>
                                                    </div>
                                                ))
                                                : tag[1].sport2.map((sport, index) => (
                                                    <div key={index} className="inline-block px-5 py-1 bg-[#FFC800] rounded-full">
                                                        <h1 id="cool" className="text-base text-black">{sport}</h1>
                                                    </div>
                                                ))}
                                        </ul>
                                    </div>
                                    <div>
                                        <Link to={'/edit-profile'}>
                                            <div className="flex justify-center items-center px-10 h-[30px] bg-[#8A1818] mb-3 hover:cursor-pointer">
                                                <h1 id="cool" className="text-[#E7E7E7] text-[12px]">
                                                    Edit Profile
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
                        <div className="w-full h-[1px] bg-black mt-7">
                        </div>
                        <div className="lg:w-[854px] xl:w-[1025px] mt-5 flex flex-col items-center">
                            <h1 id="cool" className="text-5xl">
                                Dashboard
                            </h1>
                            <div className="w-[260px] h-7 mt-4 text-base flex items-center justify-between">
                                <div className="w-15 flex flex-col items-center">
                                    <h1>Sport</h1>
                                    <div className="w-full h-0.5 bg-black"></div>
                                </div>
                                <Link to={'/admin-category'}>
                                    <h1 className="opacity-35 hover:opacity-85 hover:text-lg hover:cursor-pointer"> Category </h1>
                                </Link>
                                <Link to={'/admin-payment'}>
                                    <h1 className="opacity-35 hover:opacity-85 hover:text-lg hover:cursor-pointer">Payment</h1>
                                </Link>
                            </div>
                            <FilterSport />
                        </div>
                    </div>
                    <div className="w-[1px] h-auto bg-black"></div> {/* <--- ini garis bjier*/}
                </div>
            </div>
        </div>
    )
}