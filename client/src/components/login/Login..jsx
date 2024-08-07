import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../../store/authSlice";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import {BiSolidShow} from "react-icons/bi"
const Login = () => {
  const [type, setType] = useState("password");
  const navigate = useNavigate();
  const dispatch = useDispatch;
  const [error, seterror] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const toggelType = () => {
    if (type === "password") {
      setType("text");
    } else {
      setType("password");
    }
  };


  return (
    <div className="w-full h-screen flex justify-center">
      <div className="w-[40%] flex flex-col " >
        <h1 className="text-4xl text-black font-bold uppercase text-center pt-16">
          Wlecome Back!
        </h1>
        <form>
          <div className="mb-4">
            <label className="block text-gray-700" htmlFor="email">
              Email
            </label>
            <input
              className="w-full px-3 py-2 outline-none border rounded text-black"
              type="email"
              id="email"
              name="email"
              placeholder="Enter Your Email Address"
              {...register("email", {
                required: "Email Is Required",
                pattern: {
                  value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                  message: "Email address must be valid",
                },
              })}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>
          <div className="mb-6 ">
              <label className="block text-gray-700" htmlFor="password">
                Password
              </label>
              <div className="flex items-center border rounded">
                <input
                  className="w-full text-black px-3 py-2 outline-none rounded"
                  type={type}
                  id="password"
                  name="password"
                  placeholder="Enter Your Password"
                  {...register("password", {
                    required: "Password is required",
                    // minLength: {
                    //   value: 8,
                    //   message: "Not Safe",
                    // },
                  })}
                />
                <div onClick={toggelType} className="bg-white" >
                  <BiSolidShow color="black " size={30} />
                </div>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>
            <button
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-200"
              type="submit"
            >
              Sign In
            </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
