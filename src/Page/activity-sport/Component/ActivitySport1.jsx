import { useState } from "react";
import { Link } from "react-router-dom";

export const ActivitySport = ({ sports = [] }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const totalPages = Math.ceil(sports.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const displayedSports = sports.slice(startIdx, startIdx + itemsPerPage);

  if (!displayedSports.length) {
    return (
      <div className="w-full mt-5 text-[#8A1818] text-center">
        <h1 className="text-lg">No sport activities found for this city.</h1>
      </div>
    );
  }

  return (
    <div className="w-full mt-7">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 gap-y-7">
        {displayedSports.map((activity, index) => (
          <div
            key={index}
            className="w-[275px] h-[200px] bg-[#8A1818] outline outline-[#8A1818] relative"
          >
            <div className="w-[275px] h-[75px]">
              <img src="./public/sport.jpg" className="w-full h-full object-cover" />
            </div>
            <div className="w-[50px] h-[50px] bg-[#8A1818] outline-1 outline-black rounded-md absolute -translate-y-[25px] right-0 mr-5 flex justify-center items-center">
              <h1 id="cool" className="text-[8px] text-white text-center">
                Slot Status : <br />
                {activity.participants?.length >= activity.slot ? (
                  <span id="cool" className="text-white">FULL</span>
                ) : (
                  <>
                    {activity.participants?.length || 0}/{activity.slot}
                  </>
                )}
              </h1>
            </div>
            <div className="w-[250px] flex mt-2 justify-between">
              <div className="max-w-[220px] leading-5 ml-3">
                <h1 className="text-base text-white truncate">{activity.title}</h1>
                <h1 className="text-[9px] text-[#FFC800]">Rp{activity.price}</h1>
                <div className="flex h-[15px] items-center mt-1">
                  <div className="w-[15px] h-[15px]">
                    <img src="./public/buildings.svg" className="w-full h-full object-cover" />
                  </div>
                  <h1 className="text-[8px] w-33 text-white ml-2 truncate">
                    Address: {activity.address}
                  </h1>
                </div>
                <div className="mt-5">
                  {activity.participants?.length >= activity.slot ? (
                    <div
                      className="px-3 h-[20px] bg-[#cb9f02] flex justify-center items-center rounded-full text-[12px] cursor-not-allowed"
                      id="cool"
                    >
                      <h1 id="cool" className="text-black">FULL</h1>
                    </div>
                  ) : (
                    <Link to={`/detail/${activity.id}`}>
                      <div
                        className="px-3 h-[20px] bg-[#FFC800] flex justify-center items-center rounded-full cursor-pointer text-[12px] hover:text-[13px]"
                        id="cool"
                      >
                        <h1 className="text-black">Booking Now</h1>
                      </div>
                    </Link>
                  )}
                </div>
              </div>
              <div className="text-[12px] flex flex-col justify-end text-white">
                <div className="w-[55px] flex flex-col items-center">
                  <h1>Contact</h1>
                  <ul className="flex gap-2 mb-1">
                    <li className="w-[10px] h-[10px]">
                      <img src="./public/facebooks.svg" />
                    </li>
                    <li className="w-[10px] h-[10px]">
                      <img src="./public/tiktoks.svg" />
                    </li>
                    <li className="w-[10px] h-[10px]">
                      <img src="./public/x.svg" />
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-10 gap-4 items-center mr-12">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
          className="w-10 h-10 text-white rounded disabled:text-[#BFBFBF] disabled:opacity-50"
        >
          <img src="./public/arrow-left-circle.svg" className="w-full h-full object-cover" />
        </button>
        <span id="cool" className="text-[#8A1818]">
          {currentPage} / {totalPages}
        </span>
        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((prev) => prev + 1)}
          className="w-10 h-10 text-white rounded disabled:text-[#BFBFBF] disabled:opacity-50"
        >
          <img src="./public/arrow-right-circle.svg" className="w-full h-full object-cover" />
        </button>
      </div>
    </div>
  );
};
