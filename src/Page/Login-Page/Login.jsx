import { useState } from "react";
import { Form } from "./Component/Form.jsx";
import './style.css';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [loadingId, setLoadingId] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const changeEmail = (e) => setEmail(e.target.value);
  const changePassword = (e) => setPassword(e.target.value);

  const handleLogin = async (id) => {
    setLoadingId(id);

    try {
      const res = await axios.post(
        "https://sport-reservation-api-bootcamp.do.dibimbing.id/api/v1/login",
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
            apiKey: "YOUR_API_KEY_HERE"
          }
        }
      );

      const token = res.data.data.token;
      localStorage.setItem("accessToken", token);
      const userRes = await axios.get(
        "https://sport-reservation-api-bootcamp.do.dibimbing.id/api/v1/me",
        {
          headers: {
            "Authorization": `Bearer ${token}`,
            apiKey: "YOUR_API_KEY_HERE"
          }
        }
      );

      const role = userRes.data.data.role;
      console.log("User role:", role);
      localStorage.setItem("role", role);

      toast.success(`Login Success!`, { autoClose: 4000 });
      setTimeout(() => {
        if (role === "admin") {
          navigate("/admin-sport");
        } else {
          navigate("/");
        }
      }, 3000);

    } catch (error) {
      toast.error(error.response?.data?.message || "Login Failed!", { autoClose: 2000 });
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <>
      <div className="w-screen h-screen flex justify-center items-center bg-[#E7E7E7] relative">
        <div className="w-[214px] h-[149px] left-0 bottom-0 absolute z-20">
          <img src="/Baskett.png" className="w-full h-full object-cover" />
        </div>
        <div className="w-[886px] h-[592px] bg-[#F8F8F8] flex justify-between outline-2 outline-[#3E3E3E] relative z-10">
          <div className="w-[486px]">
            <Form
              handleEmail={changeEmail}
              handlePassword={changePassword}
              login={handleLogin}
              loadingId={loadingId}
            />
          </div>
          <div className="relative">
            <img src="/ball.png" className="absolute z-10 -translate-x-2.5" />
            <div className="w-full h-full relative outline-1 outline-[#3E3E3E]">
              <img src="/side-image.jpg" className="object-cover w-full h-full" />
            </div>
          </div>
        </div>
        <div className="w-[374px] h-[249px] absolute top-0 right-0 z-0">
          <img src="/Soccer.png" className="w-full h-full object-cover" />
        </div>
      </div>
      <ToastContainer position="top-right" hideProgressBar />
    </>
  );
};

export default Login;
