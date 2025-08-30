import axios from "axios";
import { useState, useEffect } from "react";
import { ActivitySport } from "./ActivitySport";
import { Link } from "react-router-dom";

export const FilterSport = () => {
  const [sports, setSports] = useState([]);
  const [allSports, setAllSports] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [cities, setCities] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedProvinceId, setSelectedProvinceId] = useState("");
  const [selectedCityId, setSelectedCityId] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [loading, setLoading] = useState(false);

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

  return (
    <div className="lg:w-[854px] xl:w-[1025px] mt-9">
      <div className="flex justify-between items-baseline">
        <h1 id="jersey" className="text-6xl text-[#8A1818]">Book Now</h1>
        <Link to={'/activity'}>
          <h1 id="cool" className="text-xl text-[#8A1818] hover:cursor-pointer hover:text-[22px]">View More</h1>
        </Link>
      </div>

      <div className="flex mt-3 gap-5">
        <select
          id="cool"
          className="px-5 h-7 text-sm text-white bg-[#8A1818] rounded-md"
          value={selectedProvinceId}
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
          id="cool"
          className="px-5 h-7 text-sm text-white bg-[#8A1818] rounded-md"
          value={selectedCityId}
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
          id="cool"
          className="px-5 h-7 text-sm text-white bg-[#8A1818] rounded-md"
          value={selectedCategoryId}
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
          className="w-[100px] h-7 ml-3 text-sm hover:text-base flex justify-center text-[#8A1818] bg-[#FFC800] outline-1 outline-[#8A1818] items-center gap-2 rounded-md"
          onClick={handleConfirm}
        >
          <h1>Confirm</h1>
        </button>
        <button
          id="cool"
          className="w-7 h-7 text-sm hover:text-base flex justify-center text-white outline-[#8A1818] outline-1 items-center gap-2 rounded-md"
          onClick={handleReset}
        >
          <img src="/undo.svg" />
        </button>
      </div>


      {loading && (
        <div className="spinner-container">
          <div className="spinner"></div>
        </div>
      )}

      <ActivitySport sports={sports} />
    </div>
  );
};
