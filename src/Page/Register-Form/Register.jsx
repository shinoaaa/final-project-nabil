import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Form } from "./Component/Form.jsx";
import "./style.css";

const Register = () => {
  const [loadingId, setLoadingId] = useState(null);

  // Spinner control
  const handleClick = (id) => {
    setLoadingId(id);
    if (id === 2) {
      setTimeout(() => setLoadingId(null), 3000);
    }
  };

  // Diterima dari Form, lalu dipost ke server
  const handleRegister = async (formData) => {
    const data = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      password: formData.password,
      confirmPassword: formData.confirmPassword,
      phoneNumber: formData.phoneNumber.trim(),
      role: formData.role.trim().toLowerCase(),
    };

    // Validasi client-side
    if (
      !data.name ||
      !data.email ||
      !data.password ||
      !data.confirmPassword ||
      !data.phoneNumber ||
      !data.role
    ) {
      toast.error("Semua field harus diisi");
      return;
    }

    if (data.password !== data.confirmPassword) {
      toast.error("Password dan konfirmasi tidak cocok");
      return;
    }

    if (!["user", "admin"].includes(data.role)) {
      toast.error("Role hanya boleh 'user' atau 'admin'");
      return;
    }

    setLoadingId(1);

    try {
      await axios.post(
        "https://sport-reservation-api-bootcamp.do.dibimbing.id/api/v1/register",
        {
          email: data.email,
          name: data.name,
          password: data.password,
          c_password: data.confirmPassword,
          role: data.role,
          phone_number: data.phoneNumber,
        }
      );
      toast.success("Registrasi berhasil!");
    } catch (error) {
      const msg = error.response?.data?.message;
      toast.error(msg || "Registrasi gagal");
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-[#E7E7E7] relative">
      <div className="w-[214px] h-[149px] left-0 bottom-0 absolute z-20">
        <img
          src="./public/Baskett.png"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="w-[886px] h-[592px] bg-[#F8F8F8] flex justify-between outline-2 outline-[#3E3E3E] relative z-10">
        <div className="w-[486px]">
          <Form
            onButtonClick={handleClick}
            loadingId={loadingId}
            onRegister={handleRegister}
          />
        </div>

        <div className="relative">
          <img
            src="./public/ball.png"
            className="absolute z-10 -translate-x-2.5"
          />
          <div className="w-full h-full relative outline-1 outline-[#3E3E3E]">
            <img
              src="./public/side-image.jpg"
              className="object-cover w-full h-full"
            />
          </div>
        </div>
      </div>

      <div className="w-[374px] h-[249px] absolute top-0 right-0 z-0">
        <img
          src="./public/Soccer.png"
          className="w-full h-full object-cover"
        />
      </div>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default Register;