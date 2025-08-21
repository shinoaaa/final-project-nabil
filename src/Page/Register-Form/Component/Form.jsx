import { useState } from "react";
import { Link } from "react-router-dom";

export const Form = ({ loadingId, onRegister }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    role: "",
  });

  const [errors, setErrors] = useState({});
  const [socialError, setSocialError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: false });
  };

  const handleSubmit = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = true;
    if (!formData.email) newErrors.email = true;
    if (!formData.password) newErrors.password = true;
    if (!formData.confirmPassword) newErrors.confirmPassword = true;
    if (!formData.phoneNumber) newErrors.phoneNumber = true;
    if (!formData.role) newErrors.role = true;

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      onRegister(formData);
    }
  };

  const handleSocialClick = () => {
    setSocialError("This login option is not available yet");
    setTimeout(() => {
      setSocialError("");
    }, 2000);
  };

  const image = [
    { url: "./public/Google.svg" },
    { url: "./public/Discord.svg" },
    { url: "./public/X.svg" },
  ];

  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="w-[350px] h-[466px]">
        <h1 id="jersey" className="text-5xl text-[#8A1818]">Hi New Customer</h1>

        {/* Name */}
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={`text-[12px] h-[30px] w-full mt-10 rounded-full px-5 opacity-65 outline-1 ${
            errors.name ? "outline-red-500 placeholder-red-500" : "outline-black"
          }`}
          type="text"
          placeholder={errors.name ? "This field is required..." : "Name"}
        />

        {/* Email */}
        <input
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={`text-[12px] h-[30px] w-full mt-7 rounded-full px-5 opacity-65 outline-1 ${
            errors.email ? "outline-red-500 placeholder-red-500" : "outline-black"
          }`}
          type="text"
          placeholder={errors.email ? "This field is required..." : "Email"}
        />

        {/* Password & Confirm */}
        <div className="flex justify-between">
          <div>
            <input
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`text-[12px] h-[30px] w-[160px] mt-5 rounded-full px-5 opacity-65 outline-1 ${
                errors.password ? "outline-red-500 placeholder-red-500" : "outline-black"
              }`}
              type="password"
              placeholder={errors.password ? "This field is required..." : "Password"}
            />
          </div>
          <div>
            <input
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={`text-[12px] h-[30px] w-[175px] mt-5 rounded-full px-5 opacity-65 outline-1 ${
                errors.confirmPassword ? "outline-red-500 placeholder-red-500" : "outline-black"
              }`}
              type="password"
              placeholder={errors.confirmPassword ? "This field is required..." : "Confirm Password"}
            />
          </div>
        </div>

        {/* Phone Number */}
        <input
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          className={`text-[12px] h-[30px] w-full mt-5 rounded-full px-5 opacity-65 outline-1 ${
            errors.phoneNumber ? "outline-red-500 placeholder-red-500" : "outline-black"
          }`}
          type="text"
          placeholder={errors.phoneNumber ? "This field is required..." : "Phone Number"}
        />

        {/* Role */}
        <div className="flex h-[25px] items-center gap-2 mt-5">
          <h1 className="text-md">Role:</h1>
          <input
            name="role"
            value={formData.role}
            onChange={handleChange}
            className={`h-full w-full rounded-full pl-2 text-[9px] outline-1 ${
              errors.role ? "outline-red-500 placeholder-red-500" : "outline-black"
            }`}
            placeholder={errors.role ? "This field is required..." : "Type Your Role"}
          />
        </div>

        {/* Button */}
        <button
          onClick={handleSubmit}
          disabled={loadingId === 1}
          className="effect1 w-full h-[50px] bg-[#8A1818] mt-5 flex justify-center items-center"
        >
          {loadingId === 1 ? (
            <span className="loader w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <h1 id="cool" className="text-xl text-[#F8F8F8]">Register Now</h1>
          )}
        </button>

        {/* Socials + Back */}
        <div className="flex justify-between h-[37px] mt-7">
          <div className="w-[150px] h-full relative">
            <div className="flex w-[150px] h-[15px] items-center justify-between absolute -translate-y-1">
              <div className="w-[20px] h-[1px] bg-black opacity-25"></div>
              <h1 id="cool" className="text-[12px] opacity-25">Or Register With</h1>
              <div className="w-[20px] h-[1px] bg-black opacity-25"></div>
            </div>
            <div className="social-media-zoom w-[150px] h-[20px] flex justify-center items-center mt-5">
              {image.map((prod, i) => (
                <div
                  key={i}
                  className="w-[20px] h-[20px] cursor-pointer"
                  onClick={handleSocialClick}
                >
                  <img src={prod.url} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
            {socialError && <p className="text-[10px] text-red-500 mt-2 text-center">{socialError}</p>}
          </div>

          <Link to="/login">
            <button className="effect2 w-[155px] h-full flex justify-center items-center outline-1 outline-[#8A1818]">
              <h1 id="cool" className="text-lg text-[#8A1818]">Back To Login</h1>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};
