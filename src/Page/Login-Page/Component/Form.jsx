import { useState } from "react";
import { Link } from "react-router-dom";

export const Form = (props) => {
  const { loadingId, handleEmail, handlePassword, login } = props;
  const [emailEmpty, setEmailEmpty] = useState(false);
  const [passEmpty, setPassEmpty] = useState(false);
  const [socialError, setSocialError] = useState("");

  const image = [
    { url: "./public/Google.svg"},
    { url: "./public/Discord.svg"},
    { url: "./public/X.svg"},
  ];

  const validateAndLogin = () => {
    let emailCheck = document.getElementById("emailInput").value.trim() === "";
    let passCheck = document.getElementById("passInput").value.trim() === "";

    setEmailEmpty(emailCheck);
    setPassEmpty(passCheck);

    if (!emailCheck && !passCheck) {
      login(1);
    }
  };

  const handleSocialClick = (name) => {
    setSocialError(`This login option is not available yet`);
    setTimeout(() => setSocialError(""), 4000);
  };

  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="w-[350px] h-[443px] ">
        <div>
          <h1 id="jersey" className="text-5xl text-[#8A1818] ">
            Gocca Nisser
          </h1>
          <p className="text-[12px] opacity-35 mt-2">
            Whether it’s a casual match or a tournament, book your sports venue
            in minutes and enjoy a hassle-free experience.
          </p>
        </div>
        <div className="mt-12">
          <input
            id="emailInput"
            onChange={handleEmail}
            className="noOutline text-[12px] w-full opacity-65"
            type="text"
            placeholder="Email"
          />
          <div
            className={`w-full h-[1px] ${
              emailEmpty ? "bg-red-500" : "bg-black opacity-65"
            }`}
          ></div>
          {emailEmpty && (
            <div className="flex items-center gap-2 mt-1">
              <p className="text-red-600 text-xs">You need to fill this field</p>
            </div>
          )}
        </div>
        <div className="mt-15">
          <input
            id="passInput"
            onChange={handlePassword}
            className="noOutline text-[12px] w-full opacity-65"
            type="password"
            placeholder="Password"
          />
          <div
            className={`w-full h-[1px] ${
              passEmpty ? "bg-red-500" : "bg-black opacity-65"
            }`}
          ></div>
          {passEmpty && (
            <div className="flex items-center gap-2 mt-1">
              <p className="text-red-600 text-xs">You need to fill this field</p>
            </div>
          )}
        </div>

        <div className="w-full flex justify-end text-[9px] mt-2">
          <h1 className="forget">Forget Password</h1>
        </div>

        <button
          onClick={validateAndLogin}
          disabled={loadingId === 1}
          className="effect1 w-full h-[50px] bg-[#8A1818] mt-7 flex justify-center items-center"
        >
          {loadingId === 1 ? (
            <span className="loader w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
          ) : (
            <h1 id="cool" className="text-xl text-white ">Log In</h1>
          )}
        </button>

        <div className="flex justify-between h-[37px] mt-10">
          <div className="w-[150px] h-full relative">
            <div className="flex w-[150px] h-[15px] items-center justify-between absolute -translate-y-1">
              <div className="w-[30px] h-[1px] bg-black opacity-25"></div>
              <h1 id="cool" className="text-[12px] opacity-25">Or Login With</h1>
              <div className="w-[30px] h-[1px] bg-black opacity-25"></div>
            </div>
            <div className="social-media-zoom w-[150px] h-[20px] flex justify-center items-center gap-7 mt-5">
              {image.map((product, index) => (
                <div
                  key={index}
                  className="w-[20px] h-[20px] cursor-pointer"
                  onClick={() => handleSocialClick(product.name)}
                >
                  <img src={product.url} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>


            {socialError && (
              <p className="text-red-600 text-[10px] text-center mt-1">{socialError}</p>
            )}
          </div>
          <Link to={"/register"}>
            <button className="effect2 w-[155px] h-full flex justify-center items-center outline-1 outline-[#8A1818] ">
              <h1 id="cool" className="text-xl text-[#8A1818] ">Sign Up</h1>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};
