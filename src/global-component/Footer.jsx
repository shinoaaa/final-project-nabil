export const Footer = () => {
    const socialMedia = [
        {image:"/linkedin.svg"},
        {image:"/tiktok.svg"},
        {image:"/whatsapp.svg"},
        {image:"/facebook.svg"},
        {image:"/xs.svg"},
    ]

    return (
        <div className="w-screen bg-black flex justify-center text-white">
            <div className="lg:w-[854px] xl:w-[1025px]">
                <div className="flex mt-9 justify-between">
                    <div>
                        <div>
                            <h1 id="jersey" className="text-6xl text-[#8A1818]">
                                GN
                            </h1>
                            <h2 id="cool" className="text-xl opacity-75">
                                Gocca Nisser
                            </h2>
                        </div>
                        <p className="w-[200px] text-[12px] opacity-50 mt-5">
                            Jl. Armed and Dangerous No. 10D Jinzhou 10340 Jinzhou, Solaris
                        </p>
                        <div className="mt-5 flex">
                            <div className="w-[19px] h-[8px] mr-1">
                                <img src="/telephone.png" alt="" />
                            </div>
                            <div className="w-[142px] text-[12px] opacity-50">
                                +0628798-81122-32218
                                (dummy number btw)
                            </div>
                        </div>
                    </div>
                    <div className="">
                        <h1 id="cool" className="text-xl ">
                            Company
                        </h1>
                        <ul className="text-[12px] mt-5 opacity-60 leading-9">
                            <li>About</li>
                            <li>Privacy and Policy</li>
                            <li>Terms and Conditions</li>
                        </ul>
                    </div>
                    <div className="w-[122px] flex flex-col items-center">
                        <h1 id="cool" className="text-xl">
                            Social Media
                        </h1>
                        <ul className="w-full flex justify-between mt-1">
                            {socialMedia.map((icon,index) => (
                                <li key={index} className="w-[12px] h-[12px]">
                                    <img src={icon.image} className="w-full h-full object-cover" />
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <h1 className="text-[12px] mt-12 mb-15">
                    © 2025 www.Gocca-Nisser.com - All Rights Reserved.
                </h1>
            </div>
        </div>
    )
}