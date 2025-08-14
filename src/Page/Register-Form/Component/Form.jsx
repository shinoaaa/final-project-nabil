import { useState } from "react";
import { Link } from "react-router-dom";

export const Form = ({ onButtonClick, loadingId, onRegister }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    role: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const image = [
    { url: "./public/Google.svg" },
    { url: "./public/Discord.svg" },
    { url: "./public/X.svg" },
  ];

  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="w-[350px] h-[466px]">
        <h1 id="jersey" className="text-5xl text-[#8A1818]">
          Hi New Customer
        </h1>

        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="text-[12px] h-[30px] outline-1 outline-black w-full mt-10 opacity-65 rounded-full px-5"
          type="text"
          placeholder="Name"
        />

        <input
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="text-[12px] h-[30px] outline-1 outline-black w-full mt-7 opacity-65 rounded-full px-5"
          type="text"
          placeholder="Email"
        />

        <div className="flex justify-between">
          <input
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="text-[12px] h-[30px] outline-1 outline-black w-[160px] mt-5 opacity-65 rounded-full px-5"
            type="password"
            placeholder="Password"
          />
          <input
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="text-[12px] h-[30px] outline-1 outline-black w-[175px] mt-5 opacity-65 rounded-full px-5"
            type="password"
            placeholder="Confirm Password"
          />
        </div>

        <input
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          className="text-[12px] h-[30px] outline-1 outline-black w-full mt-5 opacity-65 rounded-full px-5"
          type="text"
          placeholder="Phone Number"
        />

        <div className="w-full h-[25px] mt-5 flex justify-between items-center">
          <div className="flex h-[20px] items-center gap-2">
            <h1 className="text-md">Role:</h1>
            <input
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="h-full w-25 rounded-full pl-2 outline-1 outline-[#8A1818] text-[9px]"
              placeholder="Type Your Role"
            />
          </div>

          <button
            onClick={() => onButtonClick(2)}
            disabled={loadingId === 2}
            className="effect2 w-[167px] h-full flex outline-1 outline-[#8A1818] text-[#8A1818] justify-center items-center rounded-full"
          >
            {loadingId === 2 ? (
              <span className="loader w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <h1 id="cool" className="text-[12px]">
                Select Picture Profile
              </h1>
            )}
          </button>
        </div>

        <button
          onClick={() => onRegister(formData)}
          disabled={loadingId === 1}
          className="effect1 w-full h-[50px] bg-[#8A1818] mt-5 flex justify-center items-center"
        >
          {loadingId === 1 ? (
            <span className="loader w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <h1 id="cool" className="text-xl text-[#F8F8F8]">
              Register Now
            </h1>
          )}
        </button>

        <div className="flex justify-between h-[37px] mt-7">
          <div className="w-[150px] h-full relative">
            <div className="flex w-[150px] h-[15px] items-center justify-between absolute -translate-y-1">
              <div className="w-[20px] h-[1px] bg-black opacity-25"></div>
              <h1 id="cool" className="text-[12px] opacity-25">
                Or Register With
              </h1>
              <div className="w-[20px] h-[1px] bg-black opacity-25"></div>
            </div>
            <div className="social-media-zoom w-[150px] h-[20px] flex justify-center items-center mt-5">
              {image.map((prod, i) => (
                <div key={i} className="w-[20px] h-[20px]">
                  <img
                    src={prod.url}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          <Link to="/login">
            <button className="effect2 w-[155px] h-full flex justify-center items-center outline-1 outline-[#8A1818]">
              <h1 id="cool" className="text-lg text-[#8A1818]">
                Back To Login
              </h1>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};