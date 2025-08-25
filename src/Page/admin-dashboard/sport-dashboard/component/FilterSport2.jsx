import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { ActivitySport } from "./ActivitySport2";
import { ToastContainer } from "react-toastify";
import { Add } from "./Add";

export const FilterSport = () => {
  const [sports, setSports] = useState([]);
  const [allSports, setAllSports] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [cities, setCities] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedProvinceId, setSelectedProvinceId] = useState("");
  const [selectedCityId, setSelectedCityId] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState("");

  const [loading, setLoading] = useState(false); // 🔹 loading state
  const [showAdd, setShowAdd] = useState(false);
  const addRef = useRef(null);

  useEffect(() => {
    const fetchSports = async () => {
      setLoading(true);
      let allData = [];
      let page = 1;

      try {
        while (true) {
          const res = await axios.get(
            `https://sport-reservation-api-bootcamp.do.dibimbing.id/api/v1/sport-activities?page=${page}&limit=20`
          );
          const data = res.data?.result?.data || [];
          if (!data.length || allData.length >= 1000) break;
          allData = [...allData, ...data];
          page++;
        }
        setAllSports(allData);
        setSports(allData);
      } catch (err) {
        console.error("Error fetching sports:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchSports();
  }, []);

  useEffect(() => {
    const fetchProvinces = async () => {
      let allData = [];
      let page = 1;
      try {
        while (true) {
          const res = await axios.get(
            `https://sport-reservation-api-bootcamp.do.dibimbing.id/api/v1/location/provinces?page=${page}&limit=20`
          );
          const data = res.data?.result?.data?.data || res.data?.result?.data || [];
          if (!data.length) break;
          allData = [...allData, ...data];
          page++;
        }
        setProvinces(allData);
      } catch (err) {
        console.error("Error fetching provinces:", err);
      }
    };
    fetchProvinces();
  }, []);

  useEffect(() => {
    if (!selectedProvinceId) {
      setCities([]);
      return;
    }
    const fetchCities = async () => {
      try {
        const res = await axios.get(
          `https://sport-reservation-api-bootcamp.do.dibimbing.id/api/v1/location/cities/${selectedProvinceId}`
        );
        const data = res.data?.result?.data?.data || res.data?.result?.data || [];
        setCities(data);
      } catch (err) {
        console.error("Error fetching cities:", err);
      }
    };
    fetchCities();
  }, [selectedProvinceId]);

  useEffect(() => {
    const fetchCategories = async () => {
      let allData = [];
      let page = 1;

      try {
        while (true) {
          const res = await axios.get(
            `https://sport-reservation-api-bootcamp.do.dibimbing.id/api/v1/sport-categories?page=${page}&limit=20`
          );
          const data = res.data?.result?.data || [];
          if (!data.length) break;
          allData = [...allData, ...data];
          page++;
        }
        setCategories(allData);
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };

    fetchCategories();
  }, []);

  const handleConfirm = () => {
    let filtered = [...allSports];
    if (selectedCityId) {
      filtered = filtered.filter(
        (sport) => String(sport.city_id) === String(selectedCityId)
      );
    }
    if (selectedCategoryId) {
      filtered = filtered.filter(
        (sport) => String(sport.sport_category_id) === String(selectedCategoryId)
      );
    }
    setSports(filtered);
  };

  const handleReset = () => {
    setSelectedProvinceId("");
    setSelectedCityId("");
    setSelectedCategoryId("");
    setSports(allSports);
    setCities([]);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (addRef.current && !addRef.current.contains(e.target)) {
        setShowAdd(false);
      }
    };
    if (showAdd) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showAdd]);

  return (
    <div className="lg:w-[854px] xl:w-[1025px] mt-9">
      <div className="flex mt-3 justify-between">
        <div className="flex gap-5">
          <select
            className="px-5 h-7 text-sm text-black bg-[#FFC800] rounded-md outline-1 outline-black"
            value={selectedProvinceId}
            id="cool"
            onChange={(e) => {
              setSelectedProvinceId(e.target.value);
              setSelectedCityId("");
            }}
          >
            <option value="">Province</option>
            {provinces.map((prov) => (
              <option key={prov.province_id} value={prov.province_id}>
                {prov.province_name}
              </option>
            ))}
          </select>

          <select
            className="px-5 h-7 text-sm text-black bg-[#FFC800] outline-1 outline-black rounded-md"
            value={selectedCityId}
            id="cool"
            onChange={(e) => setSelectedCityId(e.target.value)}
            disabled={!cities.length}
          >
            <option value="">City</option>
            {cities.map((city) => (
              <option key={city.city_id} value={city.city_id}>
                {city.city_name}
              </option>
            ))}
          </select>

          <select
            className="px-5 h-7 text-sm text-black bg-[#FFC800] outline-1 outline-black rounded-md"
            value={selectedCategoryId}
            id="cool"
            onChange={(e) => setSelectedCategoryId(e.target.value)}
          >
            <option value="">Category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>

          <button
            id="cool"
            className="w-[100px] h-7 ml-3 text-sm flex justify-center text-black outline outline-black items-center gap-2 rounded-md"
            onClick={handleConfirm}
          >
            Confirm
          </button>
          <button
            id="cool"
            className="w-7 h-7 text-sm flex justify-center text-white outline-[#8A1818] outline items-center gap-2 rounded-md filter brightness-0"
            onClick={handleReset}
          >
            <img src="./public/undo.svg" />
          </button>
        </div>
        <div
          className="w-9 h-9 flex justify-center items-center hover:cursor-pointer"
          onClick={() => setShowAdd(true)}
        >
          <img src="./public/add.svg" alt="" />
        </div>
      </div>

      {/* 🔹 Spinner di bawah filter */}
      {loading && (
        <div className="spinner-container">
          <div className="spinner"></div>
        </div>
      )}

      {showAdd && (
        <div
          className="absolute -translate-x-5 -translate-y-5 z-50 rounded-2xl "
          ref={addRef}
        >
          <Add />
        </div>
      )}

      <ActivitySport sports={sports} />
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};
