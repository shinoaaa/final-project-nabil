import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { UploadProofModal } from "./UploadProofModal";

export const MyProduct = () => {
  const [transactions, setTransactions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [selectedTransactionId, setSelectedTransactionId] = useState(null);
  const [statusFilter, setStatusFilter] = useState("all"); // 🔥 filter state
  const itemsPerPage = 6;
  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    const fetchMyTransactions = async () => {
      try {
        const res = await axios.get(
          "https://sport-reservation-api-bootcamp.do.dibimbing.id/api/v1/my-transaction",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const r = res.data?.result;
        const data =
          Array.isArray(r?.data) ? r.data :
            Array.isArray(res.data?.data) ? res.data.data :
              Array.isArray(r) ? r :
                Array.isArray(res.data) ? res.data : [];

        setTransactions(data);
      } catch (err) {
        console.error("Failed to fetch my transactions:", err);
        toast.error("Failed to load transactions.");
        setTransactions([]);
      }
    };

    if (token) fetchMyTransactions();
    else toast.error("Token not found. Please login again.");
  }, [token]);

  const handleCancelTransaction = async (id) => {
    try {
      await axios.post(
        `https://sport-reservation-api-bootcamp.do.dibimbing.id/api/v1/transaction/cancel/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );
      toast.success("Transaction cancelled successfully!");
      setTimeout(() => window.location.reload(), 2000);
    } catch (err) {
      console.error("Failed to cancel transaction:", err);
      toast.error("Failed to cancel transaction.");
      setTimeout(() => window.location.reload(), 2000);
    }
  };
  const filteredTransactions =
    statusFilter === "all"
      ? transactions
      : transactions.filter((trx) => trx?.status === statusFilter);

  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage) || 1;
  const currentData = filteredTransactions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div>
      <div className="flex gap-3 mb-5 justify-end">
        {["All", "Pending", "Success", "Cancelled"].map((status) => (
          <button
            key={status}
            onClick={() => {
              setStatusFilter(status.toLowerCase());
              setCurrentPage(1);
            }}
            className={`px-4 py-2 rounded-full border border-gray-400 transition ${statusFilter === status.toLowerCase()
                ? "bg-[#FFC800] text-black font-semibold"
                : "bg-white text-gray-600 hover:bg-gray-100"
              }`}
          >
            {status}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-3 gap-x-22 gap-y-7">
        {currentData.map((trx, index) => {
          const sport = trx?.transaction_items?.sport_activities;
          const title =
            trx?.transaction_items?.title ?? sport?.title ?? "Sport Title";
          const imageUrl = sport?.image_url ?? "./public/sport.jpg";
          const address = sport?.address ?? "-";
          const status = trx?.status ?? "-";
          const totalAmount =
            typeof trx?.total_amount === "number"
              ? `Rp${trx.total_amount.toLocaleString("id-ID")}`
              : `Rp${trx?.total_amount ?? 0}`;

          return (
            <div
              key={trx?.id ?? index}
              className="w-[275px] bg-[#8A1818] outline outline-[#8A1818] relative"
            >
              <div className="w-[275px] h-[75px]">
                <img src={imageUrl} className="w-full h-full object-cover" />
              </div>

              <div className="w-[50px] h-[50px] bg-[#8A1818] outline-1 outline-black rounded-md absolute -translate-y-[25px] right-0 mr-5 flex justify-center items-center">
                <h1 id="cool" className="text-[10px] text-white text-center">
                  Status: <br />
                  {status}
                </h1>
              </div>

              <div className="w-[250px] mb-3 flex mt-2 justify-between">
                <div className="max-w-[220px] leading-5 ml-3">
                  <h1 className="text-base text-white truncate">{title}</h1>
                  <h1 className="text-[9px] text-[#FFC800]">{totalAmount}</h1>

                  <div className="flex h-[15px] items-center mt-1">
                    <div className="w-[15px] h-[15px]">
                      <img
                        src="./public/buildings.svg"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h1 className="text-[8px] w-33 text-white ml-2 truncate">
                      Address: {address}
                    </h1>
                  </div>

                  <div className="mt-5 flex flex-col gap-2">
                    <div
                      onClick={() => {
                        if (status === "pending") {
                          setSelectedTransactionId(trx.id);
                          setShowModal(true);
                        }
                      }}
                      className={`px-12 h-[20px] flex justify-center items-center rounded-full text-[12px] ${status === "pending"
                        ? "bg-[#FFC800] text-black cursor-pointer"
                        : "bg-[#b68e00] text-black cursor-not-allowed"
                        }`}
                    >
                      <h1 id="cool">Upload Proof</h1>
                    </div>

                    <div
                      onClick={() =>
                        status === "pending" && handleCancelTransaction(trx.id)
                      }
                      className={`px-8 h-[20px] flex justify-center items-center rounded-full text-[12px] ${status === "pending"
                        ? "bg-[#FFC800] text-black cursor-pointer"
                        : "bg-[#b68e00] text-black cursor-not-allowed"
                        }`}
                      id="cool"
                    >
                      <h1 id="cool">Cancel Transaction</h1>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredTransactions.length > 0 && (
        <div className="flex justify-center mt-10 gap-4 items-center mr-12">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
            className="w-10 h-10 text-white rounded disabled:text-[#BFBFBF] disabled:opacity-50"
          >
            <img
              src="./public/arrow-left-circle.svg"
              className="w-full h-full object-cover"
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
              className="w-full h-full object-cover"
            />
          </button>
        </div>
      )}
      {showModal && selectedTransactionId && (
        <UploadProofModal
          transactionId={selectedTransactionId}
          onClose={() => {
            setShowModal(false);
            setSelectedTransactionId(null);
          }}
        />
      )}
    </div>
  );
};
