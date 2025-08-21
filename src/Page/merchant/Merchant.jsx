import { NavBar } from "../../global-component/navBar"

export const Merchant = () => {
    return (
        <div className="overflow-hidden">
            <div className="w-screen flex flex-col items-center">
                <div className="lg:w-[928px] xl:w-[1225px] h-screen flex justify-between">
                    <div className="w-[1px] bg-black"></div> {/* <--- ini garis bjier*/}
                    <div className="lg:w-[926px] xl:w-[1233px] h-screen flex flex-col items-center">
                        <NavBar />
                        <div className="w-full h-[1px] bg-black"></div>
                        <div className="w-full h-full flex justify-center items-center">
                            <div className="w-full flex flex-col items-center">
                                <div className="w-30 h-30">
                                    <img src="./public/notfound.png" className="w-full h-full object-cover" />
                                </div>
                                <h1>
                                    Sorry this page is not yet available
                                </h1>
                            </div>
                        </div>
                    </div>
                    <div className="w-[1px] bg-black"></div> {/* <--- ini garis bjier*/}
                </div>
            </div>
        </div>
    )
}