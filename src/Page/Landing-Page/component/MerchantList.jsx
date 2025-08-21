import { Link } from "react-router-dom"

export const MerchantList = () => {
    const merchant = [
        {
            name: "Atheist Golf Stick ",
            brand: "Titleist",
            background: "./public/golf-image.png",
            image: "./public/golf-brand.png",
            user: "220+",
            price: "70000",
            desc: "Achieve precision and power with this premium golf stick, crafted for peak performance on every swing, whether you’re on the range or in a championship match."
        },
        {
            name: "Naik Air Maxx21",
            brand: "Nike",
            background: "./public/run-image.png",
            image: "./public/run-brand.png",
            user: "800+",
            price: "120000",
            desc: "Lightweight running shoes with superior cushioning for comfort from start to finish, keeping your stride smooth during sprints, jogs, or daily training."
        },
        {
            name: "Yanglex Astrox 100 ZZ",
            brand: "Yonex",
            background: "./public/badminton-image.png",
            image: "./public/badminton-brand.png",
            user: "200+",
            price: "80000",
            desc: "High-performance badminton racket offering explosive smashes and precise control, perfect for players aiming to dominate rallies with speed and accuracy."
        },
        {
            name: "Naik Phantom GX 2",
            brand: "Nike",
            background: "./public/soccer-image.png",
            image: "./public/soccer-brand.png",
            user: "670+",
            price: "120000",
            desc: "Soccer boots engineered for maximum grip, control, and acceleration on every play, helping you outpace opponents and stay in command of the ball."
        }
    ]

    return (
        <div className="lg:w-[854px] xl:w-[1025px] mt-10">
            <div className="w-full flex items-baseline justify-between">
                <h1 id="jersey" className="text-6xl text-[#8A1818]">
                    Gear Up
                </h1>
                <Link to={'/merchant'}>
                    <h2 id="cool" className="text-xl text-[#8A1818] hover:cursor-pointer hover:text-[22px]">
                        View More
                    </h2>
                </Link>
            </div>
            <p className="mt-1 text-[#8A1818] text-[15px] opacity-50">
                From the court to the field — get your winning look here.
            </p>
            <div className="w-full flex justify-between mt-7 mb-12">
                {merchant.map((product, index) => (
                    <div key={index} className="w-[200px] h-[305px] bg-[#8A1818] outline-1 outline-[#8A1818] relative">
                        <div className="w-full h-[65px] bg-amber-500 outline-1 outline-[#8A1818]">
                            <img src={product.background} alt="" />
                        </div>
                        <div className="w-[100px] h-[100px] flex justify-center items-center rounded-full bg-[#FFFFFF] outline-5 outline-[#8A1818] absolute top-0 ml-[50px] mt-7">
                            <img src={product.image} alt="" />
                        </div>
                        <div className="w-full flex justify-center mt-19">
                            <h1 id="cool" className="text-[18px] text-white">
                                {product.name}
                            </h1>
                        </div>
                        <div className="w-full flex flex-col items-center mt-2">
                            <div className="flex w-[170px] justify-between">
                                <h1 id="cool" className="text-[12px] text-white">
                                    {product.brand}
                                </h1>
                                <div className="flex">
                                    <img src='./public/person.png' alt="" />
                                    <h1 id="cool" className="text-[12px] text-[#FFC800] ml-1">
                                        {product.user}
                                    </h1>
                                </div>
                                <h1 id="cool" className="text-[12px] text-[#FFC800] ">
                                    Rp {product.price}
                                </h1>
                            </div>
                            <p className="text-[7px] opacity-50 text-white w-[170px] h-[40px] mt-3">
                                {product.desc}
                            </p>
                            <Link to={'/merchant'}>
                                <button className="change w-[170px] h-[20px] mt-4 bg-white flex justify-center items-center rounded-full">
                                    <h1 id="cool" className="text-[12px] text-[#8A1818]">
                                        Add to Chart
                                    </h1>
                                </button>
                            </Link>
                        </div>
                    </div>
                ))

                }

            </div>
        </div>
    )
}