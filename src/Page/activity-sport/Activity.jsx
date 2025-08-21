import { Link } from "react-router-dom"
import { useState, useEffect } from "react"
import { NavBar } from "../../global-component/navBar"
import { FilterSport } from "./Component/FilterSport1"

export const Activity = () => {
    return (
        <div className="overflow-x-hidden">
            <div className="w-screen flex flex-col items-center">
                <div className="lg:w-[928px] xl:w-[1225px] flex justify-between">
                    <div className="w-[1px] h-auto bg-black"></div> {/* <--- ini garis bjier*/}
                    <div className="lg:w-[926px] xl:w-[1233px] flex flex-col items-center">
                        <NavBar />
                        <div className="w-full h-[1px] bg-black"></div> {/* <--- ini garis bjier*/}
                        <div className="w-full h-75">
                            <img src="./public/golf-image.svg" className="w-full h-full object-cover" />
                        </div>
                        <div className="w-full h-[1px] bg-black"></div> {/* <--- ini garis bjier*/}
                        <div className="w-full flex flex-col items-center bg-[#FFC800]">
                            <FilterSport />
                            <div className="w-full h-7"></div>
                        </div>
                    </div>
                    <div className="w-[1px] h-auto bg-black"></div> {/* <--- ini garis bjier*/}
                </div>
            </div>
        </div>
    )
}