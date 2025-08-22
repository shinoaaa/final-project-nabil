import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

export const SportDetail = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showPayment, setShowPayment] = useState(false);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [selectedPaymentId, setSelectedPaymentId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `https://sport-reservation-api-bootcamp.do.dibimbing.id/api/v1/sport-activities/${id}`
        );
        setData(res.data?.result || {});
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchData();
  }, [id]);

  const handleConfirm = async () => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      toast.error("Token tidak ditemukan. Silakan login dulu.");
      return;
    }

    try {
      const res = await axios.get(
        "https://sport-reservation-api-bootcamp.do.dibimbing.id/api/v1/payment-methods",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const methods = res.data?.result || res.data?.data || [];
      setPaymentMethods(methods);
      setShowPayment(true);
    } catch (err) {
      console.error("Gagal ambil metode pembayaran:", err);
      toast.error("Gagal ambil metode pembayaran.");
    }
  };

  const handleTransaction = async () => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      toast.error("Token tidak ditemukan. Silakan login dulu.");
      return;
    }

    const payload = {
      sport_activity_id: id,
      payment_method_id: selectedPaymentId,
    };

    try {
      const res = await axios.post(
        "https://sport-reservation-api-bootcamp.do.dibimbing.id/api/v1/transaction/create",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("✅ Transaksi berhasil:", res.data);
      toast.success("Transaksi berhasil!");
    } catch (err) {
      console.error("❌ Gagal transaksi:", err);
      toast.error("Transaksi gagal. Coba lagi nanti.");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="p-4 bg-white shadow rounded">
      <ToastContainer position="top-right" autoClose={3000} />
      <Link to={'/activity'}>
        <button className="px-12 py-1 text-base outline-1 outline-black rounded-full mb-7 mt-5">
          Back To Activity
        </button>
      </Link>
      <h2 className="text-xl font-bold mb-2">{data?.title}</h2>
      <p className="text-gray-600">{data?.description}</p>

      <div className="mt-3">
        <span className="text-sm font-semibold text-gray-500 mr-1">Kategori:</span>
        {data?.sport_category?.name}
      </div>

      <div className="mt-2">
        <span className="text-sm font-semibold text-gray-500 mr-1">Harga:</span>
        Rp {data?.price}
      </div>

      <div className="mt-2">
        <span className="text-sm font-semibold text-gray-500 mr-1">Alamat:</span>
        {data?.address}
      </div>

      <div className="mt-2">
        <span className="text-sm font-semibold text-gray-500 mr-1">Provinsi:</span>
        {data?.city?.province?.province_name}
      </div>

      <div className="mt-2">
        <span className="text-sm font-semibold text-gray-500 mr-1">Slot:</span>
        {data?.participants?.length || 0} / {data?.slot}
      </div>

      <div className="flex gap-3 mt-7">
        <button
          className="px-5 py-1 bg-blue-500 text-white rounded-3xl hover:bg-blue-600 transition"
          onClick={handleConfirm}
        >
          Book Now
        </button>

        {showPayment && (
          <button
            className="px-5 py-1 bg-red-500 text-white rounded-3xl hover:bg-red-600 transition"
            onClick={() => setShowPayment(false)}
          >
            Close Payment
          </button>
        )}
      </div>

      {showPayment && (
        <div className="mt-6 p-4 border rounded bg-gray-50">
          <h3 className="font-semibold mb-3">Pilih Metode Pembayaran:</h3>
          {paymentMethods.length === 0 ? (
            <p className="text-red-500">Tidak ada metode pembayaran tersedia.</p>
          ) : (
            <div className="flex flex-col gap-3">
              {paymentMethods.map((method) => (
                <div
                  key={method.id}
                  className={`flex items-center gap-3 p-2 border rounded cursor-pointer ${selectedPaymentId === method.id ? "bg-blue-100" : ""
                    }`}
                  onClick={() => setSelectedPaymentId(method.id)}
                >
                  <img src={method.image_url} alt={method.name} className="w-12 h-12" />
                  <span className="font-medium">{method.name}</span>
                </div>
              ))}
            </div>
          )}
          <button
            className="mt-4 px-4 py-2 bg-green-500 text-white rounded disabled:opacity-50"
            onClick={handleTransaction}
            disabled={!selectedPaymentId}
          >
            Pay Now
          </button>
        </div>
      )}

      <div className="mt-7">
        <h3 className="font-semibold text-gray-700 mb-2">Participants:</h3>
        {data?.participants && data.participants.length > 0 ? (
          <ul className="flex flex-col gap-2 text-gray-600">
            {data.participants.map((p, idx) => (
              <div key={idx} className="inline-block px-5 py-1 outline-1 outline-black">
                {p?.user?.name} ({p?.user?.email})
              </div>
            ))}
          </ul>
        ) : (
          <p className="text-gray-400">No participants yet.</p>
        )}
      </div>
    </div>
  );
};