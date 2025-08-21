import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; 

export const ActivitySport = ({ sports = [] }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [openIndex, setOpenIndex] = useState(null);
  const [detailCache, setDetailCache] = useState({});
  const [detailLoadingId, setDetailLoadingId] = useState(null);
  const [detailError, setDetailError] = useState(null);
  const [formData, setFormData] = useState({});
  const [loadingUpdateId, setLoadingUpdateId] = useState(null);
  const [loadingDeleteId, setLoadingDeleteId] = useState(null);

  const itemsPerPage = 6;
  const totalPages = Math.ceil(sports.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const displayedSports = sports.slice(startIdx, startIdx + itemsPerPage);

  const fetchDetail = async (id) => {
    try {
      setDetailLoadingId(id);
      setDetailError(null);
      const res = await axios.get(
        `https://sport-reservation-api-bootcamp.do.dibimbing.id/api/v1/sport-activities/${id}`
      );
      const detail = res.data?.result ?? res.data?.data ?? {};
      setDetailCache((prev) => ({ ...prev, [id]: detail }));
      setFormData((prev) => ({
        ...prev,
        [id]: {
          city_id: detail.city_id ?? "",
          title: detail.title ?? "",
          description: detail.description ?? "",
          slot: detail.slot ?? "",
          price: detail.price ?? "",
          address: detail.address ?? "",
          map_url: detail.map_url ?? "",
          sport_category_id: detail.sport_category_id ?? "",
          activity_date: detail.activity_date ?? "",
          start_time: detail.start_time ?? "06:00",
          end_time: detail.end_time ?? "07:00",
        },
      }));
    } catch (e) {
      setDetailError(e?.response?.data?.message || e.message);
    } finally {
      setDetailLoadingId(null);
    }
  };

  const toggleOpen = async (index) => {
    if (openIndex === index) {
      setOpenIndex(null);
      return;
    }
    setOpenIndex(index);
    const current = displayedSports[index];
    if (current?.id && !detailCache[current.id]) {
      await fetchDetail(current.id);
    }
  };

  const handleChange = (id, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: value,
      },
    }));
  };

  const handleUpdate = async (id) => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        toast.error("Token are Required");
        return;
      }

      setLoadingUpdateId(id);

      const data = formData[id];
      await axios.post(
        `https://sport-reservation-api-bootcamp.do.dibimbing.id/api/v1/sport-activities/update/${id}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Update Success!");
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    } finally {
      setLoadingUpdateId(null);
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        toast.error("Try To Login And Get the Token");
        return;
      }

      setLoadingDeleteId(id);

      await axios.delete(
        `https://sport-reservation-api-bootcamp.do.dibimbing.id/api/v1/sport-activities/delete/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Delete Success");
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    } finally {
      setLoadingDeleteId(null);
    }
  };

  if (!displayedSports.length) {
    return (
      <div className="w-full mt-5 text-[#8A1818] text-center">
        <h1 className="text-lg">No sport activities found for this city.</h1>
      </div>
    );
  }

  return (
    <div className="w-full mt-7">
      {displayedSports.map((activity, index) => {
        const id = activity.id;
        const detail = id ? detailCache[id] : {};
        const data = formData[id] || {};

        return (
          <div key={id ?? index} className="mb-6">
            <div className="w-full h-[50px] flex text-xl items-center bg-[#FFC800] outline-1 outline-black rounded-full">
              <div className="w-[92%] h-full flex pl-7 pr-12 items-center justify-between bg-[#DBDBDB] outline-1 outline-black rounded-full">
                <h1 id="cool">{activity.title}</h1>
                <h1 id="cool" className="text-base text-center flex">
                  Slot Status :
                  {activity.participants?.length >= activity.slot ? (
                    <span id="cool" className="ml-3">FULL</span>
                  ) : (
                    <div className="ml-3">
                      {activity.participants?.length || 0}/{activity.slot}
                    </div>
                  )}
                </h1>
              </div>
              <div
                onClick={() => toggleOpen(index)}
                className="w-10 h-[15px] flex items-center justify-between hover:cursor-pointer ml-4"
              >
                <div className="w-[9px] h-[9px] bg-black rounded-full"></div>
                <div className="w-[9px] h-[9px] bg-black rounded-full"></div>
                <div className="w-[9px] h-[9px] bg-black rounded-full"></div>
              </div>
            </div>
            {openIndex === index && (
              <div className="w-full bg-[#DBDBDB] rounded-lg mt-2 outline-1 outline-black flex justify-center">
                <div className="w-[92%]">
                  <div
                    id="cool"
                    className="w-42 py-1 bg-[#FFC800] text-base flex justify-center items-center mt-7 rounded-full outline-1 outline-black"
                  >
                    <h1>Sport Information</h1>
                  </div>
                  {detailLoadingId === id && (
                    <div className="mt-4 text-sm text-[#8A1818]">Loading detail…</div>
                  )}
                  {detailError && openIndex === index && (
                    <div className="mt-4 text-sm text-red-600">{detailError}</div>
                  )}

                  <div className="flex justify-between mt-7">
                    <div>
                      <h1 id="cool" className="text-[#8A1818]">City ID</h1>
                      <input
                        type="text"
                        value={data.city_id || ""}
                        onChange={(e) => handleChange(id, "city_id", e.target.value)}
                        className="text-[10px] w-[225px] h-[25px] pl-3 
                          text-[#8A1818] outline-1 outline-[#8A1818] rounded-full"
                      />
                    </div>
                    <div>
                      <h1 id="cool" className="text-[#8A1818]">Title</h1>
                      <input
                        type="text"
                        value={data.title || ""}
                        onChange={(e) => handleChange(id, "title", e.target.value)}
                        className="text-[10px] w-[225px] h-[25px] pl-3 
                          text-[#8A1818] outline-1 outline-[#8A1818] rounded-full"
                      />
                    </div>
                    <div>
                      <h1 id="cool" className="text-[#8A1818]">Description</h1>
                      <input
                        type="text"
                        value={data.description || ""}
                        onChange={(e) => handleChange(id, "description", e.target.value)}
                        className="text-[10px] w-[225px] h-[25px] pl-3 
                          text-[#8A1818] outline-1 outline-[#8A1818] rounded-full"
                      />
                    </div>
                  </div>

                  <div className="flex justify-between mt-7">
                    <div>
                      <h1 id="cool" className="text-[#8A1818]">Slot</h1>
                      <input
                        type="text"
                        value={data.slot || ""}
                        onChange={(e) => handleChange(id, "slot", e.target.value)}
                        className="text-[10px] w-[225px] h-[25px] pl-3 
                          text-[#8A1818] outline-1 outline-[#8A1818] rounded-full"
                      />
                    </div>
                    <div>
                      <h1 id="cool" className="text-[#8A1818]">Price</h1>
                      <input
                        type="text"
                        value={data.price || ""}
                        onChange={(e) => handleChange(id, "price", e.target.value)}
                        className="text-[10px] w-[225px] h-[25px] pl-3 
                          text-[#8A1818] outline-1 outline-[#8A1818] rounded-full"
                      />
                    </div>
                    <div>
                      <h1 id="cool" className="text-[#8A1818]">Address</h1>
                      <input
                        type="text"
                        value={data.address || ""}
                        onChange={(e) => handleChange(id, "address", e.target.value)}
                        className="text-[10px] w-[225px] h-[25px] pl-3 
                          text-[#8A1818] outline-1 outline-[#8A1818] rounded-full"
                      />
                    </div>
                  </div>

                  <div className="flex justify-between mt-7">
                    <div>
                      <h1 id="cool" className="text-[#8A1818]">Sport ID</h1>
                      <input
                        type="text"
                        value={data.sport_category_id || ""}
                        onChange={(e) => handleChange(id, "sport_category_id", e.target.value)}
                        className="text-[10px] w-[225px] h-[25px] pl-3 
                          text-[#8A1818] outline-1 outline-[#8A1818] rounded-full"
                      />
                    </div>

                    <div>
                      <h1 id="cool" className="text-[#8A1818]">Activity Date</h1>
                      <input
                        type="text"
                        value={data.activity_date || ""}
                        onChange={(e) => handleChange(id, "activity_date", e.target.value)}
                        className="text-[10px] w-[225px] h-[25px] pl-3 
                          text-[#8A1818] outline-1 outline-[#8A1818] rounded-full"
                      />
                    </div>

                    <div>
                      <h1 id="cool" className="text-[#8A1818]">Start</h1>
                      <input
                        type="text"
                        value={data.start_time ?? "05:00"}
                        onChange={(e) => handleChange(id, "start_time", e.target.value)}
                        className="text-[10px] w-[125px] h-[25px] pl-3 
                          text-[#8A1818] outline-1 outline-[#8A1818] rounded-full"
                      />
                    </div>

                    <div>
                      <h1 id="cool" className="text-[#8A1818]">End</h1>
                      <input
                        type="text"
                        value={data.end_time ?? "06:00"}
                        onChange={(e) => handleChange(id, "end_time", e.target.value)}
                        className="text-[10px] w-[125px] h-[25px] pl-3 
                          text-[#8A1818] outline-1 outline-[#8A1818] rounded-full"
                      />
                    </div>
                  </div>

                  <div className="w-full flex justify-center items-center mt-5 mb-7">
                    <div id="cool" className="w-[300px] h-[90px] flex flex-col items-center">
                      <h1 className="text-[#8A1818] mb-1">Map URL</h1>
                      <input
                        type="text"
                        value={data.map_url || ""}
                        onChange={(e) => handleChange(id, "map_url", e.target.value)}
                        className="text-[10px] w-[300px] h-[25px] pl-3 
                          text-[#8A1818] outline-1 outline-[#8A1818] rounded-full"
                      />
                      <div className="w-full flex justify-between mt-2">
                        <button
                          onClick={() => handleUpdate(id)}
                          disabled={loadingUpdateId === id}
                          className="w-[130px] h-[25px] bg-[#FFC800] outline-1 outline-black rounded-full"
                        >
                          {loadingUpdateId === id ? "Updating..." : "Update"}
                        </button>
                        <button
                          onClick={() => handleDelete(id)}
                          disabled={loadingDeleteId === id}
                          className="w-[130px] h-[25px] bg-[#FFC800] outline-1 outline-black rounded-full"
                        >
                          {loadingDeleteId === id ? "Deleting..." : "Delete"}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      })}

      <div className="flex justify-center mt-12 gap-4 items-center mr-12">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
          className="w-10 h-10 text-white rounded disabled:text-[#BFBFBF] disabled:opacity-50"
        >
          <img
            src="./public/arrow-left-circle.svg"
            className="w-full h-full object-cover filter brightness-0"
          />
        </button>
        <span id="cool" className="text-[#8A1818]">
          {currentPage} / {totalPages}
        </span>
        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((prev) => prev + 1)}
          className="w-10 h-10 text-white rounded disabled:text-[#BFBFBF] disabled:opacity-50"
        >
          <img
            src="./public/arrow-right-circle.svg"
            className="w-full h-full object-cover filter brightness-0"
          />
        </button>
      </div>
    </div>
  );
};
