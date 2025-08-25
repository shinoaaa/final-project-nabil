import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const FilterSport = () => {
  const [categories, setCategories] = useState([]);
  const [openIndex, setOpenIndex] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [editedNames, setEditedNames] = useState({});
  const [loading, setLoading] = useState(false);
  const itemsPerPage = 6;

  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    const fetchAllCategories = async () => {
      setLoading(true);
      let allData = [];
      let page = 1;

      try {
        while (true) {
          const res = await axios.get(
            `https://sport-reservation-api-bootcamp.do.dibimbing.id/api/v1/sport-categories?page=${page}&limit=20`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );

          const result = res.data?.result;
          const data = Array.isArray(result?.data) ? result.data : [];

          if (!data.length) break;

          allData = [...allData, ...data];

          if (page >= result?.total_pages) break;
          page++;
        }

        setCategories(allData);
      } catch (error) {
        console.error("Failed to fetch data:", error);
        toast.error("Failed to load categories.");
        setCategories([]);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchAllCategories();
    } else {
      toast.error("Access token not found. Please login.");
    }
  }, [token]);

  const totalPages = Math.ceil(categories.length / itemsPerPage);
  const paginatedData = categories.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const toggleOpen = (index) => setOpenIndex(openIndex === index ? null : index);
  const handleInputChange = (id, value) =>
    setEditedNames((prev) => ({ ...prev, [id]: value }));

  const handleUpdate = async (id) => {
    const newName = editedNames[id];
    if (!newName || newName.trim() === "") {
      toast.warning("Please enter a valid name.");
      return;
    }

    try {
      await axios.post(
        `https://sport-reservation-api-bootcamp.do.dibimbing.id/api/v1/sport-categories/update/${id}`,
        { name: newName },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success("Category name updated successfully!");
      setCategories((prev) =>
        prev.map((cat) => (cat.id === id ? { ...cat, name: newName } : cat))
      );
      setOpenIndex(null);
      setEditedNames((prev) => ({ ...prev, [id]: "" }));
    } catch (err) {
      toast.error("Failed to update category name.");
      console.error("Update failed:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `https://sport-reservation-api-bootcamp.do.dibimbing.id/api/v1/sport-categories/delete/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success("Category deleted successfully!");
      setCategories((prev) => prev.filter((cat) => cat.id !== id));
      setOpenIndex(null);
    } catch (err) {
      toast.error("Failed to delete category.");
      console.error("Delete failed:", err);
    }
  };

  return (
    <div className="lg:w-[854px] xl:w-[1025px] mt-10">
      {loading && (
        <div className="spinner-container">
          <div className="spinner"></div>
        </div>
      )}

      {paginatedData.map((cat, index) => (
        <div key={cat.id} className="mb-4">
          <div className="w-full h-[50px] flex text-xl items-center bg-[#FFC800] outline-1 outline-black rounded-full">
            <div
              id="cool"
              className="w-[92%] h-full flex items-center bg-[#DBDBDB] outline-1 outline-black rounded-full"
            >
              <h1 className="ml-7">{cat.id}</h1>
              <h1 className="ml-12">{cat.name}</h1>
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
              <div className="w-[65%]">
                <input
                  type="text"
                  placeholder="Enter new name"
                  value={editedNames[cat.id] || ""}
                  onChange={(e) => handleInputChange(cat.id, e.target.value)}
                  className="w-full py-1 pl-7 rounded-full outline-1 outline-black mt-7"
                />
                <div className="flex justify-between mt-5 mb-5">
                  <button
                    onClick={() => handleUpdate(cat.id)}
                    className="w-[45%] py-1 bg-[#FFC800] outline-1 outline-black rounded-full"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(cat.id)}
                    className="w-[45%] py-1 bg-[#FFC800] outline-1 outline-black rounded-full"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
      
      {!loading && (
        <div className="flex justify-center mt-12 gap-4 items-center mr-12">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
            className="w-10 h-10 text-white rounded disabled:text-[#BFBFBF] disabled:opacity-50"
          >
            <img
              src="./public/arrow-left-circle.svg"
              className="w-full h-full object-cover filter brightness-0"
              alt="Previous"
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
              alt="Next"
            />
          </button>
        </div>
      )}
    </div>
  );
};
