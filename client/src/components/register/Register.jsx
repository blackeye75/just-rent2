import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../../store/authSlice";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { BiSolidShow } from "react-icons/bi";
import axios from "axios";

const Register = () => {
  const [avatar, setAvatar] = useState(null);
  const [type, setType] = useState("password");
  const navigate = useNavigate();
  const dispatch = useDispatch;
  const [error, seterror] = useState("");
  const toggelType = () => {
    if (type === "password") {
      setType("text");
    } else {
      setType("password");
    }
  };

  const handleRegister = async (data) => {
    seterror("");

    const formData = new FormData();
    formData.append("avatar", avatar); // Append the avatar file

    // Append other fields to FormData
    for (const key in data) {
      formData.append(key, data[key]);
    }
    try {
    //   console.log(data);
      const createdUser = await axios.post(
        "http://localhost:8000/api/v1/users/register",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
    //   console.log(createdUser);
    window.location.href("/")
    } catch (error) {
      seterror(error.message);
    }
  };

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const handleFileChange = (e) => {
    setAvatar(e.target.files[0]);
  };
  return (
    <div>
      <div className="w-full h-screen flex justify-center">
        <div className="w-[40%] flex flex-col ">
          <h1 className="text-4xl text-black font-bold uppercase text-center pt-10 pb-10">
            Join Us!
          </h1>
          <form onSubmit={handleSubmit(handleRegister)}>
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
            <div className="mb-4">
              <label className="block text-gray-700" htmlFor="email">
                Full Name
              </label>
              <input
                className="w-full px-3 py-2 outline-none border-2 rounded text-black"
                type="text"
                id="fullName"
                name="fullName"
                placeholder="Enter Your Full Name"
                {...register("fullName", {
                  required: "Full Name Is Required",
                })}
              />
              {errors.fullName && (
                <p className="text-red-500 text-sm">
                  {errors.fullName.message}
                </p>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700" htmlFor="email">
                User Name
              </label>
              <input
                className="w-full px-3 py-2 outline-none border-2 rounded text-black"
                type="text"
                id="userName"
                name="userName"
                placeholder="Enter Your Username"
                {...register("userName", {
                  required: "username Is Required",
                })}
              />
              {errors.userName && (
                <p className="text-red-500 text-sm">
                  {errors.userName.message}
                </p>
              )}
            </div>
            <div className="mb-3 ">
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
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>
            <div className="flex flex-col">
              <label htmlFor="">Avatar</label>
              <input
                type="file"
                name="avatar"
                className="pb-4"
                onChange={handleFileChange}
              />
            </div>
            <button
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-200"
              type="submit"
            >
              Register
            </button>
          </form>
          <Link to="/login">
            <p className="text-blue-500 pt-3">Already Registerd,Login Here! </p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
