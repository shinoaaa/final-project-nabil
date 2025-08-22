import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const FilterSport = () => {
  const [transactions, setTransactions] = useState([]);
  const [openIndex, setOpenIndex] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterStatus, setFilterStatus] = useState("All");
  const itemsPerPage = 6;

  const token = localStorage.getItem("accessToken");

  const fetchAllTransactions = useCallback(async () => {
    let allData = [];
    let page = 1;

    try {
      while (true) {
        const res = await axios.get(
          `https://sport-reservation-api-bootcamp.do.dibimbing.id/api/v1/all-transaction?page=${page}&limit=${itemsPerPage}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const result = res.data?.result;
        const data = Array.isArray(result?.data)
          ? result.data
          : Array.isArray(result?.data?.data)
          ? result.data.data
          : [];

        if (!data.length) break;

        allData = [...allData, ...data];
        if (page >= result?.total_pages) break;
        page++;
      }

      setTransactions(allData);
    } catch (err) {
      console.error("Failed to fetch transactions:", err);
      toast.error("Failed to load transactions.");
      setTransactions([]);
    }
  }, [token, itemsPerPage]);

  useEffect(() => {
    if (token) fetchAllTransactions();
    else toast.error("Access token not found. Please login again.");
  }, [token, fetchAllTransactions]);

  const toggleOpen = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleApprovePayment = async (id) => {
    try {
      if (!token) {
        toast.error("Token not found. Please login again.");
        return;
      }

      await axios.post(
        `https://sport-reservation-api-bootcamp.do.dibimbing.id/api/v1/transaction/update-status/${id}`,
        { status: "success" },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      toast.success("Payment approved successfully!");
      fetchAllTransactions();
    } catch (error) {
      console.error("Failed to approve payment:", error);
      toast.error("Failed to approve payment.");
    }
  };

  const filteredTransactions =
    filterStatus === "All"
      ? transactions
      : transactions.filter(
          (trx) =>
            trx.status?.toLowerCase() === filterStatus.toLowerCase()
        );

  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
  const currentData = filteredTransactions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="lg:w-[854px] xl:w-[1025px] mt-7">
      {/* Filter buttons */}
      <div className="flex gap-3 mb-5 justify-end">
        {["All", "Pending", "Success", "Cancelled"].map((status) => (
          <button
            key={status}
            onClick={() => {
              setFilterStatus(status);
              setCurrentPage(1);
            }}
            className={`px-4 py-2 rounded-full border border-gray-400 transition ${
              filterStatus === status
                ? "bg-[#FFC800] text-black font-semibold"
                : "bg-white text-gray-600 hover:bg-gray-100"
            }`}
          >
            {status}
          </button>
        ))}
      </div>
      {currentData.map((trx, index) => {
        const userIdNum = Number(trx?.user_id) || 0;

        return (
          <div
            key={trx.id ?? `${trx.invoice_id}-${index}`}
            className="mb-4"
          >
            <div className="w-full h-[50px] flex text-xl items-center bg-[#FFC800] outline-1 outline-black rounded-full">
              <div
                id="cool"
                className="w-[92%] h-full pl-5 pr-12 flex justify-between items-center bg-[#DBDBDB] outline-1 outline-black rounded-full"
              >
                <div className="h-full flex items-center">
                  <div className="w-10 h-10 rounded-full outline-1 outline-black overflow-hidden bg-amber-500">
                    {trx?.user_id ? (
                      <img
                        src={
                          userIdNum % 2 === 0
                            ? "/Kaoruko.jpg"
                            : "/Yuzuha.jpg"
                        }
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="w-full h-full flex items-center justify-center text-xs text-white">
                        ?
                      </span>
                    )}
                  </div>
                  <h1 className="ml-7">{trx?.user_id ?? "-"}</h1>
                </div>
                <h1>Status: {trx?.status ?? "-"}</h1>
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
                <div className="w-[90%] mt-3">
                  <div className="w-full flex flex-col items-center">
                    <h1 className="text-center text-base">
                      Transaction Detail for User #{trx?.user_id ?? "-"}
                    </h1>
                    <div className="w-[65%] flex justify-center">
                      <h1
                        id="cool"
                        className="text-[#8A1818] text-3xl text-center"
                      >
                        Product:{" "}
                        {trx?.transaction_items?.sport_activities?.title}
                      </h1>
                    </div>
                    <div
                      id="cool"
                      className="w-[45%] text-lg flex justify-between mt-5"
                    >
                      <div className="w-[125px] h-[75px] flex flex-col items-center">
                        <h1 className="mb-1">Price</h1>
                        <div className="w-full h-[25px] bg-[#8A1818] rounded-full flex justify-center">
                          <h1 className="text-[#D9D9D9] text-base">
                            Rp {trx?.total_amount}
                          </h1>
                        </div>
                      </div>
                      <div className="w-[150px] h-[75px] flex flex-col items-center">
                        <h1 className="mb-1">Payment Method</h1>
                        <div className="w-13 h-9">
                          <img
                            src={
                              trx?.payment_method_id === 1
                                ? "/bca.png"
                                : trx?.payment_method_id === 2
                                ? "/bri.png"
                                : trx?.payment_method_id === 3
                                ? "/mandiri.png"
                                : trx?.payment_method_id === 4
                                ? "/bni.png"
                                : "/default-payment.png"
                            }
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-7 mb-3">
                    <h1 className="mb-2">
                      Invoice ID: {trx?.invoice_id}
                    </h1>
                    <div className="w-full h-[100px] outline-1 outline-black flex items-center justify-center">
                      {trx?.proof_payment_url === null ? (
                        <span className="text-sm text-black">
                          Proof has not been submitted
                        </span>
                      ) : trx?.proof_payment_url?.startsWith("http") ? (
                        <img
                          src={trx.proof_payment_url}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-white text-sm">
                          Invalid proof
                        </span>
                      )}
                    </div>

                    <div className="w-full flex justify-end">
                      <button
                        id="cool"
                        className={`px-7 py-1 text-xs mt-3 outline-1 outline-black rounded-full ${
                          trx?.status?.toLowerCase() === "pending"
                            ? "bg-[#FFC800] hover:bg-yellow-400"
                            : "bg-gray-400 cursor-not-allowed"
                        }`}
                        disabled={
                          trx?.status?.toLowerCase() !== "pending"
                        }
                        onClick={() => handleApprovePayment(trx.id)}
                      >
                        Approve Payment
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      })}
      
      {filteredTransactions.length > 0 && (
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
            {currentPage} / {totalPages || 1}
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
      )}
    </div>
  );
};
