export const SportList = () => {
    const sport = [
        { url: "./public/Archery.png" },
        { url: "./public/Badminton.png" },
        { url: "./public/BaseBall.png" },
        { url: "./public/Billiar.png" },
        { url: "./public/Bowling.png" },
        { url: "./public/Golf.png" },
        { url: "./public/PingPong.png" },
        { url: "./public/Running.png" },
        { url: "./public/Football.png" },
    ]


    return (
        <div className="w-full bg-[#8A1818] h-[400px] mt-17 flex flex-col items-center">
            <div className="mt-17">
                <h1 id="jersey" className="w-[470px] text-white text-4xl text-center">
                    Embark on your journey to live a healthier life,
                    starting with your physique
                </h1>
            </div>
            <div className="slide-container mt-17 h-20 pt-2">
                <div className="slide-track">
                    {sport.map((list, index) => (
                        <div key={index} className="slide-item px-3 py-3 outline-1 outline-white rounded-xl">
                            <img src={list.url} alt={`sport-${index}`} />
                        </div>
                    ))}

                    {sport.map((list, index) => (
                        <div key={`dup-${index}`} className="slide-item px-3 py-3 outline-1 outline-white rounded-xl">
                            <img src={list.url} alt={`sport-dup-${index}`} />
                        </div>
                    ))}
                </div>
            </div>

        </div>
    )
}