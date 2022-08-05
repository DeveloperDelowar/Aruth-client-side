import React from "react";
import loginPic from "../../../Images/login.jpg";
import { useForm } from "react-hook-form";
import "./inputBox.css";
import { Link } from "react-router-dom";
import ContinueWithSocialMedia from "./ContinueWithSocialMedia";

const Login = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);

  return (
    <section className="py-10">
      <div className="w-2/3 mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 items-center justify-center shadow-lg rounded-md p-4 bg-white">
          <div>
            <img src={loginPic} alt="login pic" className="" />
            <ContinueWithSocialMedia />
          </div>

          <div className="text-center">
            <h2 className="text-2xl  text-[#007bff9d] mb-5 font-bold">
             Log in to your account
            </h2>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>

                <input
                  type="email"
                  placeholder="Enter your email"
                  className="input-box w-full border-gray-400"
                  {...register("email", {
                    required: {
                      value: true,
                      message: "Email is required",
                    },
                  })}
                />
                {/* <label className="label">
                  <span className="label-text-alt hidden">Alt label</span>
                </label> */}
              </div>

              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>

                <input
                  type="password"
                  placeholder="Enter your password"
                  className="input-box w-full border-gray-400"
                  {...register("password", {
                    min: {
                      value: 6,
                      message: "Password must be 6 character",
                    },
                    required: {
                      value: true,
                      message: "Password is required",
                    },
                  })}
                />

                {/* <label className="label">
                  <span className="label-text-alt hidden">Alt label</span>
                </label> */}
              </div>

              <button className="form-btn w-full mt-3">Login</button>
            </form>

            <p className="mt-2 text-center">
              Forget
              <strong>
                <Link to="/register"> password?</Link>
              </strong>
            </p>

            <p className="text-center mt-2">
              Need an account?
              <strong>
                <Link to="/register"> register</Link>
              </strong>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;