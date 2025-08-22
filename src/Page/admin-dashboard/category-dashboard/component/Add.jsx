import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const Add = () => {
  const [name, setName] = useState("");

  const handleConfirm = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        toast.error("No token found. Please log in again.");
        return;
      }

      await axios.post(
        "https://sport-reservation-api-bootcamp.do.dibimbing.id/api/v1/sport-categories/create",
        { name },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Category created successfully!");

      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create category.");
    }
  };

  return (
    <div className="lg:w-223 xl:w-265 h-95 bg-[#DBDBDB] flex flex-col items-center rounded-2xl outline-1 outline-black">
      <h1 className="text-2xl mt-5">Add New Sport Category</h1>
      <input
        type="text"
        placeholder="Enter category name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-[75%] py-2 pl-7 text-[#8A1818] mt-7 outline-1 outline-[#8A1818] rounded-full"
      />
      <button
        onClick={handleConfirm}
        className="px-25 py-2 text-2xl bg-[#FFC800] outline-1 outline-black rounded-full mt-12"
      >
        Confirm
      </button>
    </div>
  );
};