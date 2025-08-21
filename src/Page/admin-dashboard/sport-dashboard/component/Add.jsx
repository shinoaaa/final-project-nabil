import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const Add = () => {
    const [cityId, setCityId] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [slot, setSlot] = useState("");
    const [price, setPrice] = useState("");
    const [address, setAddress] = useState("");
    const [sportCategoryId, setSportCategoryId] = useState("");
    const [activityDate, setActivityDate] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [mapUrl, setMapUrl] = useState("");
    const [loading, setLoading] = useState(false);

    const [errors, setErrors] = useState({});

    const placeholderText = {
        cityId: "Enter City ID",
        title: "Enter Title",
        description: "Enter Description",
        slot: "Enter Slot",
        price: "Enter Price",
        address: "Enter Address",
        sportCategoryId: "Enter Sport ID",
        activityDate: "Enter Activity Date",
        startTime: "Enter Start Time",
        endTime: "Enter End Time",
        mapUrl: "Enter Map URL",
    };

    const inputClass = (field) =>
        `text-[10px] w-[225px] h-[25px] pl-3 rounded-full outline-1 ${errors[field] ? "outline-red-600 text-red-600" : "outline-[#8A1818] text-[#8A1818]"
        }`;

    const smallInputClass = (field) =>
        `text-[10px] w-[125px] h-[25px] pl-3 rounded-full outline-1 ${errors[field] ? "outline-red-600 text-red-600" : "outline-[#8A1818] text-[#8A1818]"
        }`;

    const handleConfirm = async () => {
        const newErrors = {};
        if (!cityId) newErrors.cityId = true;
        if (!title) newErrors.title = true;
        if (!description) newErrors.description = true;
        if (!slot) newErrors.slot = true;
        if (!price) newErrors.price = true;
        if (!address) newErrors.address = true;
        if (!sportCategoryId) newErrors.sportCategoryId = true;
        if (!activityDate) newErrors.activityDate = true;
        if (!startTime) newErrors.startTime = true;
        if (!endTime) newErrors.endTime = true;
        if (!mapUrl) newErrors.mapUrl = true;

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            toast.error("Please fill in all required fields!");
            return;
        }

        setErrors({});
        setLoading(true);

        const payload = {
            sport_category_id: Number(sportCategoryId),
            city_id: Number(cityId),
            title,
            description,
            slot: Number(slot),
            price: Number(price),
            address,
            activity_date: activityDate,
            start_time: startTime,
            end_time: endTime,
            map_url: mapUrl || "https://maps.app.goo.gl/h1AV4bfB2cojJMxK7",
        };

        try {
            const token = localStorage.getItem("accessToken");
            if (!token) {
                toast.error("Token not found. Please login first.");
                setLoading(false);
                return;
            }

            await axios.post(
                "https://sport-reservation-api-bootcamp.do.dibimbing.id/api/v1/sport-activities/create",
                payload,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            // Tampilkan toast sukses
            toast.success("Sport activity added successfully!");

            // Reset input
            setCityId(""); setTitle(""); setDescription(""); setSlot("");
            setPrice(""); setAddress(""); setSportCategoryId(""); setActivityDate("");
            setStartTime(""); setEndTime(""); setMapUrl("");

            // Refresh page beberapa detik setelah toast muncul
            setTimeout(() => {
                window.location.reload();
            }, 1500); // 1,5 detik, bisa disesuaikan
        } catch (err) {
            console.error(err);
            const msg =
                err.response?.data?.message ||
                err.response?.data?.error ||
                "Failed to add sport activity";
            toast.error(msg);
        } finally {
            setLoading(false);
        }

    };

    return (
        <div className="lg:w-223 xl:w-265 h-145 bg-[#DBDBDB] flex flex-col items-center rounded-2xl outline-1 outline-black">
            <h1 className="text-2xl mt-5">Add New Sport Activity</h1>

            {/* Row 1 */}
            <div className="flex justify-between mt-12 gap-12">
                <div>
                    <h1 className="text-[#8A1818]">City ID</h1>
                    <input
                        type="text"
                        className={inputClass("cityId")}
                        value={cityId}
                        placeholder={errors.cityId ? placeholderText.cityId : ""}
                        onChange={(e) => setCityId(e.target.value)}
                    />
                </div>
                <div>
                    <h1 className="text-[#8A1818]">Title</h1>
                    <input
                        type="text"
                        className={inputClass("title")}
                        value={title}
                        placeholder={errors.title ? placeholderText.title : ""}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div>
                    <h1 className="text-[#8A1818]">Description</h1>
                    <input
                        type="text"
                        className={inputClass("description")}
                        value={description}
                        placeholder={errors.description ? placeholderText.description : ""}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
            </div>

            {/* Row 2 */}
            <div className="flex justify-between mt-12 gap-12">
                <div>
                    <h1 className="text-[#8A1818]">Slot</h1>
                    <input
                        type="text"
                        className={inputClass("slot")}
                        value={slot}
                        placeholder={errors.slot ? placeholderText.slot : ""}
                        onChange={(e) => setSlot(e.target.value)}
                    />
                </div>
                <div>
                    <h1 className="text-[#8A1818]">Price</h1>
                    <input
                        type="text"
                        className={inputClass("price")}
                        value={price}
                        placeholder={errors.price ? placeholderText.price : ""}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                </div>
                <div>
                    <h1 className="text-[#8A1818]">Address</h1>
                    <input
                        type="text"
                        className={inputClass("address")}
                        value={address}
                        placeholder={errors.address ? placeholderText.address : ""}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </div>
            </div>

            {/* Row 3 */}
            <div className="flex justify-between gap-6 mt-12">
                <div>
                    <h1 className="text-[#8A1818]">Sport ID</h1>
                    <input
                        type="text"
                        className={inputClass("sportCategoryId")}
                        value={sportCategoryId}
                        placeholder={errors.sportCategoryId ? placeholderText.sportCategoryId : ""}
                        onChange={(e) => setSportCategoryId(e.target.value)}
                    />
                </div>
                <div>
                    <h1 className="text-[#8A1818]">Activity Date</h1>
                    <input
                        type="text"
                        className={inputClass("activityDate")}
                        value={activityDate}
                        placeholder={errors.activityDate ? placeholderText.activityDate : ""}
                        onChange={(e) => setActivityDate(e.target.value)}
                    />
                </div>
                <div>
                    <h1 className="text-[#8A1818]">Start</h1>
                    <input
                        type="text"
                        className={smallInputClass("startTime")}
                        value={startTime}
                        placeholder={errors.startTime ? placeholderText.startTime : ""}
                        onChange={(e) => setStartTime(e.target.value)}
                    />
                </div>
                <div>
                    <h1 className="text-[#8A1818]">End</h1>
                    <input
                        type="text"
                        className={smallInputClass("endTime")}
                        value={endTime}
                        placeholder={errors.endTime ? placeholderText.endTime : ""}
                        onChange={(e) => setEndTime(e.target.value)}
                    />
                </div>
            </div>

            {/* Row 4 */}
            <div className="flex justify-between mt-12 gap-12">
                <div>
                    <h1 className="text-[#8A1818]">Map URL</h1>
                    <input
                        type="text"
                        className={inputClass("mapUrl")}
                        value={mapUrl}
                        placeholder={errors.mapUrl ? placeholderText.mapUrl : ""}
                        onChange={(e) => setMapUrl(e.target.value)}
                    />
                </div>
            </div>

            <button
                className="px-25 py-2 text-2xl bg-[#FFC800] outline-1 outline-black rounded-full mt-12"
                onClick={handleConfirm}
                disabled={loading}
            >
                {loading ? "Loading..." : "Confirm"}
            </button>
        </div>
    );
};
