export const HeroSection = () => {
    const commentary = [
        {
            role: "user",
            name: "Fulanochi",
            email: "Fulanochi@gmail.com",
            rating: "/empat.png",
            image:"/luna.jpg",
            review: "Sudah tiga kali saya pakai layanan ini untuk basket dan voli. Jadwalnya jelas, proses booking cepat, dan sistem pembayarannya aman. Paling enak itu kita bisa lihat langsung ketersediaan lapangan tanpa harus tanya-tanya lagi. Kalau bisa sih ditambah fitur pilihan tipe lantai atau fasilitas pendukung biar lebih mantap, tapi secara keseluruhan ini udah jauh lebih praktis dibanding cara lama."
        },
        {
            role: "Sports Venue Owner ",
            name: "Fulono",
            email: "Fulono@gmail.com",
            image:"/numberOne.jpg",
            rating: "/empat.png",
            review: "Sejak bergabung dengan platform ini, jumlah penyewa lapangan meningkat signifikan, terutama di jam-jam yang biasanya sepi. Proses manajemen jadwal jadi jauh lebih rapi dan hemat waktu karena semua terintegrasi. Saya tidak perlu repot angkat telepon berkali-kali untuk konfirmasi booking. Selain itu, promosi dari platform ini membantu GOR kami dikenal lebih banyak orang. Layanan ini jelas menguntungkan, baik untuk pemilik maupun pemain."
        },
        {
            role: "User",
            name: "Fulanoo",
            email: "Fulanoo@gmail.com",
            image:"/BillyButcher.jpg",
            rating: "/empatkurang.png",
            review: "Aku pancen seneng olahraga, luwih-luwih futsal karo kanca-kanca. Sakdurunge ngerti layanan iki, aku kerep bingung golek lapangan sing kosong, kudu telpon siji-siji lan asring kebacut penuh. Saiki, mung butuh sawetara menit wae wis iso pesen lapangan, jadwale cetha lan pembayarané gampang. Pancen marem tenan, rausah ruwet-ruwet maneh, tinggal main wae!"
        }
    ]


    return (
        <div className="h-[584px]">
            <div className="bg-[url('/public/hero-section.svg')] bg-cover bg-center bg-no-repeat
            lg:w-[926px] xl:w-[1223px] h-[503px] flex flex-col items-center outline outline-black relative overflow-visible">
                <div className="mt-4">
                    <h1 id="jersey" className="text-5xl text-white text-center leading-15">Your Sports, <br /> Your
                        <span className="h-[55px] px-2 ml-3 bg-[#8A1818]">
                            Schedule
                        </span>
                    </h1>
                    <p className="w-[615px] text-[12px] text-[#FFC800] text-center mt-5">
                        Find and book the perfect place to play — from the bustling courts of Jakarta to the scenic greens of Bali,
                        from the futsal fields in Medan to the t
                        ennis courts in Makassar — no matter the sport, wherever you are across the archipelago, secure your game
                        time in just a few clicks.
                    </p>
                </div>
                <div className="lg:w-[854px] xl:w-[1025px] h-[35px] flex items-center justify-between absolute mt-60 ">
                    <h1 id="cool" className="text-2xl text-white">
                        ’’ What They Said About Us
                    </h1>
                    {/* <div className="w-[150px] h-[25px] bg-[#FFC800] outline-1 outline-black rounded-full flex items-center justify-center">
                        <h1 id="cool" className="text-[10px] text-black">Check Our Product now</h1>
                    </div> */}
                </div>
                <div className="lg:w-[854px] xl:w-[1025px] absolute mt-73 flex justify-between">
                    {commentary.map((data, index) => (
                        <div key={index} className="w-[250px] h-[275px] flex justify-center items-center bg-[#FFC800] rounded-2xl outline-1 outline-black">
                            <div className="w-[212px] h-[235px]">
                                <div className="w-full h-[70px] flex justify-between">
                                    <div>
                                        <div className="w-[125px] flex justify-center outline-1 outline-black rounded-full">
                                            <h1 id="cool" className="text-[12px]">
                                                {data.role}
                                            </h1>
                                        </div>
                                        <h1 id="cool" className="text-xl">
                                            {data.name}
                                        </h1>
                                        <h2 className="text-[10px] text-[#8A1818]">
                                            {data.email}
                                        </h2>
                                        <div className="w-25 h-[10px] mt-2">
                                            <img src={data.rating} alt="" />
                                        </div>
                                    </div>
                                    <div className="w-[70px] h-[70px] bg-amber-700 rounded-full outline-1 outline-black overflow-hidden">
                                        <img src={data.image} alt="" />
                                    </div>
                                </div>
                                <div className="mt-7">
                                    <p className="text-[9px] opacity-45">
                                        {data.review}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))
                    }
                </div>
            </div>
        </div>
    )
}