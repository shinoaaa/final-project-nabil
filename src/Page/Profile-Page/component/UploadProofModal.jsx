import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const UploadProofModal = ({ onClose, transactionId }) => {
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [inputUrl, setInputUrl] = useState("");

  const token = localStorage.getItem("accessToken");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      toast.error("Please select a file first.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await axios.post(
        "https://sport-reservation-api-bootcamp.do.dibimbing.id/api/v1/upload-image",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const url = res.data?.result;
      setImageUrl(url);
      setInputUrl(url);

      toast.success("Proof uploaded!");
    } catch (err) {
      console.error("Upload failed:", err.response?.data || err.message);
      toast.error("Failed to upload proof.");
    }
  };

  const handleSubmitProof = async () => {
    if (!inputUrl) {
      toast.error("Please provide a proof payment URL first.");
      return;
    }

    try {
      await axios.post(
        `https://sport-reservation-api-bootcamp.do.dibimbing.id/api/v1/transaction/update-proof-payment/${transactionId}`,
        { proof_payment_url: inputUrl },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Proof payment updated!");
      setTimeout(() => window.location.reload(), 2000);
    } catch (err) {
      console.error("Failed to update proof:", err.response?.data || err.message);
      toast.error("Failed to update proof.");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white rounded-lg shadow-lg w-[400px] p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-black"
        >
          ✕
        </button>

        <h2 className="text-xl font-semibold text-center mb-4 text-[#8A1818]">
          Upload Proof
        </h2>

        <div className="flex flex-col gap-4">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="border border-gray-300 rounded p-2"
          />
          <h1>Submit the form below, the uploaded link is already auto-filled if the upload are success</h1>
          <button
            onClick={handleUpload}
            className="bg-[#FFC800] py-2 rounded text-black font-medium hover:bg-yellow-500"
          >
            Upload
          </button>

          <input
            type="text"
            value={inputUrl}
            onChange={(e) => setInputUrl(e.target.value)}
            className="border border-gray-300 rounded p-2 mt-9"
            placeholder="Input The Url Here"
          />
          <button
            onClick={handleSubmitProof}
            className="bg-[#FFC800] py-2 rounded text-black font-medium hover:bg-yellow-500"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};
