import React, { useState } from "react";
import { useNavigate, Link, json } from "react-router-dom";
import { login as loginAction } from "../../store/authSlice";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { BiSolidShow } from "react-icons/bi";
import axios from "axios";
const Login = () => {
  const [type, setType] = useState("password");
  const navigate = useNavigate();
  const dispatch = useDispatch();
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

  const login = async (data) => {
    seterror("");
    try {
      const logedInUser = await axios.post(
        "http://localhost:8000/api/v1/users/login",
       { ...data},
       {withCredentials:true}
      );
      const user=logedInUser.data.data.user
      // console.log( logedInUser);
      if (user) dispatch(loginAction(user));
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full h-screen flex justify-center">
      <div className="w-[40%] flex flex-col ">
        <h1 className="text-4xl text-black font-bold uppercase text-center pt-20 pb-10">
          Wlecome Back!
        </h1>
        <form onSubmit={handleSubmit(login)}>
          <div className="mb-4">
            <label className="block text-gray-700" htmlFor="email">
              Email
            </label>
            <input
              className="w-full px-3 py-2 outline-none border-2 rounded text-black"
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
            <div className="flex items-center border-2 rounded">
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
              <div onClick={toggelType} className="bg-white">
                <BiSolidShow color="black " size={30} />
              </div>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>
          <button
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-200"
            type="submit"
          >
            Sign In
          </button>
        </form>
        <Link className="w-fit" to="/register">
          <span className="text-blue-500 pt-3">Register Here </span>
        </Link>
      </div>
    </div>
  );
};

export default Login;
